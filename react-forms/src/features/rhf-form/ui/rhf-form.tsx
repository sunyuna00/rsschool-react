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
import { Upload } from "lucide-react";
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

    if (!countries.includes(parsedData.country)) {
      return;
    }

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

      <div className="space-y-1">
        <label htmlFor="rhf-name" className="text-sm font-medium">
          Name
        </label>

        <input
          id="rhf-name"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="rhf-age" className="text-sm font-medium">
          Age
        </label>

        <input
          id="rhf-age"
          type="number"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register("age", { valueAsNumber: true })}
        />

        {errors.age && (
          <p className="text-xs text-destructive">{errors.age.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="rhf-email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="rhf-email"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="rhf-gender" className="text-sm font-medium">
          Gender
        </label>

        <select
          id="rhf-gender"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register("gender")}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {errors.gender && (
          <p className="text-xs text-destructive">{errors.gender.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="rhf-country" className="text-sm font-medium">
          Country
        </label>

        <input
          id="rhf-country"
          list="rhf-countries"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register("country")}
        />

        <datalist id="rhf-countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        {errors.country && (
          <p className="text-xs text-destructive">{errors.country.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="rhf-password" className="text-sm font-medium">
          Password
        </label>

        <input
          id="rhf-password"
          type="password"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register("password")}
        />

        <PasswordStrength password={password} />

        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="rhf-confirm-password" className="text-sm font-medium">
          Confirm Password
        </label>

        <input
          id="rhf-confirm-password"
          type="password"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          {...register("confirmPassword")}
        />

        {errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="rhf-image" className="text-sm font-medium">
          Profile Image
        </label>

        <label
          htmlFor="rhf-image"
          className="mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-muted/80 active:scale-[0.99]"
        >
          <Upload className="h-4 w-4" />
          Click to upload image
        </label>

        <input
          id="rhf-image"
          type="file"
          accept=".png,.jpg,.jpeg"
          className="hidden"
          {...register("image")}
        />

        {imageError && <p className="text-xs text-destructive">{imageError}</p>}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="rhf-terms"
          type="checkbox"
          className="h-4 w-4"
          {...register("terms")}
        />
        <label htmlFor="rhf-terms" className="text-sm">
          Accept Terms
        </label>
      </div>

      {errors.terms && (
        <p className="text-xs text-destructive">{errors.terms.message}</p>
      )}

      <button
        type="submit"
        disabled={!isValid}
        className="cursor-pointer w-full rounded-md bg-primary py-2.5 font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
};
