export const formErrors = (errors: any) => {
  const err: { [key: string]: string } = {};

  errors.forEach((validationError: any) => {
    Object.values(validationError.constraints).forEach((message: any) => {
      err[validationError.property] = message;
    });
  });

  return err;
};
