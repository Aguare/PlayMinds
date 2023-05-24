import { useEffect, useState } from "react";
import { User } from "./Entitys/User";

export class Local {
  useLocalStorage = (key: string): [User | null, (value: User) => void] => {
    const [value, setValue] = useState<User | null>(() => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.removeItem(key);
      }
    }, [key, value]);

    return [value, setValue];
  };
}
