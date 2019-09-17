import Cookies from "js-cookie";

// import getUserDataFromAccessToken from "./getUserDataFromAccessToken";

const obtainAuthToken = () => {
  const idToken = Cookies.get("idToken");
  // should add it to context when i get more experience

  // console.log("LIB OBTAINAUTHTOKEN", idToken);
  if (!idToken) {
    return null;
  }

  return idToken;
};

export default obtainAuthToken;
