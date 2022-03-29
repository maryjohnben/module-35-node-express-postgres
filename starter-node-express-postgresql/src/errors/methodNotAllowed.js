function methodNotAllowed(req, res, next) {
  //error handler will catch this
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}

module.exports = methodNotAllowed;
