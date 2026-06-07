import { useAppSelector } from "@/shared";
import { SubmissionCard } from "@/entities/submission";

export const SubmissionsList = () => {
  const submissions = useAppSelector((state) => state.submission.items);

  if (!submissions.length) {
    return <p className="text-center text-gray-500">No submissions yet.</p>;
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {submissions.map((submission, index) => (
        <SubmissionCard
          key={submission.id}
          submission={submission}
          isNew={index === 0}
        />
      ))}
    </div>
  );
};
