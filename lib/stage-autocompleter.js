const semver = require('semver');
const CONVERSION_OPERATORS = require('./constants/conversion-operators');
const EXPRESSION_OPERATORS = require('./constants/expression-operators');
const ACCUMULATORS = require('./constants/accumulators');
const BSON_TYPES = require('./constants/bson-types');
const QueryAutoCompleter = require('./query-autocompleter');
const filter = require('./filter');

/**
 * String token type.
 */
const STRING = 'string';

/**
 * The proect stage operator.
 */
const PROJECT = '$project';

/**
 * The group stage operator.
 */
const GROUP = '$group';

/**
 * The match operator.
 */
const MATCH = '$match';

/**
 * The dollar const.
 */
const DOLLAR = '$';

/**
 * The base completions.
 */
const BASE_COMPLETIONS = EXPRESSION_OPERATORS.concat(
  CONVERSION_OPERATORS.concat(BSON_TYPES)
);

/**
 * Adds autocomplete suggestions based on the aggregation pipeline
 * operators.
 */
class StageAutoCompleter {
  /**
   * Get accumulator completions based on the stage identifier.
   *
   * @returns {Array} The accumulators.
   */
  accumulators() {
    if (this.stageOperator) {
      if (this.stageOperator === PROJECT) {
        return ACCUMULATORS.filter(acc => {
          return (
            acc.projectVersion && semver.gte(this.version, acc.projectVersion)
          );
        });
      } else if (this.stageOperator === GROUP) {
        return ACCUMULATORS;
      }
    }
    return [];
  }

  /**
   * Instantiate a new completer.
   *
   * @param {String} version - The version.
   * @param {TextCompleter} textCompleter - The fallback Ace text completer.
   * @param {Array} fields - The collection fields.
   * @param {String} stageOperator - The current stage operator.
   */
  constructor(version, textCompleter, fields, stageOperator) {
    this.version = version;
    this.textCompleter = textCompleter;
    this.fields = fields;
    this.variableFields = this.generateVariableFields(fields);
    this.stageOperator = stageOperator;
    this.queryAutoCompleter = new QueryAutoCompleter(
      version,
      textCompleter,
      fields
    );
  }

  /**
   * Update the autocompleter with new fields and stage operator.
   *
   * @param {Array} fields - The new fields.
   * @param {String} stageOperator - The stage operator.
   */
  update(fields, stageOperator) {
    this.fields = fields;
    this.variableFields = this.generateVariableFields(fields);
    this.queryAutoCompleter.fields = fields;
    this.stageOperator = stageOperator;
  }

  /**
   * Generate variable fields.
   *
   * @param {Array} fields - The fields.
   *
   * @returns {Array} The variable fields.
   */
  generateVariableFields(fields) {
    return fields.map(field => {
      return {
        name: `$${field.name.replace(/"/g, '')}`,
        value: `$${field.value.replace(/"/g, '')}`,
        meta: field.meta,
        version: field.version,
        score: 1
      };
    });
  }

  /**
   * Get the completion list for the provided params.
   *
   * @param {Editor} editor - The ACE editor.
   * @param {EditSession} session - The current editor session.
   * @param {Position} position - The cursor position.
   * @param {String} prefix - The string prefix to complete.
   * @param {Function} done - The done callback.
   *
   * @returns {Function} The completion function.
   */
  getCompletions(editor, session, position, prefix, done) {
    // Empty prefixes do not return results.
    if (prefix === '') return done(null, []);
    // If the current token is a string with single or double quotes, then
    // we want to use the local text completer instead of suggesting operators.
    // This is so we can suggest user variable names inside the pipeline that they
    // have already typed.
    const currentToken = session.getTokenAt(position.row, position.column);
    if (currentToken.type === STRING) {
      if (prefix === DOLLAR) {
        return done(null, this.variableFields);
      }
      return this.textCompleter.getCompletions(
        editor,
        session,
        position,
        prefix,
        done
      );
    }
    // Comments block do not return results.
    if (currentToken.type.includes('comment')) {
      return done(null, []);
    }
    // If the current token is not a string, then we proceed as normal to suggest
    // operators to the user.
    if (this.stageOperator && this.stageOperator === MATCH) {
      this.queryAutoCompleter.getCompletions(
        editor,
        session,
        position,
        prefix,
        done
      );
    } else {
      const expressions = BASE_COMPLETIONS.concat(this.accumulators()).concat(
        this.fields
      );
      return done(null, filter(this.version, expressions, prefix));
    }
  }
}

module.exports = StageAutoCompleter;
