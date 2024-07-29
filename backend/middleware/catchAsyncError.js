export const catchAsyncError = (thefuction) => {
  return (req, res, next) => {
    Promise.resolve(thefuction(req, res, next)).catch(next);
  };
};
