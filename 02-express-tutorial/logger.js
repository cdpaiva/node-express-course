export const logger = (req, res, next) => {
  console.log(`${req.method}: ${req.url} ${getDateTime()}`);
  next();
};

// Nicer formatting for the time logged
const getDateTime = () => {
  const d = new Date();

  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()} ${
    d.getMonth() + 1
  }-${d.getDate()}-${d.getFullYear()}`;
};
