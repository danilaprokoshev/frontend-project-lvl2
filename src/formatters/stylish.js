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

const stylish = (diff) => {
  const iter = (tree, depth) => tree
    .map((node) => {
      if (node.type === 'nest') {
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 2)}\n  ${indent(depth)}}`;
      }
      if (node.type === 'added') {
        return `${indent(depth)}+ ${node.key}: ${(_.isPlainObject(node.value)) ? printObject(node.value, depth + 1) : node.value}`;
      }
      if (node.type === 'deleted') {
        return `${indent(depth)}- ${node.key}: ${(_.isPlainObject(node.value)) ? printObject(node.value, depth + 1) : node.value}`;
      }
      if (node.type === 'changed') {
        return `${indent(depth)}- ${node.key}: ${(_.isPlainObject(node.previousValue)) ? printObject(node.previousValue, depth + 1) : node.previousValue}\n${indent(depth)}+ ${node.key}: ${(_.isPlainObject(node.value)) ? printObject(node.value, depth + 1) : node.value}`;
      }

      return `${indent(depth)}  ${node.key}: ${node.value}`;
    })
    .join('\n');

  return `{\n${iter(diff, 1)}\n}`;
};

export default stylish;
