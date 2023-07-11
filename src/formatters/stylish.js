import _ from 'lodash';

const calcIndent = (depth) => {
  const spacesCount = 4;
  const replacer = ' ';
  return replacer.repeat(spacesCount * depth - 2);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const entries = Object.entries(data);
  const result = entries.map(([key, value]) => `${calcIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  const lines = ['{', ...result, `${calcIndent(depth)}  }`].join('\n');
  return lines;
};

const iter = (obj, depth) => {
  const result = obj.map((node) => {
    switch (node.type) {
      case 'added': {
        return `${calcIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'deleted': {
        return `${calcIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'nested': {
        const output = iter(node.children, depth + 1);
        return `${calcIndent(depth)}  ${node.key}: {\n${output.join('\n')}\n${calcIndent(depth)}  }`;
      }
      case 'unchanged': {
        return `${calcIndent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'changed': {
        const output1 = `${calcIndent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
        const output2 = `${calcIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
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
  const out = ['{', ...iter(tree, depth), '}'].join('\n');
  return out;
};

export default formatStylish;
