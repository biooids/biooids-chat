// @ts-nocheck
export const errorUtil = (statusCode: number, message: string) => {
  const error = new Error();
  error.status = statusCode;
  error.message = message;
  return error;
};
