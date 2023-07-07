import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import getFormat from './formatters/index.js';

const buildPath = (filepath) => path.resolve(process.cwd(filepath), filepath);

const getFileFormat = (filepath) => path.extname(filepath).split('.')[1];

const getData = (filepath) => parse(fs.readFileSync(filepath, 'utf8'), getFileFormat(filepath));

const genDiff = (filepath1, filepath2, format) => {
  const data1 = getData(buildPath(filepath1));
  const data2 = getData(buildPath(filepath2));
  const tree = buildTree(data1, data2);
  return getFormat(tree, format);
};

export default genDiff;
