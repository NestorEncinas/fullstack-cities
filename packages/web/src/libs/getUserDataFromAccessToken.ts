import Cookies from "js-cookie";
import jwt from "jwt-simple";
import _pick from "lodash/pick";

const getUserDataFromAccessToken = (): any => {
  const idToken = Cookies.get("idToken");

  if (!idToken) {
    return null;
  }

  try {
    const decodedUser = jwt.decode(
      idToken,
      process.env.REACT_APP_JWT_SECRET || ""
    );

    // check expiration date

    console.log("Decoded user", _pick(decodedUser, ["id"]));
    const result = _pick(decodedUser, ["id"]);
    return result;
  } catch (error) {
    // TODO: check ant design snackbar
    console.error("JWT errror", error);

    return null;
  }
};

export default getUserDataFromAccessToken;
