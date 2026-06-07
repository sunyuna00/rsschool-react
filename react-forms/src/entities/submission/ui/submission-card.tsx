import { type Submission } from "../model/types";
import { useEffect, useState } from "react";

type Props = {
  submission: Submission;
  isNew?: boolean;
};

export const SubmissionCard = ({ submission, isNew = false }: Props) => {
  const [highlight, setHighlight] = useState(isNew);

  useEffect(() => {
    if (!isNew) {
      return;
    }

    const timer = setTimeout(() => {
      setHighlight(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isNew]);
  
  return (
    <article
      className={`rounded-xl border p-4 transition-all duration-500 ${
        highlight ? "border-green-500 bg-green-50" : "border-border bg-card"
      }`}
    >
      <img
        src={submission.image}
        alt={submission.name}
        className="mb-4 h-48 w-full rounded-lg object-cover"
      />

      <h3 className="mb-2 text-lg font-semibold">{submission.name}</h3>

      <p>Email: {submission.email}</p>

      <p>Age: {submission.age}</p>

      <p>Gender: {submission.gender}</p>

      <p>Country: {submission.country}</p>

      <p className="mt-2 text-sm opacity-70">
        {new Date(submission.createdAt).toLocaleString()}
      </p>
    </article>
  );
};
