interface IError {
  path: string;
  message: string;
}

export const formErrors = (errors: IError[]) => {
  const errMap: { [key: string]: string } = {};

  errors.forEach(e => {
    errMap[e.path] = e.message;
  });

  return errMap;
};
