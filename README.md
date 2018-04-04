# mongodb-ace-autocompleter [![][travis_img]][travis_url] [![][npm_img]][npm_url]

## MongoDB Ace Autocompleter

### Usage with Ace editor

Autocompletion on aggregation pipeline stages:

```javascript
import ace from 'brace';
import { StageAutoCompleter } from 'mongodb-ace-autocompleter';

// Get the basic text completer from Ace for fallback suggestions.
const tools = ace.acequire('ace/ext/language_tools');
const textCompleter = tools.textCompleter;

// For auto completion of agg pipeline stages, pass the server version,
// the text completer, the schema fields, and the stage operator.
const stageAutoCompleter = new StageAutoCompleter(
  '3.6.0',
  textCompleter,
  { name: 'String' }
  '$match'
);
tools.setCompleters([ stageAutoCompleter ]);
```

Autocompletion on queries:

```javascript
import ace from 'brace';
import { QueryAutoCompleter } from 'mongodb-ace-autocompleter';

// Get the basic text completer from Ace for fallback suggestions.
const tools = ace.acequire('ace/ext/language_tools');
const textCompleter = tools.textCompleter;

// For auto completion of queries, pass the server version,
// the text completer, and the schema fields
const queryAutoCompleter = new QueryAutoCompleter(
  '3.6.0',
  textCompleter,
  { name: 'String' }
);
tools.setCompleters([ queryAutoCompleter ]);
```

## License

Apache 2.0

[travis_img]: https://travis-ci.org/mongodb-js/ace-autocompleter.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/ace-autocompleter
[npm_img]: https://img.shields.io/npm/v/mongodb-ace-autocompleter.svg?style=flat-square
[npm_url]: https://www.npmjs.org/package/mongodb-ace-autocompleter
