import { useState, useEffect } from "react";

export function useDebounce<T>(input: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(input);

  useEffect(() => {
    const debounce = setTimeout(() => setDebouncedValue(input), delay);

    return () => clearTimeout(debounce);
  }, [input, delay]);

  return debouncedValue;
}
