import Cookies from "js-cookie";
import jwt from "jwt-simple";
import _pick from "lodash/pick";

const getUserDataFromAccessToken = () => {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) return null;

  try {
    const decodedUser = jwt.decode(
      accessToken,
      process.env.REACT_APP_JWT_SECRET || ""
    );

    return _pick(decodedUser, ["id", "email"]);
  } catch (error) {
    // TODO: check ant design snackbar
    console.error("JWT errror", error);

    return null;
  }
};

export default getUserDataFromAccessToken;
