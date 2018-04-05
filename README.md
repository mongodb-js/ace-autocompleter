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
// the text completer, the processed schema fields, and the stage operator.
const stageAutoCompleter = new StageAutoCompleter(
  '3.6.0',
  textCompleter,
  [{
    name: 'name',
    value: 'name',
    score: 1,
    meta: 'field',
    version: '0.0.0'
  }],
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
// the text completer, and the processed schema fields
const queryAutoCompleter = new QueryAutoCompleter(
  '3.6.0',
  textCompleter,
  [{
    name: 'name',
    value: 'name',
    score: 1,
    meta: 'field',
    version: '0.0.0'
  }]
);
tools.setCompleters([ queryAutoCompleter ]);
```

Utility function to convert from the fields returned from the field store to the
Ace friendly format. (Can be done in a reducer in the app).

```javascript
const process = (fields) => {
  return Object.keys(fields).map((key) => {
    const field = key.indexOf('.') > -1 ? `"${key}"` : key;
    return {
      name: key,
      value: field,
      score: 1,
      meta: 'field',
      version: '0.0.0'
    };
  });
};
```

## License

Apache 2.0

[travis_img]: https://travis-ci.org/mongodb-js/ace-autocompleter.svg?branch=master
[travis_url]: https://travis-ci.org/mongodb-js/ace-autocompleter
[npm_img]: https://img.shields.io/npm/v/mongodb-ace-autocompleter.svg?style=flat-square
[npm_url]: https://www.npmjs.org/package/mongodb-ace-autocompleter
