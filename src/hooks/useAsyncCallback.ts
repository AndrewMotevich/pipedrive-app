import { useState } from "react";

export const useAsyncCallback = (
  callback: () => Promise<void>
): [() => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await callback();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};
