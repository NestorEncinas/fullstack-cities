// FIXME: DO I NEED THIS?
import React from "react";

import obtainAuthToken from "libs/withAuth";

export const SessionContext = React.createContext(obtainAuthToken());
