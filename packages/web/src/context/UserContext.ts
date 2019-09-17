import { createContext } from "react";

/**
 * Type for UserData obtained from JWT cookie
 * Think what data will need
 */
export type TUserData = {
  id: number;
  // email: string;
};

export const UserContext = createContext<TUserData | null>(null);
