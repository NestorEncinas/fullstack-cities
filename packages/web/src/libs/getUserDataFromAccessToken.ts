import Cookies from "js-cookie";
import jwt from "jwt-simple";
import _pick from "lodash/pick";

const getUserDataFromAccessToken = () => {
  const accessToken = Cookies.get("accessToken");
  console.log("GETUSERDATAFROMACCESSATOKEN", accessToken);
  if (!accessToken) return null;

  try {
    const decodedUser = jwt.decode(
      accessToken,
      process.env.REACT_APP_JWT_SECRET || ""
    );
    console.log("Decoded", _pick(decodedUser, ["id", "email"]));

    return _pick(decodedUser, ["id", "email"]);
  } catch (error) {
    console.error("JWT errror", error);

    return null;
  }
};
// const getUserDataFromAccessToken = (accessToken: string | null) => {
//   if (!accessToken) return null;
//   console.log("FU ENV", process.env.REACT_APP_JWT_SECRET);

//   try {
//     const decodedUser = jwt.decode(
//       accessToken,
//       //
//       process.env.REACT_APP_JWT_SECRET || ""
//     );
//     console.log("Decoded", _pick(decodedUser, ["id", "email"]));

//     return _pick(decodedUser, ["id", "email"]);
//   } catch (error) {
//     console.error("JWT errror", error);

//     return null;
//   }
// };

export default getUserDataFromAccessToken;
