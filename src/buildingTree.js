import _ from 'lodash';

const buildingTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  return _.union(keys1, keys2)
    .sort()
    .map((currentKey) => {
      if (!_.has(data1, currentKey)) {
        return { key: currentKey, value: data2[currentKey], type: 'added' };
      }
      if (!_.has(data2, currentKey)) {
        return { key: currentKey, value: data1[currentKey], type: 'removed' };
      }
      if (_.isObject(data1[currentKey]) && _.isObject(data2[currentKey])) {
        return { key: currentKey, children: buildingTree(data1[currentKey], data2[currentKey]), type: 'nested' };
      }
      if (data1[currentKey] !== data2[currentKey]) {
        return {
          key: currentKey, oldValue: data1[currentKey], newValue: data2[currentKey], type: 'changed',
        };
      }
      return { key: currentKey, value: data1[currentKey], type: 'unchanged' };
    });
};

export default buildingTree;
