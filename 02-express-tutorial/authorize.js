// Middleware can mutate the req object and add new properties to it

export const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "john") {
    req.user = { name: "john", id: 1 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};
