import React from "react";
import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";

export const UserContext = React.createContext(getUserDataFromAccessToken());
