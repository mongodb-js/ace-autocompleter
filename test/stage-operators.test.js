const { expect } = require('chai');
const { ENVS } = require('../lib/constants/env');
const { ANY_NAMESPACE } = require('../lib/constants/ns');
const stageOperators = require('../lib/constants/stage-operators');

describe('stage operators', function() {
  stageOperators.forEach((operator) => {
    it(`${operator.name} has all the required properties`, () => {
      expect(Object.keys(operator).sort()).to.deep.equal([
        'name',
        'value',
        'label',
        'score',
        'env',
        'meta',
        'version',
        'outputStage',
        'apiVersions',
        'namespaces',
        'description',
        'comment',
        'snippet'
      ].sort());

      expect(operator.name).to.be.a('string');
      expect(operator.value).to.be.a('string');
      expect(operator.label).to.be.a('string');
      expect(operator.outputStage).to.be.a('boolean');
      expect(operator.score).to.be.a('number');
      expect(operator.env).to.be.an('array');

      operator.env.forEach(e => {
        expect(ENVS.includes(e));
      });

      expect(operator.meta).to.equal('stage');

      // pre-releases are left out intentionally
      // the match for prerelease is done in client code
      // by stripping the server version of the pre-release:
      // semver.gt(stripPrelelease(serverVersion, operator.version))
      //
      expect(operator.version).to.match(/^\d+\.\d+\.\d+$/);

      expect(operator.apiVersions).to.be.an('array');

      operator.apiVersions.forEach(v => {
        expect(v).to.be.a('number');
      });

      expect(operator.namespaces).to.be.an('array');

      operator.namespaces.forEach(n => {
        expect(ANY_NAMESPACE.includes(n));
      });

      expect(operator.description).to.be.a('string');
      expect(operator.comment).to.be.a('string');
      expect(operator.snippet).to.be.a('string');
    });
  });
});
