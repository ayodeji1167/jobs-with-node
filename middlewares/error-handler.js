const errorHandler = (err, req, res, next) => {
  let customApiError = {
    statusCode: err.statusCode || 500,
    mssg: err.message || "Something Went Wrong In The Server",
  };

  res.status(customApiError.statusCode).json({ mssg: customApiError.mssg });
};

module.exports = errorHandler;
