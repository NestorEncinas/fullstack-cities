import React from "react";

export type TUserData = {
  id: number;
  email: string;
};

const UserContext = React.createContext<TUserData | null>(null);

export default UserContext.Provider;
