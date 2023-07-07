import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return (_.isString(value) ? `'${value}'` : String(value));
};

const iter = (tree, basePath) => {
  const output = tree.map((node) => {
    const currentPath = [...basePath, node.key];
    const property = currentPath.join('.');

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${stringify(
          node.value,
        )}`;
      case 'deleted':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${stringify(
          node.value1,
        )} to ${stringify(node.value2)}`;
      case 'nested':
        return iter(node.children, currentPath);
      case 'unchanged':
        return null;
      default:
        throw new Error('This state is not supported.');
    }
  })
    .filter((item) => item !== null)
    .join('\n');

  return output;
};

const format = (tree) => iter(tree, []);

export default format;
