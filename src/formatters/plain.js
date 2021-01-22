import _ from 'lodash';

const printValue = (value) => {
  if (value === null) {
    return 'null';
  }
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const plain = (diffTree) => {
  const iter = (tree, path) => tree.reduce((acc, node) => {
    if (!_.has(node, 'children')) {
      switch (node.type) {
        case 'added':
          return acc.concat('Property ', `'${path.join('')}${node.key}'`, ' was added with value: ', printValue(node.value), '\n');
        case 'deleted':
          return acc.concat('Property ', `'${path.join('')}${node.key}'`, ' was removed', '\n');
        case 'changed':
          return acc.concat('Property ', `'${path.join('')}${node.key}'`, ' was updated. From ', printValue(node.previousValue), ' to ', printValue(node.value), '\n');
        default:
          return acc;
      }
    }

    return acc.concat(iter(node.children, path.concat(node.key, '.')));
  }, '');

  return iter(diffTree, []).trim();
};

export default plain;
