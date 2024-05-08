// When request is successful
export type Response<T> = {
  result: T;
  messageCode: number;
  message: string[];
  exception: null | unknown;
  httpStatusCode: number;
  errorFileds: [];
};

// When request is rejected in controller on server side due to stateless validation error e.g. missing field
export type ErrorOnValidation = {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: { [key: string]: string[] }; // Usually the key is the field that caused validation error
};

// When request is valid statelessly, but could not be completed due to an error in service e.g. uesr not found
export type ErrorOnRequest = {
  result: unknown;
  messageCode: number; // Usually a negative number
  message: string[]; // errors that caused the request
  exception: null | unknown;
  httpStatusCode: number;
  errorFileds: [];
};
