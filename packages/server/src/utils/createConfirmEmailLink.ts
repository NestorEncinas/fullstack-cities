import User from "../entity/User";

const createConfirmEmail = async (url: string, user: User) => {
  return `${url}/confirm/${user.id}/${user.emailLinkSecret}`;
};

export default createConfirmEmail;
