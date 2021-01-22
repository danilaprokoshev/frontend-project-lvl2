import _ from 'lodash';

const printObject = (object, depth) => {
  const repeat = (counter) => '  '.repeat(counter + 2);
  const iter = (innerObject, innerDepth) => {
    const entries = Object.entries(innerObject);
    return entries
      .map((entry) => {
        const [key, value] = entry;
        if (_.isPlainObject(value)) {
          return `${repeat(innerDepth)}${key}: {\n${iter(value, innerDepth + 2)}\n${repeat(innerDepth)}}`;
        }

        return `${repeat(innerDepth)}${key}: ${value}`;
      })
      .join('\n');
  };

  return `{\n${iter(object, depth)}\n${'  '.repeat(depth)}}`;
};

const stylish = (diff) => {
  const iter = (tree, depth) => tree
    .map((node) => {
      if (node.type !== 'nest') {
        switch (node.type) {
          case 'added':
            return `${'  '.repeat(depth)}+ ${node.key}: ${(_.isPlainObject(node.value)) ? printObject(node.value, depth + 1) : node.value}`;
          case 'deleted':
            return `${'  '.repeat(depth)}- ${node.key}: ${(_.isPlainObject(node.value)) ? printObject(node.value, depth + 1) : node.value}`;
          case 'changed':
            return `${'  '.repeat(depth)}- ${node.key}: ${(_.isPlainObject(node.previousValue)) ? printObject(node.previousValue, depth + 1) : node.previousValue}\n${'  '.repeat(depth)}+ ${node.key}: ${(_.isPlainObject(node.value)) ? printObject(node.value, depth + 1) : node.value}`;
          case 'unchanged':
            return `${'  '.repeat(depth)}  ${node.key}: ${node.value}`;
          default:
        }
      }

      return `${'  '.repeat(depth + 1)}${node.key}: {\n${iter(node.children, depth + 2)}\n${'  '.repeat(depth + 1)}}`;
    })
    .join('\n');

  return `{\n${iter(diff, 1)}\n}`;
};

export default stylish;
