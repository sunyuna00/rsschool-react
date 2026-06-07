import { addSubmission } from "@/entities/submission/submission-slice";
import {
  fileToBase64,
  formSchema,
  useAppDispatch,
  useAppSelector,
  validateImage,
  PasswordStrength,
} from "@/shared";
import { useState } from "react";

export const UncontrolledForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordValue, setPasswordValue] = useState("");

  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.items);
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(event.currentTarget);

    const imageEntry = formData.get("image");

    if (!(imageEntry instanceof File) || imageEntry.size === 0) {
      setErrors((prev) => ({
        ...prev,
        image: "Image is required",
      }));

      return;
    }

    const imageFile = imageEntry;

    const imageError = validateImage(imageFile);
    if (imageError) {
      setErrors((prev) => ({
        ...prev,
        image: imageError,
      }));
      return;
    }

    const data = {
      name: String(formData.get("name")),
      age: Number(formData.get("age")),
      email: String(formData.get("email")),
      gender: String(formData.get("gender")),
      country: String(formData.get("country")),
      password: String(formData.get("password")),
      confirmPassword: String(formData.get("confirmPassword")),
      terms: formData.get("terms") === "on",
    };

    const result = formSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = String(issue.path[0]);
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const imageBase64 = await fileToBase64(imageFile);
    dispatch(
      addSubmission({
        id: crypto.randomUUID(),
        name: result.data.name,
        age: result.data.age,
        email: result.data.email,
        gender: result.data.gender,
        country: result.data.country,
        image: imageBase64,
        createdAt: Date.now(),
      }),
    );
    setErrors({});

    form.reset();
    setPasswordValue("");
    console.log({
      ...result.data,
      image: imageBase64,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="sticky top-0 z-10 bg-popover pb-3 pt-2 text-xl font-semibold border-b border-border">
        Uncontrolled Form
      </h2>

      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="age" className="text-sm font-medium">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.age && <p className="text-xs text-destructive">{errors.age}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="gender" className="text-sm font-medium">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-xs text-destructive">{errors.gender}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="country" className="text-sm font-medium">
          Country
        </label>
        <input
          id="country"
          name="country"
          list="countries"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.country && (
          <p className="text-xs text-destructive">{errors.country}</p>
        )}

        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={(e) => setPasswordValue(e.target.value)}
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <PasswordStrength password={passwordValue} />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="w-full rounded-md border border-border bg-input-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="image" className="text-sm font-medium">
          Image
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept=".png,.jpg,.jpeg"
          className="w-full text-sm"
        />
        {errors.image && (
          <p className="text-xs text-destructive">{errors.image}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input id="terms" name="terms" type="checkbox" className="h-4 w-4" />
        <label htmlFor="terms" className="text-sm">
          Accept Terms
        </label>
      </div>

      {errors.terms && (
        <p className="text-xs text-destructive">{errors.terms}</p>
      )}

      <button
        type="submit"
        className="w-full rounded-md bg-primary py-2.5 font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.99]"
      >
        Submit
      </button>
    </form>
  );
};
