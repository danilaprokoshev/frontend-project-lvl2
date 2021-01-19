import _ from 'lodash';
import parse from './parsers.js';
import format from '../formatters/index.js';

const buildDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = keys.sort();

  return sortedKeys
    .reduce((acc, key) => {
      let temp = acc;
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        const children = buildDiff(obj1[key], obj2[key]);
        temp = _.concat(temp, { key, children });
        return temp;
      }
      if (!_.has(obj1, key)) {
        temp = _.concat(temp, {
          key, value: obj2[key], status: 'added',
        });
      } else if (!_.has(obj2, key)) {
        temp = _.concat(temp, {
          key, value: obj1[key], status: 'deleted',
        });
      } else if (obj1[key] !== obj2[key]) {
        temp = _.concat(temp, {
          key, value: obj2[key], previousValue: obj1[key], status: 'changed',
        });
      } else {
        temp = _.concat(temp, {
          key, value: obj1[key], status: 'unchanged',
        });
      }

      return temp;
    }, []);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  // TODO: реализовать проверку на пустые файлы и соответствующий возврат
  if (Object.keys(obj1).length === 0 && Object.keys(obj2).length === 0) {
    return 'no differences';
  }

  const diff = buildDiff(obj1, obj2);

  return format(diff, formatName);
};

export default genDiff;
