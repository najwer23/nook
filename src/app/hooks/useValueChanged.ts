import { useEffect, useRef, useState } from 'react';

export const useValueChanged = <T>(value: T, duration = 1000) => {
  const prev = useRef(value);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (prev.current === value) return;

    prev.current = value;
    setChanged(true);

    const t = setTimeout(() => setChanged(false), duration);
    return () => clearTimeout(t);
  }, [value, duration]);

  return changed;
};
