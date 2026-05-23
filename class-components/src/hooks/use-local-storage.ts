import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: string
) => {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    const saved = localStorage.getItem(key);

    return saved ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
