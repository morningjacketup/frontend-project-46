import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJson from './json.js';

const getFormat = (data, output = 'stylish') => {
  switch (output) {
    case 'plain':
      return formatPlain(data);
    case 'json':
      return formatJson(data);
    default:
      return formatStylish(data);
  }
};
export default getFormat;
