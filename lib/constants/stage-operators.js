const {
  ATLAS,
  ADL,
  ON_PREM
} = require('./env');

/**
 * The stage operators.
 */
const STAGE_OPERATORS = [
  {
    name: '$addFields',
    value: '$addFields',
    label: '$addFields',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.4.0',
    apiVersions: [1],
    description: 'Adds new field(s) to a document with a computed value, or reassigns an existing field(s) with a computed value.',
    comment: '/**\n * newField: The new field name.\n * expression: The new field expression.\n */\n',
    snippet: '{\n  ${1:newField}: ${2:expression}, ${3:...}\n}'
  },
  {
    name: '$bucket',
    value: '$bucket',
    label: '$bucket',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.4.0',
    apiVersions: [1],
    description: 'Categorizes incoming documents into groups, called buckets, based on specified boundaries.',
    comment: '/**\n * groupBy: The expression to group by.\n * boundaries: An array of the lower boundaries for each bucket.\n * default: The bucket name for documents that do not fall within the specified boundaries\n * output: {\n *    outputN: Optional. The output object may contain a single or numerous field names used to accumulate values per bucket.\n * }\n */\n',
    snippet: '{\n  groupBy: ${1:expression},\n  boundaries: [ ${2:lowerbound}, ${3:...} ],\n  default: ${4:literal},\n  output: {\n     ${5:outputN}: { ${6:accumulator} }, ${7:...}\n  }\n}'
  },
  {
    name: '$bucketAuto',
    value: '$bucketAuto',
    label: '$bucketAuto',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.4.0',
    apiVersions: [1],
    description: 'Automatically categorizes documents into a specified number of buckets, attempting even distribution if possible.',
    comment: '/**\n * groupBy: The expression to group by.\n * buckets: The desired number of buckets\n * output: {\n *    outputN: Optional. The output object may contain a single or numerous field names used to accumulate values per bucket.\n * }\n * granularity: Optional number series\n */\n',
    snippet: '{\n  groupBy: ${1:expression},\n  buckets: ${2:number},\n  output: {\n    ${3:outputN}: ${4:accumulator}, ${5:...}\n  },\n  granularity: \'${6:string}\'\n}'
  },
  {
    name: '$collStats',
    value: '$collStats',
    label: '$collStats',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.4.0',
    apiVersions: [],
    description: 'Returns statistics regarding a collection or view.',
    comment: '/**\n * histograms: Optional latency histograms.\n * storageStats: Optional storage stats.\n*/\n',
    snippet: '{\n  latencyStats: {\n    histograms: ${1:boolean}\n  },\n  storageStats: {${2:}},\n}'
  },
  {
    name: '$count',
    value: '$count',
    label: '$count',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.2.0',
    apiVersions: [1],
    description: 'Returns a count of the number of documents at this stage of the aggregation pipeline.',
    comment: '/**\n * Provide the field name for the count.\n */\n',
    snippet: '\'${1:string}\''
  },
  {
    name: '$facet',
    value: '$facet',
    label: '$facet',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.4.0',
    apiVersions: [1],
    description: 'Allows for multiple parellel aggregations to be specified.',
    comment: '/**\n * outputFieldN: The first output field.\n * stageN: The first aggregation stage.\n */\n',
    snippet: '{\n  ${1:outputFieldN}: [ ${2:stageN}, ${3:...} ]\n}'
  },
  {
    name: '$geoNear',
    value: '$geoNear',
    label: '$geoNear',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.4.0',
    apiVersions: [1],
    description: 'Returns documents based on proximity to a geospatial point.',
    comment: '/**\n * near: The point to search near.\n * distanceField: The calculated distance.\n * maxDistance: The maximum distance, in meters, documents can be before being excluded from results.\n * query: Limits results that match the query\n * includeLocs: Optional. Labels and includes the point used to match the document.\n * num: Optional. The maximum number of documents to return.\n * spherical: Defaults to false. Specifies whether to use spherical geometry.\n}',
    snippet: '{\n  near: { type: \'Point\', coordinates: [ ${1:number}, ${2:number} ] },\n' +
    '  distanceField: \'${3:string}\',\n' +
    '  maxDistance: ${4:number},\n' +
    '  query: {${5}},\n' +
    '  includeLocs: \'${6}\',\n' +
    '  num: ${7:number},\n' +
    '  spherical: ${8:boolean}\n}'
  },
  {
    name: '$graphLookup',
    value: '$graphLookup',
    label: '$graphLookup',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.4.0',
    apiVersions: [1],
    description: 'Performs a recursive search on a collection.',
    comment: '/**\n * from: The target collection.\n * startWith: Expression to start.\n * connectFromField: Field to connect.\n * connectToField: Field to connect to.\n * as: Name of the array field.\n * maxDepth: Optional max recursion depth.\n * depthField: Optional Name of the depth field.\n * restrictSearchWithMatch: Optional query.\n */\n',
    snippet: '{\n  from: \'${1:string}\',\n' +
    '  startWith: ${2:expression},\n' +
    '  connectFromField: \'${3:string}\',\n' +
    '  connectToField: \'${4:string}\',\n' +
    '  as: \'${5:string}\',\n' +
    '  maxDepth: ${6:number},\n' +
    '  depthField: \'${7:string}\',\n' +
    '  restrictSearchWithMatch: {${8}}\n}'
  },
  {
    name: '$group',
    value: '$group',
    label: '$group',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.2.0',
    apiVersions: [1],
    description: 'Groups documents by a specified expression.',
    comment: '/**\n * _id: The id of the group.\n * fieldN: The first field name.\n */\n',
    snippet: '{\n  _id: ${1:expression},\n  ${2:fieldN}: {\n    ${3:accumulatorN}: ${4:expressionN}\n  }\n}'
  },
  {
    name: '$indexStats',
    value: '$indexStats',
    label: '$indexStats',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.2.0',
    apiVersions: [],
    description: 'Returns statistics regarding the use of each index for the collection.',
    comment: '/**\n * No parameters.\n */\n',
    snippet: '{}'
  },
  {
    name: '$limit',
    value: '$limit',
    label: '$limit',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.2.0',
    apiVersions: [1],
    description: 'Limits the number of documents that flow into subsequent stages.',
    comment: '/**\n * Provide the number of documents to limit.\n */\n',
    snippet: '${1:number}'
  },
  {
    name: '$lookup',
    value: '$lookup',
    label: '$lookup',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.2.0',
    apiVersions: [1],
    description: 'Performs a join between two collections.',
    comment: '/**\n * from: The target collection.\n * localField: The local join field.\n * foreignField: The target join field.\n * as: The name for the results.\n * pipeline: The pipeline to run on the joined collection.\n * let: Optional variables to use in the pipeline field stages.\n */\n',
    snippet: '{\n  from: \'${1:string}\',\n' +
    '  localField: \'${2:string}\',\n' +
    '  foreignField: \'${3:string}\',\n' +
    '  as: \'${4:string}\'\n}'
  },
  {
    name: '$match',
    value: '$match',
    label: '$match',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.2.0',
    apiVersions: [1],
    description: 'Filters the document stream to allow only matching documents to pass through to subsequent stages.',
    comment: '/**\n * query: The query in MQL.\n */\n',
    snippet: '{\n  ${1:query}\n}'
  },
  {
    name: '$merge',
    value: '$merge',
    label: '$merge',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '4.1.11',
    apiVersions: [1],
    description: 'Merges the resulting documents into a collection, optionally overriding existing documents.',
    comment: '/**\n * into: The target collection.\n * on: Fields to  identify.\n * let: Defined variables.\n * whenMatched: Action for matching docs.\n * whenNotMatched: Action for non-matching docs.\n */\n',
    snippet: '{\n  into: \'${1:string}\',\n' +
    '  on: \'${2:string}\',\n' +
    '  let: \'${3:specification(s)}\',\n' +
    '  whenMatched: \'${4:string}\',\n' +
    '  whenNotMatched: \'${5:string}\'\n}'
  },
  {
    name: '$out',
    value: '$out',
    label: '$out',
    score: 1,
    env: [ ATLAS, ON_PREM ],
    meta: 'stage',
    version: '2.2.0',
    apiVersions: [1],
    description: 'Writes the result of a pipeline to a new or existing collection.',
    comment: '/**\n * Provide the name of the output collection.\n */\n',
    snippet: '\'${1:string}\''
  },
  {
    name: '$out',
    value: '$out',
    label: '$out',
    score: 1,
    env: [ ADL ],
    meta: 'stage',
    version: '4.0.0', // always available in ADL
    apiVersions: [1],
    description: 'Writes the result of a pipeline to an Atlas cluster or S3 bucket.',
    comment: '/**\n * s3Url: A S3 URL to save the data.\n * atlas: Parameters to save to Atlas.\n */\n',
    snippet: '{\n  s3: \'${1:s3url}\'\n  atlas: {\n    db: \'${2:db}\',\n    coll: \'${3:coll}\',\n    projectId: \'${4:projectId}\',\n    clusterName: \'${5:clusterName}\'\n  }\n}'
  },
  {
    name: '$project',
    value: '$project',
    label: '$project',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.2.0',
    apiVersions: [1],
    description: 'Adds new field(s) to a document with a computed value, or reassigns an existing field(s) with a computed value. Unlike $addFields, $project can also remove fields.',
    comment: '/**\n * specifications: The fields to\n *   include or exclude.\n */\n',
    snippet: '{\n  ${1:specification(s)}\n}'
  },
  {
    name: '$redact',
    value: '$redact',
    label: '$redact',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.6.0',
    apiVersions: [1],
    description: 'Restricts the content for each document based on information stored in the documents themselves',
    comment: '/**\n * expression: Any valid expression that\n *   evaluates to $$DESCEND, $$PRUNE, or $$KEEP.\n */\n',
    snippet: '{\n  ${1:expression}\n}'
  },
  {
    name: '$replaceWith',
    value: '$replaceWith',
    label: '$replaceWith',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '4.2.0',
    apiVersions: [1],
    description: 'Replaces a document with the specified embedded document.',
    comment: '/**\n * replacementDocument: A document or string.\n */\n',
    snippet: '{\n  newWith: ${1:replacementDocument}\n}'
  },
  {
    name: '$replaceRoot',
    value: '$replaceRoot',
    label: '$replaceRoot',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.4.0',
    apiVersions: [1],
    description: 'Replaces a document with the specified embedded document.',
    comment: '/**\n * replacementDocument: A document or string.\n */\n',
    snippet: '{\n  newRoot: ${1:replacementDocument}\n}'
  },
  {
    name: '$sample',
    value: '$sample',
    label: '$sample',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.2.0',
    apiVersions: [1],
    description: 'Randomly selects the specified number of documents from its input.',
    comment: '/**\n * size: The number of documents to sample.\n */\n',
    snippet: '{\n  size: ${1:number}\n}'
  },
  {
    name: '$search',
    value: '$search',
    label: '$search',
    score: 1,
    env: [ ATLAS ],
    meta: 'stage',
    version: '4.1.11',
    apiVersions: [],
    description: 'Performs a full-text search on the specified field(s).',
    comment: '/** \n * index: the name of the Search index.\n * text: Analyzed search, with required fields of query and path, the analyzed field(s) to search.\n * term: Un-analyzed search.\n * compound: Combines ops.\n * span: Find in text field regions.\n * exists: Test for presence of a field.\n * near: Find near number or date.\n * range: Find in numeric or date range.\n */\n',
    snippet: '{\n  index: \'${1:string}\',\n  text: {\n    query: \'${2:string}\',\n    path: \'${3:string}\'\n  }\n}'
  },
  {
    name: '$set',
    value: '$set',
    label: '$set',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '4.2.0',
    apiVersions: [1],
    description: 'Adds new fields to documents. $set outputs documents that contain all existing fields from the input documents and newly added fields.',
    comment: '/**\n * field: The field name\n * expression: The expression.\n */\n',
    snippet: '{\n  ${1:field}: ${2:expression}\n}'
  },
  {
    name: '$skip',
    value: '$skip',
    label: '$skip',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.2.0',
    apiVersions: [1],
    description: 'Skips a specified number of documents before advancing to the next stage.',
    comment: '/**\n * Provide the number of documents to skip.\n */\n',
    snippet: '${1:number}'
  },
  {
    name: '$sort',
    value: '$sort',
    label: '$sort',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.2.0',
    apiVersions: [1],
    description: 'Reorders the document stream by a specified sort key and direction.',
    comment: '/**\n * Provide any number of field/order pairs.\n */\n',
    snippet: '{\n  ${1:field1}: ${2:sortOrder}\n}'
  },
  {
    name: '$sortByCount',
    value: '$sortByCount',
    label: '$sortByCount',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '3.4.0',
    apiVersions: [1],
    description: 'Groups incoming documents based on the value of a specified expression, then computes the count of documents in each distinct group.',
    comment: '/**\n * expression: Grouping expression or string.\n */\n',
    snippet: '{\n  ${1:expression}\n}'
  },
  {
    name: '$unionWith',
    value: '$unionWith',
    label: '$unionWith',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '4.4.0',
    apiVersions: [1],
    description: 'Perform a union with a pipeline on another collection.',
    comment: '/**\n * coll: The collection name.\n * pipeline: The pipeline on the other collection.\n */\n',
    snippet: '{\n  coll: \'${1:coll}\',\n  pipeline: [${2:pipeline}]\n}'
  },
  {
    name: '$unset',
    value: '$unset',
    label: '$unset',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '4.2.0',
    apiVersions: [1],
    description: 'Excludes fields from the result document.',
    comment: '/**\n * fields: The field name(s).\n */\n',
    snippet: '{\n  ${1:field}\n}'
  },
  {
    name: '$unwind',
    value: '$unwind',
    label: '$unwind',
    score: 1,
    env: [ ATLAS, ADL, ON_PREM ],
    meta: 'stage',
    version: '2.2.0',
    apiVersions: [1],
    description: 'Outputs a new document for each element in a specified array. ',
    comment: '/**\n * path: Path to the array field.\n * includeArrayIndex: Optional name for index.\n * preserveNullAndEmptyArrays: Optional\n *   toggle to unwind null and empty values.\n */\n',
    snippet: '{\n  path: ${1:path},\n' +
    '  includeArrayIndex: \'${2:string}\',\n' +
    '  preserveNullAndEmptyArrays: ${3:boolean}\n}'
  }
];

/**
 * The list of stage operator names.
 */
const STAGE_OPERATOR_NAMES = STAGE_OPERATORS.map(op => op.name);

module.exports = STAGE_OPERATORS;
module.exports.STAGE_OPERATOR_NAMES = STAGE_OPERATOR_NAMES;
