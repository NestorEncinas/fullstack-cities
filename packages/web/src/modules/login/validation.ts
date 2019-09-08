import * as Yup from "yup";

import VALIDATION_MESSAGES from "../../utils/validation/errors";

export const LOGIN_VALIDATION_SCHEMA = Yup.object({
  email: Yup.string()
    .email()
    .typeError(VALIDATION_MESSAGES.REQUIRED)
    .required()
    .typeError(VALIDATION_MESSAGES.REQUIRED),
  password: Yup.string()
    .typeError(VALIDATION_MESSAGES.REQUIRED)
    .required()
    .typeError(VALIDATION_MESSAGES.REQUIRED)
});
