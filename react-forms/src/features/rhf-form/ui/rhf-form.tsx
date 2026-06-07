import { addSubmission } from "@/entities/submission/submission-slice";
import {
  fileToBase64,
  formSchema,
  PasswordStrength,
  useAppDispatch,
  useAppSelector,
  validateImage,
  type FormInput,
  type FormValues,
} from "@/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

type Props = {
  onSuccess?: () => void;
};

export const RHFForm = ({ onSuccess }: Props) => {
  const dispatch = useAppDispatch();

  const countries = useAppSelector((state) => state.countries.items);

  const [imageError, setImageError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const password =
    useWatch({ control, name: "password", defaultValue: "" }) || "";

  const onSubmit = async (data: FormInput) => {
    const parsedData = formSchema.parse(data);

    const imageFile = (
      data as FormValues & {
        image?: FileList;
      }
    ).image?.[0];

    if (!imageFile) {
      setImageError("Image is required");
      return;
    }

    const validationError = validateImage(imageFile);

    if (validationError) {
      setImageError(validationError);
      return;
    }

    setImageError("");

    const imageBase64 = await fileToBase64(imageFile);

    const createdAt = new Date().getTime();

    dispatch(
      addSubmission({
        id: crypto.randomUUID(),

        name: parsedData.name,
        age: parsedData.age,
        email: parsedData.email,
        gender: parsedData.gender,
        country: parsedData.country,

        image: imageBase64,

        createdAt,
      }),
    );

    reset();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h2 className="sticky top-0 z-10 bg-popover pb-3 pt-2 text-xl font-semibold border-b border-border">
        React Hook Form
      </h2>
      <div>
        <label htmlFor="rhf-name">Name</label>

        <input
          id="rhf-name"
          className="w-full rounded border p-2"
          {...register("name")}
        />

        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="rhf-age">Age</label>

        <input
          id="rhf-age"
          type="number"
          className="w-full rounded border p-2"
          {...register("age", {
            valueAsNumber: true,
          })}
        />

        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
      </div>

      <div>
        <label htmlFor="rhf-email">Email</label>

        <input
          id="rhf-email"
          className="w-full rounded border p-2"
          {...register("email")}
        />

        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="rhf-gender">Gender</label>

        <select
          id="rhf-gender"
          className="w-full rounded border p-2"
          {...register("gender")}
        >
          <option value="">Select</option>

          <option value="male">Male</option>

          <option value="female">Female</option>
        </select>

        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rhf-country">Country</label>

        <input
          id="rhf-country"
          list="rhf-countries"
          className="w-full rounded border p-2"
          {...register("country")}
        />

        <datalist id="rhf-countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rhf-password">Password</label>

        <input
          id="rhf-password"
          type="password"
          className="w-full rounded border p-2"
          {...register("password")}
        />

        <PasswordStrength password={password} />

        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rhf-confirm-password">Confirm Password</label>

        <input
          id="rhf-confirm-password"
          type="password"
          className="w-full rounded border p-2"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rhf-image">Image</label>

        <input
          id="rhf-image"
          type="file"
          accept=".png,.jpg,.jpeg"
          {...register("image")}
        />

        {imageError && <p className="text-red-500">{imageError}</p>}
      </div>

      <div className="flex gap-2">
        <input id="rhf-terms" type="checkbox" {...register("terms")} />

        <label htmlFor="rhf-terms">Accept Terms</label>
      </div>

      {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}

      <button
        type="submit"
        disabled={!isValid}
        className="rounded bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
};
