import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const getFormat = (data, output = 'stylish') => {
  switch (output) {
    case 'plain':
      return formatPlain(data);
    case 'json':
      return formatJson(data);
    case 'stylish':
      return formatStylish(data);
    default:
      throw new Error(`${output} format is not supported`);
  }
};
export default getFormat;
