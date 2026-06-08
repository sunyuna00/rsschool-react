const MAX_SIZE = 2 * 1024 * 1024;

const ALLOWED_TYPES = [
  'image/png',
  'image/jpeg',
];

export const validateImage = (
  file: File,
): string | null => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only PNG and JPEG allowed';
  }

  if (file.size > MAX_SIZE) {
    return 'Max image size is 2MB';
  }

  return null;
};