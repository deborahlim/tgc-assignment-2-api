// Handle errors appropriately
exports.errorResponse = (res, message, statusCode = 500, error = {}) => {
  res.status(statusCode).json({
    success: false,
    message,
    error: {
      statusCode,
      message,
      error,
    },
  });
};
// https://blog.idrisolubisi.com/global-error-handling-in-node-js