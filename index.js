module.exports = require('./lib/query-autocompleter');
module.exports.QueryAutoCompleter = require('./lib/query-autocompleter');
module.exports.StageAutoCompleter = require('./lib/stage-autocompleter');
module.exports.ValidationAutoCompleter = require('./lib/validation-autocompleter');
module.exports.ACCUMULATORS = require('./lib/constants/accumulators');
module.exports.BSON_TYPES = require('./lib/constants/bson-types');
module.exports.EXPRESSION_OPERATORS = require('./lib/constants/expression-operators');
module.exports.CONVERSION_OPERATORS = require('./lib/constants/conversion-operators');
module.exports.QUERY_OPERATORS = require('./lib/constants/query-operators');
module.exports.STAGE_OPERATORS = require('./lib/constants/stage-operators');
module.exports.JSON_SCHEMA = require('./lib/constants/json-schema');
module.exports.BSON_TYPE_ALIASES = require('./lib/constants/bson-type-aliases');

const {
  ATLAS,
  ADL,
  ON_PREM,
  ENVS
} = require('./lib/constants/env');

module.exports.ATLAS = ATLAS;
module.exports.ADL = ADL;
module.exports.ON_PREM = ON_PREM;
module.exports.ENVS = ENVS;
