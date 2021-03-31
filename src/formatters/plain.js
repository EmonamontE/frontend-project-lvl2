import _ from 'lodash';

const stringify = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (_.isString(val)) {
    return `'${val}'`;
  }
  return val;
};

const renderPlain = (tree) => {
  const internalTree = (data, ancestry = '') => {
    const filtredTree = data.filter((item) => item.type !== 'unchanged');
    const result = filtredTree.map((item) => {
      const property = ancestry ? `${ancestry}.${item.key}` : item.key;
      const newValue = stringify(item.value);
      switch (item.type) {
        case 'added':
          return `Property '${property}' was added with value: ${newValue}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'changed':
          return `Property '${property}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
        case 'nested':
          return internalTree(item.children, property);
        default:
          throw new Error(`${item.type} is not defined`);
      }
    });

    return result.join('\n');
  };

  return internalTree(tree);
};

export default renderPlain;
