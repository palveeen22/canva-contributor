const errorHandler = (error, req, res, next) => {
  console.log(error);
  let code = 500;
  let message = "INTERNAL SERVER ERROR";

  if (error.name === "SequelizeDatabaseError") {
    code = 400;
    message = "Invalid input";
  }
  if (error.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid token";
  }
  if (error.name === "Invalid email/password") {
    code = 401;
    message = "Invalid email/password";
  }
  if (error.name == "Unauthorized") {
    code = 401;
    message = "Invalid token";
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
