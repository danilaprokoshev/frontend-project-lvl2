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
      if (node.type === 'unchanged') {
        return null;
      }
      if (node.type === 'nest') {
        return `${iter(node.children, path.concat(node.key, '.'))}`;
      }
      if (node.type === 'added') {
        return `Property '${path.join('')}${node.key}' was added with value: ${printValue(node.value)}`;
      }
      return (node.type === 'deleted')
        ? `Property '${path.join('')}${node.key}' was removed`
        : `Property '${path.join('')}${node.key}' was updated. From ${printValue(node.previousValue)} to ${printValue(node.value)}`;
    })
    .filter((n) => n)
    .join('\n');

  return iter(diff, []).trim();
};

export default plain;
