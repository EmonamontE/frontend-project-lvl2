import _ from 'lodash';

const smallIdent = 2;
const indent = 4;

const buildIndent = (depth) => {
  const indentCount = (depth * indent) + smallIdent;
  return ' '.repeat(indentCount);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const keys = Object.keys(data);

  const result = keys.map((key) => `${buildIndent(depth + 1)}  ${key}: ${stringify(data[key], depth + 1)}`);

  return `{\n${result.join('\n')}\n${' '.repeat((depth + 1) * indent)}}`;
};

const renderStylish = (tree) => {
  const internalTree = (data, depth) => {
    const result = data.map((noda) => {
      switch (noda.type) {
        case 'added':
          return `${buildIndent(depth)}+ ${noda.key}: ${stringify(noda.value, depth)}`;
        case 'removed':
          return `${buildIndent(depth)}- ${noda.key}: ${stringify(noda.value, depth)}`;
        case 'changed': {
          const oldValue = `${buildIndent(depth)}- ${noda.key}: ${stringify(noda.oldValue, depth)}`;
          const newValue = `${buildIndent(depth)}+ ${noda.key}: ${stringify(noda.newValue, depth)}`;
          return `${oldValue}\n${newValue}`;
        }
        case 'unchanged':
          return `${buildIndent(depth)}  ${noda.key}: ${stringify(noda.value, depth)}`;
        case 'nested':
          return `${buildIndent(depth)}  ${noda.key}: ${internalTree(noda.children, depth + 1)}`;
        default:
          throw new Error(`${noda.type} is not defined`);
      }
    });

    return `{\n${result.join('\n')}\n${' '.repeat(depth * indent)}}`;
  };

  return internalTree(tree, 0);
};

export default renderStylish;
