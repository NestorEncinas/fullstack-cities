import Cookies from "js-cookie";
import jwt from "jwt-simple";
import _pick from "lodash/pick";

const getUserDataFromAccessToken = (): any => {
  const idToken = Cookies.get("idToken");

  if (!idToken) {
    return false;
  }
  try {
    const decodedUser = jwt.decode(
      idToken,
      process.env.REACT_APP_JWT_SECRET || ""
    );

    if (decodedUser.exp < new Date().getTime() / 1000) {
      return false;
    }

    const result = _pick(decodedUser, ["id"]);

    return result;
  } catch (error) {
    console.error("JWT errror", error);

    return false;
  }
};

export default getUserDataFromAccessToken;
