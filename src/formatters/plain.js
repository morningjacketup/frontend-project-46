import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return (_.isString(value) ? `'${value}'` : value);
};

export default (object) => {
  const iter = (tree, path) => tree
    .flatMap((node) => {
      const {
        key, value, type, value1, value2,
      } = node;
      const newAncestry = `${path}${key}`;

      switch (type) {
        case 'added':
          return `Property '${newAncestry}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${newAncestry}' was removed`;
        case 'nested':
          return `${iter(node.children, `${newAncestry}.`)}`;
        case 'unchanged':
          return [];
        case 'changed': {
          return `Property '${newAncestry}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        }
        default:
          throw new Error(`Status ${type} - is invalid`);
      }
    }).join('\n');

  return iter(object, '');
};
