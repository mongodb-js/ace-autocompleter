const { expect } = require('chai');
const acorn = require('acorn');

const { ENVS } = require('../lib/constants/env');
const { ANY_NAMESPACE } = require('../lib/constants/ns');
const stageOperators = require('../lib/constants/stage-operators');

// Replaces any placeholder with a variable,
// the resulting snippet should always be parseable.
function replacePlaceholders(snippet) {
  return snippet
    .replace(/\${\d+:?[A-z1-9.()]*}/g, 'x')
    .replace(/\.\.\./g, 'rest');
}

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

    it(`${operator.name} has a properly formatted comment`, () => {
      expect(
        operator.comment.startsWith('/**\n'),
        'expected comment to be open'
      ).to.be.true;

      const commentLines = operator.comment.split('\n');
      commentLines.shift();
      commentLines.pop();
      commentLines.pop();

      for (const commentLine of commentLines) {
        try {
          expect(/^ \*( |$)/.test(commentLine), 'expected comment to be indented properly').to.be.true;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.info(commentLine);
          throw e;
        }

        const spaces = commentLine.replace(/^ \* ?/, '').match(/^ */)[0].length;
        expect(spaces % 2, 'expected comment to be indented properly').to.equal(0);
      }

      expect(operator.comment.endsWith('\n */\n'), 'expected comment to be closed properly').to.be.true;
    });

    it(`${operator.name} has a properly formatted snippet`, () => {
      const snippet = replacePlaceholders(operator.snippet);

      try {
        expect(
          () => acorn.parseExpressionAt(snippet, 0, { ecmaVersion: '2020' }),
          'expected snippet to parse'
        ).not.to.throw();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.info(snippet);
        throw e;
      }

      const snippetLines = snippet.split('\n');

      for (const snippetLine of snippetLines) {
        const spaces = snippetLine.match(/^ */)[0].length;
        expect(spaces % 2, 'expected snippet to be indented properly').to.equal(0);
      }
    });
  });
});
