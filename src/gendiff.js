import _ from 'lodash';

const genDiff = (data1, data2) => {
  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);

  const result = {};
  for (const key of keys) {
    if (!_.has(obj1, key)) {
      result[key] = 'added';
    } else if (!_.has(obj2, key)) {
      result[key] = 'deleted';
    } else if (obj1[key] !== obj2[key]) {
      result[key] = 'changed';
    } else {
      result[key] = 'unchanged';
    }
  }

  const keysOfResult = _.keys(result);
  keysOfResult.sort();
  let stringifiedResult = '';
  for (const key of keysOfResult) {
    if (result[key] === 'added') {
      stringifiedResult = `${stringifiedResult}\n  + ${key}: ${obj2[key]}`;
    }
    if (result[key] === 'deleted') {
      stringifiedResult = `${stringifiedResult}\n  - ${key}: ${obj1[key]}`;
    }
    if (result[key] === 'changed') {
      stringifiedResult = `${stringifiedResult}\n  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    if (result[key] === 'unchanged') {
      stringifiedResult = `${stringifiedResult}\n    ${key}: ${obj1[key]}`;
    }
  }

  return `{${stringifiedResult}\n}`;
};

export default genDiff;
