# mongodb-ace-autocompleter [![][npm_img]][npm_url]

> Provides MongoDB [custom ACE Editor auto-completers](https://github.com/ajaxorg/ace/wiki/How-to-enable-Autocomplete-in-the-Ace-editor)

## Usage

### Aggregation Pipelines

Provides completions within the context of an individual aggregation pipeline stage:

```javascript
import ace from 'ace-builds';
import { StageAutoCompleter } from 'mongodb-ace-autocompleter';

// Get the basic text completer from Ace for fallback suggestions.
import tools from 'ace-builds/src-noconflict/ext-language_tools';
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

### Queries

Provides completions within the context of a `find(query)`:

```javascript
import ace from 'ace-builds';
import { QueryAutoCompleter } from 'mongodb-ace-autocompleter';

// Get the basic text completer from Ace for fallback suggestions.
import tools from 'ace-builds/src-noconflict/ext-language_tools';
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

## Related

- [`mongodb-js/ace-mode`](https://github.com/mongodb-js/ace-mode) MongoDB highlighting rules for ACE Editor.
- [`mongodb-js/ace-theme`](https://github.com/mongodb-js/ace-theme) CSS highlighting styles for multiline ACE Editor.
- [`mongodb-js/ace-theme-query`](https://github.com/mongodb-js/ace-theme-query) CSS highlighting styles for ACE Editor as single line input.
- [`mongodb-js/stage-validator`](https://github.com/mongodb-js/stage-validator) Aggregation Pipeline Stage grammar.

## Misc

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

## Release
```npm run release```

## License

Apache 2.0

[npm_img]: https://img.shields.io/npm/v/mongodb-ace-autocompleter.svg?style=flat-square
[npm_url]: https://www.npmjs.org/package/mongodb-ace-autocompleter
