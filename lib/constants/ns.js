/**
 * Constants for various types of namespaces for stage operators.
 */
const DATABASE = 'db';
const COLLECTION = 'coll';
const VIEW = 'view';
const TIME_SERIES = 'timeseries';

const ANY_COLLECTION_NAMESPACE = [
  COLLECTION,
  VIEW,
  TIME_SERIES,
];

const ANY_NAMESPACE = [
  DATABASE,
  ...ANY_COLLECTION_NAMESPACE
];

module.exports = {
  DATABASE,
  COLLECTION,
  VIEW,
  TIME_SERIES,
  ANY_COLLECTION_NAMESPACE,
  ANY_NAMESPACE,
};
