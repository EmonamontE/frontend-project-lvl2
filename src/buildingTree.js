import _ from 'lodash';

const buildingTree = (obj1, obj2) => {
  const keysFromObj1 = Object.keys(obj1);
  const keysFromObj2 = Object.keys(obj2);

  const uniqKeys = _.union(keysFromObj1, keysFromObj2);
  const sortedKeys = _.sortBy(uniqKeys);

  const diff = sortedKeys.map((currentKey) => {
    const value1 = obj1[currentKey];
    const value2 = obj2[currentKey];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key: currentKey,
        type: 'nested',
        children: buildingTree(value1, value2),
      };
    }
    if (!_.has(obj1, currentKey)) {
      return {
        key: currentKey,
        type: 'added',
        value: value2,
      };
    }
    if (!_.has(obj2, currentKey)) {
      return {
        key: currentKey,
        type: 'removed',
        value: value1,
      };
    }
    if (_.isEqual(value1, value2)) {
      return {
        key: currentKey,
        type: 'unchanged',
        value: value1,
      };
    }
    return {
      key: currentKey,
      type: 'changed',
      oldValue: value1,
      newValue: value2,
    };
  });
  return diff;
};

export default buildingTree;
