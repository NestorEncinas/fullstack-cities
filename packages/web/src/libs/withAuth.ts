import Cookies from "js-cookie";

// import getUserDataFromAccessToken from "./getUserDataFromAccessToken";

const obtainAuthToken = () => {
  const accessToken = Cookies.get("accessToken");
  // should add it to context when i get more experience
  // const user = getUserDataFromAccessToken(accessToken);
  console.log("LIB OBTAINAUTHTOKEN", accessToken);
  if (!accessToken) {
    return null;
  }

  return accessToken;
};

export default obtainAuthToken;
