module.exports = (req, res) => res.status(404).json({
  message: `Opsss, route '${req.path}' not found!`,
});