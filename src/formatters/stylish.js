import _ from 'lodash';

const indent = (depth) => {
  if (depth < 1) return '';
  const spacesCount = 4;
  const replacer = ' ';
  return replacer.repeat(spacesCount * depth - 2);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  const lines = ['{', ...result, `${indent(depth)}  }`].join('\n');
  return lines;
};

const iter = (obj, depth) => {
  const result = obj.map((node) => {
    switch (node.type) {
      case 'added': {
        return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'deleted': {
        return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'nested': {
        const output = iter(node.children, depth + 1);
        return `${indent(depth)}  ${node.key}: {\n${output.join('\n')}\n${indent(depth)}  }`;
      }
      case 'unchanged': {
        return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'changed': {
        const output1 = `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`;
        const output2 = `${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`;
        return `${output1}\n${output2}`;
      }
      default: {
        throw new Error(`Unknown type of node: ${node.type}`);
      }
    }
  });
  return result;
};

const formatStylish = (tree, depth = 1) => {
  const out = ['{', ...iter(tree, depth), '}'].flat().join('\n');
  return out;
};

export default formatStylish;
