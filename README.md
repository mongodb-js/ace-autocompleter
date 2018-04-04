# mongodb-ace-autocompleter [![][travis_img]][travis_url]

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
// the text completer, the stage index in the pipeline, the schema fields,
// and the stage operator.
const stageAutoCompleter = new StageAutoCompleter(
  '3.6.0',
  textCompleter,
  1,
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
