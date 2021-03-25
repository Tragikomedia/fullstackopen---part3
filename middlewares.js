const unknownPath = (req, res) => {
    res.status(404).end("404 Not Found");
  };

const errorHandler = (error, req, res, next) => {
    console.error(error);
    if (error.name === "CastError")
      return res.status(400).json({ error: "Malformatted id" });
    next(error);
  };

  module.exports = { errorHandler, unknownPath};