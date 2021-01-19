import _ from 'lodash';

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
            return acc.concat('\n',
              '  '.repeat(depth + 1), `- ${el.key}: ${(_.isPlainObject(el.previousValue)) ? printObject(el.previousValue, depth + 2) : el.previousValue}\n`,
              '  '.repeat(depth + 1), `+ ${el.key}: ${(_.isPlainObject(el.value)) ? printObject(el.value, depth + 2) : el.value}`);
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

export default stylish;
