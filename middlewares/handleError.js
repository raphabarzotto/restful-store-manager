// source: aulas
module.exports = (error, _req, res, _next) => {
  // debug raiz - vai ser tirado depois
  console.log(error);
  res.status(500).json(error.message);
}; 