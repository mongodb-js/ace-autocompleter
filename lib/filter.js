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
  const parsedVersion = semver.parse(version);
  if (!parsedVersion) return false;
  return entries.filter((e) => {
    if (!e.name) return false;
    const cleanVersion = [
      parsedVersion.major,
      parsedVersion.minor,
      parsedVersion.patch
    ].join('.');
    return e.name.startsWith(prefix) &&
      semver.gte(cleanVersion, e.version);
  });
};

module.exports = filter;
