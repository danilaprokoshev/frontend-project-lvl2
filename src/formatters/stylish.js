import _ from 'lodash';

const printObject = (object, depth) => {
  const iter = (innerObject, innerDepth) => {
    const entries = Object.entries(innerObject);
    const result = entries.map((entry) => {
      const [key, value] = entry;
      if (_.isPlainObject(value)) {
        return `${'  '.repeat(innerDepth + 2)}${key}: {\n${iter(value, innerDepth + 2)}\n${'  '.repeat(innerDepth + 2)}}`;
      }

      return `${'  '.repeat(innerDepth + 2)}${key}: ${value}`;
    });

    return result.join('\n');
  };

  return `{\n${iter(object, depth)}\n${'  '.repeat(depth)}}`;
};

const stylish = (diffTree) => {
  const iter = (tree, depth) => {
    const result = tree.map((el) => {
      if (!_.has(el, 'children')) {
        switch (el.type) {
          case 'added':
            return `${'  '.repeat(depth)}+ ${el.key}: ${(_.isPlainObject(el.value)) ? printObject(el.value, depth + 1) : el.value}`;
          case 'deleted':
            return `${'  '.repeat(depth)}- ${el.key}: ${(_.isPlainObject(el.value)) ? printObject(el.value, depth + 1) : el.value}`;
          case 'changed':
            return `${'  '.repeat(depth)}- ${el.key}: ${(_.isPlainObject(el.previousValue)) ? printObject(el.previousValue, depth + 1) : el.previousValue}\n${'  '.repeat(depth)}+ ${el.key}: ${(_.isPlainObject(el.value)) ? printObject(el.value, depth + 1) : el.value}`;
          case 'unchanged':
            return `${'  '.repeat(depth)}  ${el.key}: ${el.value}`;
          default:
        }
      }

      return `${'  '.repeat(depth + 1)}${el.key}: {\n${iter(el.children, depth + 2)}\n${'  '.repeat(depth + 1)}}`;
    });

    return result.join('\n');
  };

  return `{\n${iter(diffTree, 1)}\n}`;
};

export default stylish;
