/**
 * The stage operators.
 */
const STAGE_OPERATORS = [
  {
    name: '$addFields',
    value: '$addFields',
    label: '$addFields',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    description: 'Adds new fields to documents.',
    comment: '/**\n * newField - The new field name.\n * expression - The new field expression.\n */\n',
    snippet: '{\n  ${1:<<newField>>}: ${2:<<expression>>}\n}'
  },
  {
    name: '$bucket',
    value: '$bucket',
    label: '$bucket',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    description: 'Categorizes incoming documents into groups, called buckets, based on a specified expression and bucket boundaries.',
    comment: '/**\n * expression: The expression to group by.\n * lowerbound: The first bucket boundary.\n * literal: Optional default _id.\n * output1: Optional output name.\n * accumulator: Optional output expression.\n */\n',
    snippet: '{\n  groupBy: ${1:<<expression>>},\n  boundaries: [ ${2:<<lowerbound>>}, ${3:...} ],\n  default: ${4:<<literal>>},\n  output: {\n     ${5:<<output1>>}: { ${6:<<accumulator>>} }, ${7:...}\n  }\n}'
  },
  {
    name: '$bucketAuto',
    value: '$bucketAuto',
    label: '$bucketAuto',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    description: 'Categorizes incoming documents into a specific number of groups, called buckets, based on a specified expression. Bucket boundaries are automatically determined in an attempt to evenly distribute the documents into the specified number of buckets.',
    comment: '/**\n * expression - The group by expression.\n * buckets: The number of buckets.\n * output1: Optional output field name.\n * accumulator: Optional output expression.\n * granularity - Optional number series.\n */\n',
    snippet: '{\n  groupBy: ${1:<<expression>>},\n  buckets: ${2:<<number>>},\n  output: {\n    ${3:<<output1>>}: ${4:<<accumulator>>}, ${5:...}\n  },\n  granularity: \'${6:<<string>>}\'\n}'
  },
  {
    name: '$collStats',
    value: '$collStats',
    label: '$collStats',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    description: 'Returns statistics regarding a collection or view.',
    comment: '/**\n * histograms - Optional latency histograms.\n * storageStats - Optional storage stats.\n*/\n',
    snippet: '{\n  latencyStats: {\n    histograms: ${1:<<boolean>>}\n  },\n  storageStats: {${2:}},\n}'
  },
  {
    name: '$count',
    value: '$count',
    label: '$count',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    description: 'Returns a count of the number of documents at this stage of the aggregation pipeline.',
    comment: '/**\n * Provide the field name for the count.\n */\n',
    snippet: '\'${1:<<string>>}\''
  },
  {
    name: '$currentOp',
    value: '$currentOp',
    label: '$currentOp',
    score: 1,
    meta: 'stage',
    version: '3.6.0',
    description: 'Returns information on active and/or dormant operations for the MongoDB deployment.',
    comment: '/**\n * allUsers - Report ops for all users.\n * idleConnections - Also report idle.\n */\n',
    snippet: '{\n  allUsers: ${1:<<boolean>>},\n  idleConnections: ${2:<<boolean>>}\n}'
  },
  {
    name: '$facet',
    value: '$facet',
    label: '$facet',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    description: 'Processes multiple aggregation pipelines within a single stage on the same set of input documents.',
    comment: '/**\n * outputField1 - The first output field.\n * stage1 - The first aggregation stage.\n */\n',
    snippet: '{\n  ${1:<<outputField1>>}: [ ${2:<<stage1>>}, ${3:...} ]\n}'
  },
  {
    name: '$geoNear',
    value: '$geoNear',
    label: '$geoNear',
    score: 1,
    meta: 'stage',
    version: '2.4.0',
    description: 'Returns an ordered stream of documents based on the proximity to a geospatial point.',
    comment: '/**\n * options - The geo query options.\n */\n',
    snippet: '{\n  ${1:<<options>>}\n}'
  },
  {
    name: '$graphLookup',
    value: '$graphLookup',
    label: '$graphLookup',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    description: 'Performs a recursive search on a collection.',
    comment: '/**\n * from - The target collection.\n * startWith - Expression to start.\n * connectFromField - Field to connect.\n * connectToField - Field to connect to.\n * as - Name of the array field.\n * maxDepth - Optional max recursion depth.\n * depthField - Optional Name of the depth field.\n * restrictSearchWithMatch - Optional query.\n */\n',
    snippet: '{\n  from: \'${1:<<string>>}\',\n' +
    '  startWith: ${2:<<expression>>},\n' +
    '  connectFromField: \'${3:<<string>>}\',\n' +
    '  connectToField: \'${4:<<string>>}\',\n' +
    '  as: \'${5:<<string>>}\',\n' +
    '  maxDepth: ${6:<<number>>},\n' +
    '  depthField: \'${7:<<string>>}\',\n' +
    '  restrictSearchWithMatch: {${8}}\n}'
  },
  {
    name: '$group',
    value: '$group',
    label: '$group',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    description: 'Groups input documents by a specified identifier expression and applies the accumulator expression(s), if specified, to each group.',
    comment: '/**\n * _id - The id of the group.\n * field1 - The first field name.\n */\n',
    snippet: '{\n  _id: ${1:<<expression>>},\n  ${2:<<field1>>}: {\n    ${3:<<accumulator1>>}: ${4:<<expression1>>}\n  }\n}'
  },
  {
    name: '$indexStats',
    value: '$indexStats',
    label: '$indexStats',
    score: 1,
    meta: 'stage',
    version: '3.2.0',
    description: 'Returns statistics regarding the use of each index for the collection.',
    comment: '/**\n * No parameters.\n */\n',
    snippet: '{}'
  },
  {
    name: '$limit',
    value: '$limit',
    label: '$limit',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    description: 'Passes the first n documents unmodified to the pipeline where n is the specified limit.',
    comment: '/**\n * Provide the number of documents to limit.\n */\n',
    snippet: '${1:<<number>>}'
  },
  {
    name: '$listLocalSessions',
    value: '$listLocalSessions',
    label: '$listLocalSessions',
    score: 1,
    meta: 'stage',
    version: '3.6.0',
    description: 'Lists all active sessions recently in use on the currently connected mongos or mongod instance.',
    comment: '/**\n * users - Optional users to list sessions for.\n * allUsers - Optional list sessions for all.\n */\n',
    snippet: '{\n  users: [{ user: ${1:<<string>>}, db: ${2:<<string>>} }],\n  allUsers: ${3:<<boolean>>}\n}'
  },
  {
    name: '$listSessions',
    value: '$listSessions',
    label: '$listSessions',
    score: 1,
    meta: 'stage',
    version: '3.6.0',
    description: 'Lists all sessions that have been active long enough to propagate to the system.sessions collection.',
    comment: '/**\n * users - Optional users to list sessions for.\n * allUsers - Optional list sessions for all.\n */\n',
    snippet: '{\n  users: [{ user: ${1:<<string>>}, db: ${2:<<string>>} }],\n  allUsers: ${3:<<boolean>>}\n}'
  },
  {
    name: '$lookup',
    value: '$lookup',
    label: '$lookup',
    score: 1,
    meta: 'stage',
    version: '3.2.0',
    description: 'Performs a left outer join to another collection in the same database to filter in documents from the “joined” collection for processing.',
    comment: '/**\n * from - The target collection.\n * localField - The local join field.\n * foreignField - The target join field.\n * as - The name for the results.\n */\n',
    snippet: '{\n  from: \'${1:<<string>>}\',\n' +
    '  localField: \'${2:<<string>>}\',\n' +
    '  foreignField: \'${3:<<string>>}\',\n' +
    '  as: \'${4:<<string>>}\'\n}'
  },
  {
    name: '$match',
    value: '$match',
    label: '$match',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    description: 'Filters the document stream to allow only matching documents to pass unmodified into the next pipeline stage.',
    comment: '/**\n * query - The query in MQL.\n */\n',
    snippet: '{\n  ${1:<<query>>}\n}'
  },
  {
    name: '$out',
    value: '$out',
    label: '$out',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    description: 'Writes the resulting documents of the aggregation pipeline to a collection.',
    comment: '/**\n * Provide the name of the output collection.\n */',
    snippet: '\'${1:<<string>>}\''
  },
  {
    name: '$project',
    value: '$project',
    label: '$project',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    description: 'Reshapes each document in the stream, such as by adding new fields or removing existing fields.',
    comment: '/**\n * specifications - The fields to\n *   include or exclude.\n */\n',
    snippet: '{\n  ${1:<<specification(s)>>}\n}'
  },
  {
    name: '$redact',
    value: '$redact',
    label: '$redact',
    score: 1,
    meta: 'stage',
    version: '2.6.0',
    description: 'Reshapes each document in the stream by restricting the content for each document based on information stored in the documents themselves.',
    comment: '/**\n * expression - Any valid expression that\n *   evaluates to $$DESCEND, $$PRUNE, or $$KEEP.\n */\n',
    snippet: '{\n  ${1:<<expression>>}\n}'
  },
  {
    name: '$replaceRoot',
    value: '$replaceRoot',
    label: '$replaceRoot',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    description: 'Replaces a document with the specified embedded document.',
    comment: '/**\n * replacementDocument - A document or string.\n */\n',
    snippet: '{\n  newRoot: ${1:<<<replacementDocument>>}\n}'
  },
  {
    name: '$sample',
    value: '$sample',
    label: '$sample',
    score: 1,
    meta: 'stage',
    version: '3.2.0',
    description: 'Randomly selects the specified number of documents from its input.',
    comment: '/**\n * size - The number of documents to sample.\n */\n',
    snippet: '{\n  size: ${1:<<number>>}\n}'
  },
  {
    name: '$skip',
    value: '$skip',
    label: '$skip',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    description: 'Skips the first n documents where n is the specified skip number and passes the remaining documents unmodified to the pipeline.',
    comment: '/**\n * Provide the number of documents to skip.\n */\n',
    snippet: '${1:<<number>>}'
  },
  {
    name: '$sort',
    value: '$sort',
    label: '$sort',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    description: 'Reorders the document stream by a specified sort key.',
    comment: '/**\n * Provide any number of field/order pairs.\n */\n',
    snippet: '{\n  ${1:<<field1>>}: ${2:<<sortOrder>>}, ${3:...}\n}'
  },
  {
    name: '$sortByCount',
    value: '$sortByCount',
    label: '$sortByCount',
    score: 1,
    meta: 'stage',
    version: '3.4.0',
    description: 'Groups incoming documents based on the value of a specified expression, then computes the count of documents in each distinct group.',
    comment: '/**\n * expression - Grouping expression or string.\n */\n',
    snippet: '{\n  ${1:<<expression>>}\n}'
  },
  {
    name: '$unwind',
    value: '$unwind',
    label: '$unwind',
    score: 1,
    meta: 'stage',
    version: '2.2.0',
    description: 'Deconstructs an array field from the input documents to output a document for each element.',
    comment: '/**\n * path - Path to the array field.\n * includeArrayIndex - Optional name for index.\n * preserveNullAndEmptyArrays - Optional\n *   toggle to unwind null and empty values.\n */\n',
    snippet: '{\n  path: ${1:<<path>>},\n' +
    '  includeArrayIndex: \'${2:<<string>>}\',\n' +
    '  preserveNullAndEmptyArrays: ${3:<<boolean>>}\n}'
  }
];

/**
 * The list of stage operator names.
 */
const STAGE_OPERATOR_NAMES = STAGE_OPERATORS.map(op => op.name);

module.exports = STAGE_OPERATORS;
module.exports.STAGE_OPERATOR_NAMES = STAGE_OPERATOR_NAMES;
