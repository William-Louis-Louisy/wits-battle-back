export interface ErrorDetail {
  message: string;
  path: string[];
}

export interface ValidationError extends Error {
  details: ErrorDetail[];
}

// ERROR HANDLING
export const handleErrors = (err: any) => {
  let errors: { [key: string]: string } = {};

  // Duplicate error code
  if (err.code === 11000) {
    errors[err.key] = `That ${err.key} is already registered`;
    return errors;
  }

  // Mongoose validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }

  // Joi validation errors
  if ((err as ValidationError).details) {
    err.details.forEach(({ message, path }: ErrorDetail) => {
      errors[path[0]] = message.replace(/\"/g, "");
    });
  }

  return errors;
};
