import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'json'],
  ['file1.yml', 'file2.yml', 'json'],
])('compare %p %p %p', (file1, file2, format) => {
  expect(() => genDiff(getFixturePath(file1), getFixturePath(file2), format)).not.toThrow();
});

test.each([
  ['file1.json', 'file2.json', 'stylish', 'stylishResult.txt'],
  ['file1.json', 'file2.json', 'plain', 'plainResult.txt'],
  ['file1.json', 'file2.json', 'json', 'jsonResult.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'stylishResult.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'plainResult.txt'],
  ['file1.yml', 'file2.yml', 'json', 'jsonResult.txt'],
])('compare %p %p %p %p', (file1, file2, format, expectedResult) => {
  const receieved = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile(expectedResult);
  expect(receieved).toEqual(expected);
});
