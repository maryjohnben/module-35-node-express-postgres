function asyncErrorBoundary(delegate, defaultStatus) {
  // returns a callback function to handle API calls
  // Promise - 3 states (pending, resolved, rejected)
  // delegate is a function passed in to perform the try-catch on
  // then - callback function that runs the delegate function
  // catch - callback function to catch the error and handle rejections
  return (request, response, next) => {
    Promise.resolve()
      .then(() => delegate(request, response, next)) // try
      .catch((error = {}) => {
        // catch (err)
        const { status = defaultStatus, message = error } = error;
        next({
          status,
          message,
        });
      });
  };
}

module.exports = asyncErrorBoundary;
