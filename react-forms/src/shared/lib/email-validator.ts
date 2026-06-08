export const validateEmail = (
  email: string,
): boolean => {
  const cleanedEmail = email.trim();

  const parts = cleanedEmail.split("@");

  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;

  if (!localPart) {
    return false;
  }

  if (!domain) {
    return false;
  }

  if (!domain.includes(".")) {
    return false;
  }

  return true;
};