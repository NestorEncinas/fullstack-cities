import { createContext } from "react";

export type TUserData = {
  id: number;
  // email: string;
};

// export const UserContext = createContext<TUserData | null>(null);
export const UserContext = createContext<any>(null);

// export default UserContext.Provider;
