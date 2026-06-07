import { useState } from "react";
import { UncontrolledForm } from "@/features/uncontrolled-form";
import { Modal } from "@/shared/ui/modal";
import { FileText } from "lucide-react";


export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHookFormOpen, setIsHookFormOpen] = useState(false);

  return (
    <div className="border-b border-border bg-popover px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:mx-30">
        <div className="flex md:items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background shrink-0">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-medium text-foreground">
              React Forms Dashboard
            </h1>

            <p className="text-xs md:text-sm text-muted-foreground">
              Manage and track your form submissions
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:flex-row md:gap-3 md:w-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 transition"
          >
            Uncontrolled Form
          </button>

          <button
            onClick={() => setIsHookFormOpen(true)}
            className="w-full md:w-auto rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90 transition"
          >
            React Hook Form
          </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <UncontrolledForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>

        <Modal isOpen={isHookFormOpen} onClose={() => setIsHookFormOpen(false)}>
          <div className="p-4">React Hook Form here</div>
        </Modal>
      </div>
    </div>
  );
};
