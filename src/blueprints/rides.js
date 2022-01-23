const Joi = require('joi');

const getRides = Joi.object().keys({
  query: {
    page: Joi.number().integer().positive().optional().default(1),
    limit: Joi.number().integer().min(-1).default(-1),
  },
});

const blueprintRides = {
  getRides,
};

module.exports = blueprintRides;
