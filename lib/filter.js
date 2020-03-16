const semver = require('semver');

/**
 * Filter the entires based on the prefix.
 *
 * @param {String} version - The server version.
 * @param {Array} entries - The entries to filter.
 * @param {String} prefix - The prefix.
 *
 * @returns {Array} The matching entries.
 */
const filter = (version, entries, prefix) => {
  return entries.filter((e) => {
    if (!e.name) return false;
    return e.name.startsWith(prefix) &&
      semver.gte(version, e.version);
  });
};

module.exports = filter;
