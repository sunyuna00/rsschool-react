import { addSubmission } from "@/entities/submission/submission-slice";
import {
  fileToBase64,
  formSchema,
  useAppDispatch,
  validateImage,
} from "@/shared";
import { useState } from "react";

export const UncontrolledForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();

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
    console.log({
      ...result.data,
      image: imageBase64,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>

        <input id="name" name="name" className="w-full rounded border p-2" />

        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="age">Age</label>

        <input
          id="age"
          name="age"
          type="number"
          className="w-full rounded border p-2"
        />
        {errors.age && <p className="text-red-500">{errors.age}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>

        <input id="email" name="email" className="w-full rounded border p-2" />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="gender">Gender</label>

        <select id="gender" name="gender" className="w-full rounded border p-2">
          <option value="">Select</option>

          <option value="male">Male</option>

          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="text-red-500">{errors.gender}</p>}
      </div>

      <div>
        <label htmlFor="country">Country</label>

        <input
          id="country"
          name="country"
          list="countries"
          className="w-full rounded border p-2"
        />
        {errors.country && <p className="text-red-500">{errors.country}</p>}

        <datalist id="countries">
          <option value="Kyrgyzstan" />
          <option value="Kazakhstan" />
          <option value="Uzbekistan" />
        </datalist>
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          className="w-full rounded border p-2"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="w-full rounded border p-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <label htmlFor="image">Image</label>

        <input id="image" name="image" type="file" accept=".png,.jpg,.jpeg" />
        {errors.image && (
          <p className="mt-1 text-sm text-red-500">{errors.image}</p>
        )}
      </div>

      <div className="flex gap-2">
        <input id="terms" name="terms" type="checkbox" />

        <label htmlFor="terms">Accept Terms</label>
      </div>

      {errors.terms && <p className="text-red-500">{errors.terms}</p>}
      
      <button
        type="submit"
        className="rounded bg-primary px-4 py-2 text-primary-foreground"
      >
        Submit
      </button>
    </form>
  );
};
