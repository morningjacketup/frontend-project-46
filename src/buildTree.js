import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: buildTree(data1[key], data2[key]) };
    }

    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }

    return { key, type: 'unchanged', value: data1[key] };
  });
  return result;
};

export default buildTree;