export const consoleLog = (req, res, next) => {
  console.log("Passed in the middleware first");
  next();
};
