const unknownPath = (req, res) => {
  res.status(404).end("404 Not Found");
};

const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === "CastError")
    return res.status(400).json({ error: "Malformatted id" });
  else if (error.name)
    return res.status(400).json({ error: error.message });
  next(error);
};

module.exports = { errorHandler, unknownPath };
