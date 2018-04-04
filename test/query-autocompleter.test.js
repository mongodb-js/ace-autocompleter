const { EditSession } = require('brace');
const ace = require('brace');
const { QueryAutoCompleter } = require('../');

require('brace/mode/javascript');
require('brace/ext/language_tools');

const { Mode } = ace.acequire('ace/mode/javascript');
const { textCompleter } = ace.acequire('ace/ext/language_tools');

describe('QueryAutoCompleter', () => {
  const fields = [
    { name: 'name', value: 'name', score: 1, meta: 'field', version: '0.0.0' }
  ];
  const editor = sinon.spy();

  describe('#getCompletions', () => {
    context('when the current token is a string', () => {
      context('when there are no previous autocompletions', () => {
        const completer = new QueryAutoCompleter('3.4.0', textCompleter, fields);
        const session = new EditSession('', new Mode());
        const position = { row: 0, column: 0 };

        it('returns no results', () => {
          completer.getCompletions(editor, session, position, '', (error, results) => {
            expect(error).to.equal(null);
            expect(results).to.deep.equal([]);
          });
        });
      });

      context('when the string is a $', () => {

      });

      context('when the string is $a', () => {

      });

      context('when the string matches a bson type', () => {

      });

      context('when the version doesnt match all operators', () => {

      });

      context('when the version doesnt match a bson type', () => {

      });
    });
  });
});
