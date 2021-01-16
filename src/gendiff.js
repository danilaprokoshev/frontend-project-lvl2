import _ from 'lodash';
import parse from './parsers.js';

const buildDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);

  const diffTree = keys
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

  return diffTree;
};

const printObject = (object, depth) => {
  const iter = (innerObject, innerDepth) => {
    const entries = Object.entries(innerObject);
    const result = entries.reduce((acc, entry) => {
      const [key, value] = entry;
      if (_.isPlainObject(value)) {
        return acc.concat('\n', '  '.repeat(innerDepth + 2), `${key}: ${iter(value, innerDepth + 2)}`);
      }

      return acc.concat('\n', '  '.repeat(innerDepth + 2), `${key}: ${value}`);
    }, '');

    return `{${result}\n${'  '.repeat(innerDepth)}}`;
  };

  return iter(object, depth);
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => {
    const result = tree.reduce((acc, el) => {
      if (!_.has(el, 'children')) {
        switch (el.status) {
          case 'added':
            return acc.concat('\n', '  '.repeat(depth + 1), `+ ${el.key}: ${(_.isPlainObject(el.value)) ? printObject(el.value, depth + 2) : el.value}`);
          case 'deleted':
            return acc.concat('\n', '  '.repeat(depth + 1), `- ${el.key}: ${(_.isPlainObject(el.value)) ? printObject(el.value, depth + 2) : el.value}`);
          case 'changed':
            return acc.concat('\n', '  '.repeat(depth + 1), `- ${el.key}: ${(_.isPlainObject(el.previousValue)) ? printObject(el.previousValue, depth + 2) : el.previousValue}\n${'  '.repeat(depth + 1)}+ ${el.key}: ${(_.isPlainObject(el.value)) ? printObject(el.value, depth + 2) : el.value}`);
          case 'unchanged':
            return acc.concat('\n', '  '.repeat(depth + 1), `  ${el.key}: ${el.value}`);
          default:
        }
      }
      return acc.concat('\n', '  '.repeat(depth + 2), `${el.key}: ${iter(el.children, depth + 2)}`);
    }, '');

    return `{${result}\n${'  '.repeat(depth)}}`;
  };

  return iter(diffTree, 0);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  // TODO: реализовать проверку на пустые файлы и соответствующий возврат
  if (Object.keys(obj1).length === 0 && Object.keys(obj2).length === 0) {
    return 'no differences';
  }
  const diffTree = buildDiff(obj1, obj2);

  let result;
  switch (formatter) {
    case 'stylish':
      result = stylish(diffTree);
      break;
    default:
  }

  return result;
};

export default genDiff;
