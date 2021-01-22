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

const plain = (diff) => {
  const iter = (tree, path) => tree
    .map((node) => {
      if (node.type !== 'nest') {
        switch (node.type) {
          case 'added':
            return `Property '${path.join('')}${node.key}' was added with value: ${printValue(node.value)}`;
          case 'deleted':
            return `Property '${path.join('')}${node.key}' was removed`;
          case 'changed':
            return `Property '${path.join('')}${node.key}' was updated. From ${printValue(node.previousValue)} to ${printValue(node.value)}`;
          default:
            return null;
        }
      }

      return `${iter(node.children, path.concat(node.key, '.'))}`;
    })
    .filter((n) => n)
    .join('\n');

  return iter(diff, []).trim();
};

export default plain;
