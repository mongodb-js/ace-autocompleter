const semver = require('semver');

/**
 * Filter the entires based on the prefix.
 *
 * @param {String} version - The server version.
 * @param {Array} entries - The entries to filter.
 * @param {String} prefix - The prefix.
 * @param {boolean} isAtlas - Is the cluster on Atlas.
 * @param {boolean} isDataLake - Is the cluster ADL.
 *
 * @returns {Array} The matching entries.
 */
const filter = (version, entries, prefix, isAtlas, isDataLake) => {
  return entries.filter((e) => {
    if (!e.name) return false;
    if (e.atlasOnly && !isAtlas) return false;
    if (e.adlOnly && !isDataLake) return false;
    return e.name.startsWith(prefix) &&
      semver.gte(version, e.version);
  });
};

module.exports = filter;
