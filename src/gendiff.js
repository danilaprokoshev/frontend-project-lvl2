import _ from 'lodash';
import parse from './parsers.js';
import format from '../formatters/index.js';

const buildDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);

  return keys
    .sort()
    .reduce((acc, key) => {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        const children = buildDiff(obj1[key], obj2[key]);
        acc.push({ key, children });
        return acc;
      }
      if (!_.has(obj1, key)) {
        acc.push({
          key, value: obj2[key], status: 'added',
        });
      } else if (!_.has(obj2, key)) {
        acc.push({
          key, value: obj1[key], status: 'deleted',
        });
      } else if (obj1[key] !== obj2[key]) {
        acc.push({
          key, value: obj2[key], previousValue: obj1[key], status: 'changed',
        });
      } else {
        acc.push({
          key, value: obj1[key], status: 'unchanged',
        });
      }

      return acc;
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
