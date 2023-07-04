import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const jsonPath1 = getFixturePath('file1.json');
const jsonPath2 = getFixturePath('file2.json');
const yamlPath1 = getFixturePath('file1.yml');
const yamlPath2 = getFixturePath('file2.yml');

const JSONData = genDiff(jsonPath1, jsonPath2, 'json');
const JSONDataYML = genDiff(yamlPath1, yamlPath2, 'json');

test('test json to not throw', () => {
  expect(() => (JSON.parse(JSONData)).not.toThrow());
  expect(() => (JSON.parse(JSONDataYML)).not.toThrow());
});

test.each([
  ['file1.json', 'file2.json', 'stylish', 'stylishResult.txt'],
  ['file1.json', 'file2.json', 'plain', 'plainResult.txt'],
  ['file1.json', 'file2.json', 'json', 'jsonResult.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'stylishResult.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'plainResult.txt'],
  ['file1.yml', 'file2.yml', 'json', 'jsonResult.txt'],
])('compare %p %p %p %p', (file1, file2, format, expectedResult) => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), format)).toEqual(readFile(expectedResult));
});
