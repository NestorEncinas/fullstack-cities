import React from "react";

// import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";
import obtainAuthToken from "libs/withAuth";

// const accessToken = obtainAuthToken();

export const SessionContext = React.createContext(obtainAuthToken());
