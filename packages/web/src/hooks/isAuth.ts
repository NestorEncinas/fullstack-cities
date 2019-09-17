import { useEffect } from "react";
import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";

export const isAuth = () => {
  useEffect(() => {
    const user = getUserDataFromAccessToken();
    console.log("App use effect, set User", user);
    if (!user) {
    }
  }, []);
};
