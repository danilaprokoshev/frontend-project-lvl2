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
  const iter = (tree, path) => tree.reduce((acc, el) => {
    if (!_.has(el, 'children')) {
      switch (el.status) {
        case 'added':
          return acc.concat('Property ', `'${path.join('')}${el.key}'`, ' was added with value: ', printValue(el.value), '\n');
        case 'deleted':
          return acc.concat('Property ', `'${path.join('')}${el.key}'`, ' was removed', '\n');
        case 'changed':
          return acc.concat('Property ', `'${path.join('')}${el.key}'`, ' was updated. From ', printValue(el.previousValue), ' to ', printValue(el.value), '\n');
        default:
          return acc;
      }
    }

    return acc.concat(iter(el.children, path.concat(`${el.key}.`)));
  }, '');

  return iter(diffTree, []).trim();
};

export default plain;
