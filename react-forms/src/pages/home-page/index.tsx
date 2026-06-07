import { useState } from "react";

import { SubmissionsList } from "@/widgets/submissions-list";
import { UncontrolledForm } from "@/features/uncontrolled-form/ui/uncontrolled-form";

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  return (
    <main className="container mx-auto p-8">
      <h1 className="mb-8">
        React Forms
      </h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded bg-primary px-4 py-2 text-primary-foreground"
      >
        Open Form
      </button>

      <SubmissionsList />
      <UncontrolledForm />
    </main>
  );
};