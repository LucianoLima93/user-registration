import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>,
];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    let storageValue;
    if (typeof window !== "undefined") {
      storageValue = window.localStorage.getItem(key);
    }

    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;