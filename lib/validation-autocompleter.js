const QUERY_OPERATORS = require('./constants/query-operators');
const BSON_TYPES = require('./constants/bson-types');
const JSON_SCHEMA = require('./constants/json-schema');
const BSON_TYPE_ALIASES = require('./constants/bson-type-aliases');
const filter = require('./filter');

/**
 * String token type.
 */
const STRING = 'string';

/**
 * The match completions.
 */
const MATCH_COMPLETIONS = QUERY_OPERATORS.concat(BSON_TYPES);

/**
 * Adds autocomplete suggestions for validation queries.
 */
class ValidationAutoCompleter {
  /**
   * Instantiate a new completer.
   *
   * @param {String} version - The version.
   * @param {TextCompleter} textCompleter - The fallback Ace text completer.
   * @param {Array} fields - The collection fields.
   */
  constructor(version, textCompleter, fields) {
    this.version = version;
    this.textCompleter = textCompleter;
    this.fields = fields;
  }

  /**
   * Update the autocompleter with new fields.
   *
   * @param {Array} fields - The new fields.
   */
  update(fields) {
    this.fields = fields;
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
    // we want to suggest document fields instead of suggesting operators.
    const currentToken = session.getTokenAt(position.row, position.column);
    if (currentToken.type === STRING) {
      const strings = BSON_TYPE_ALIASES.concat(this.fields);
      return done(null, filter(this.version, strings, prefix));
    }
    // If the current token is not a string, then we proceed as normal to suggest
    // operators to the user.
    const expressions = MATCH_COMPLETIONS.concat(this.fields, JSON_SCHEMA);
    return done(null, filter(this.version, expressions, prefix));
  }
}

module.exports = ValidationAutoCompleter;
