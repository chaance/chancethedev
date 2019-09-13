import nanoid from 'nanoid';
import { useEffect, useState } from 'react';

let _id = nanoid();

export const useId = (initialValue?: string | number): string => {
  const [id, setId] = useState<string>(
    initialValue ? String(initialValue) : _id
  );
  useEffect(() => setId(nanoid()), []);
  return id;
};
