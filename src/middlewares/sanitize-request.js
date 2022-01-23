
module.exports = (blueprint) => {
  return async (req, res, next) => {
    const {error, value} = await blueprint.validate(req, { stripUnknown: true });
    if (error){
      return res.send({
        error_code: 'VALIDATION_ERROR',
        error: error.message
      });
    }

    // These three are the main external input, but it can be further extended
    req.query = value.query;
    req.params = value.params;
    req.body = value.body;
    return next();
  }
}
