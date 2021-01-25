import _ from 'lodash';

const indent = (count) => '  '.repeat(count);

const printObject = (object, depth) => {
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

const printTransposedItem = (key, value, sign, depth) => `${indent(depth)}${sign} ${key}: ${(_.isPlainObject(value)) ? printObject(value, depth + 1) : value}`;

const stylish = (diff) => {
  const iter = (tree, depth) => tree
    .map((node) => {
      if (node.type === 'nest') {
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 2)}\n  ${indent(depth)}}`;
      }
      switch (node.type) {
        case 'added':
          return printTransposedItem(node.key, node.value, '+', depth);
        case 'deleted':
          return printTransposedItem(node.key, node.value, '-', depth);
        case 'changed':
          return printTransposedItem(node.key, node.previousValue, '-', depth).concat('\n', printTransposedItem(node.key, node.value, '+', depth));
        default:
          return `${indent(depth)}  ${node.key}: ${node.value}`;
      }
    })
    .join('\n');

  return `{\n${iter(diff, 1)}\n}`;
};

export default stylish;
