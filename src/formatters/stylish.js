import _ from 'lodash';

const indent = (count) => '  '.repeat(count);

const stringifyObject = (object, depth) => {
  const iter = (innerObject, innerDepth) => {
    const entries = Object.entries(innerObject);
    return entries
      .map((entry) => {
        const [key, value] = entry;
        if (_.isPlainObject(value)) {
          return `${indent(innerDepth)}    ${key}: {\n${iter(value, innerDepth + 2)}\n    ${indent(innerDepth)}}`;
        }

        return `${indent(innerDepth)}    ${key}: ${value}`;
      })
      .join('\n');
  };

  return `{\n${iter(object, depth)}\n${indent(depth)}}`;
};

const stringifyTransposedItem = (key, value, sign, depth) => `${indent(depth)}${sign} ${key}: ${(_.isPlainObject(value)) ? stringifyObject(value, depth + 1) : value}`;

const stylish = (diff) => {
  const iter = (tree, depth) => tree
    .map((node) => {
      if (node.type === 'nest') {
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 2)}\n  ${indent(depth)}}`;
      }
      switch (node.type) {
        case 'added':
          return stringifyTransposedItem(node.key, node.value, '+', depth);
        case 'deleted':
          return stringifyTransposedItem(node.key, node.value, '-', depth);
        case 'changed':
          return stringifyTransposedItem(node.key, node.previousValue, '-', depth).concat('\n', stringifyTransposedItem(node.key, node.value, '+', depth));
        default:
          return `${indent(depth)}  ${node.key}: ${node.value}`;
      }
    })
    .join('\n');

  return `{\n${iter(diff, 1)}\n}`;
};

export default stylish;
