import { Check, X } from "lucide-react";

import { getPasswordStrength } from "../../lib/password-strength";

type Props = {
  password: string;
};

export const PasswordStrength = ({ password }: Props) => {
  const { hasNumber, hasUppercase, hasLowercase, hasSpecial } =
    getPasswordStrength(password);
  const checks = [
    { label: "Number", valid: hasNumber },
    {
      label: "Uppercase letter",
      valid: hasUppercase,
    },
    {
      label: "Lowercase letter",
      valid: hasLowercase,
    },
    {
      label: "Special symbol",
      valid: hasSpecial,
    },
  ];

  return (
    <div className="mt-2 space-y-1 text-sm">
      {checks.map(({ label, valid }) => (
        <p key={label} className="flex items-center gap-2">
          {valid ? <Check size={16} /> : <X size={16} />}
          {label}
        </p>
      ))}
    </div>
  );
};
