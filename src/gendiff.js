import _ from 'lodash';

const genDiff = (data1, data2) => {
  if (data1 === '{}' && data2 === '{}') {
    return '{}';
  }
  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);

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
