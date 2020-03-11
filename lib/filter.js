const semver = require('semver');

/**
 * Is the env supported?
 *
 * @param {Array} opEnvs - The operation supported environments.
 * @param {String} env - The current env.
 *
 * @returns {boolean} If the env is supported.
 */
const isSupportedEnv = (opEnvs, env) => {
  if (!opEnvs) return true;
  return opEnvs.includes(env);
};

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
      semver.gte(version, e.version) &&
      isSupportedEnv(e.env, env);
  });
};

module.exports = filter;
