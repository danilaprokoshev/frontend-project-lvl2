import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);

  if (keys.length === 0) {
    return 'no differences';
  }

  const differences = keys
    .sort()
    .reduce((acc, key) => {
      if (!_.has(obj1, key)) {
        return acc.concat('\n', `  + ${key}: ${obj2[key]}`);
      }
      if (!_.has(obj2, key)) {
        return acc.concat('\n', `  - ${key}: ${obj1[key]}`);
      }
      if (obj1[key] !== obj2[key]) {
        return acc.concat('\n', `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`);
      }
      return acc.concat('\n', `    ${key}: ${obj1[key]}`);
    }, '');

  return `{${differences}\n}`;
};

export default genDiff;
