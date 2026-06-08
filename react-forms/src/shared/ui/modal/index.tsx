import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement;

    modalRef.current?.focus();

    return () => {
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="border w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot,
  );
};
