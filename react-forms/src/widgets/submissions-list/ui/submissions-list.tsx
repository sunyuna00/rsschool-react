import { useAppSelector } from "@/shared";
import { SubmissionCard } from "@/entities/submission";
import { Inbox } from "lucide-react";

export const SubmissionsList = () => {
  const submissions = useAppSelector((state) => state.submission.items);

  if (!submissions.length) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center lg:mx-30">
        <Inbox className="mb-3 h-8 w-8 text-muted-foreground" />

        <h3 className="text-base font-medium text-foreground">
          No submissions yet
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
         Start by filling out one of the forms above. All your submissions will appear here as beautiful cards.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 mx-0 lg:mx-30">
      <div className="mb-4 flex items-center gap-2">
        <Inbox className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-medium text-foreground">
          Submissions
        </h2>

        <span className="ml-auto text-sm text-muted-foreground">
          {submissions.length}
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {submissions.map((submission, index) => (
          <SubmissionCard
            key={submission.id}
            submission={submission}
            isNew={index === 0}
          />
        ))}
      </div>
    </div>
  );
};