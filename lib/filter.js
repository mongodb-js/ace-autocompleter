const semver = require('semver');

/**
 * Filter the entires based on the prefix.
 *
 * @param {String} version - The server version.
 * @param {Array} entries - The entries to filter.
 * @param {String} prefix - The prefix.
 * @param {String} env - The cluster env.
 *
 * @returns {Array} The matching entries.
 */
const filter = (version, entries, prefix, env) => {
  return entries.filter((e) => {
    if (!e.name) return false;
    return e.name.startsWith(prefix) &&
      semver.gte(version, e.version);
  });
};

module.exports = filter;
