import { useEffect, useState } from "react";
import { getItem, setItem } from "../utils/localstorage";

export default function usePersistState<T>(key: string, initiaValue: T) {
  const [value, setValue] = useState(() => {
    const item = getItem(key);
    return (item as T) || initiaValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [value]);
  return [value, setValue] as const;
}
