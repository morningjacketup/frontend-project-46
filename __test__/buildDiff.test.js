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

const stylishResult = readFile('stylishResult.txt');

test('displaying file differences in stylish form', () => {
  expect(genDiff(jsonPath1, jsonPath2)).toBe(stylishResult);
  expect(genDiff(yamlPath1, yamlPath2)).toBe(stylishResult);
});

const plainResult = readFile('plainResult.txt');

test('displaying file differences in plain form', () => {
  expect(genDiff(jsonPath1, jsonPath2, 'plain')).toBe(plainResult);
  expect(genDiff(yamlPath1, yamlPath2, 'plain')).toBe(plainResult);
});

const jsonResult = readFile('jsonResult.txt');

test('displaying file differences in json form', () => {
  expect(genDiff(jsonPath1, jsonPath2, 'json')).toBe(jsonResult);
  expect(genDiff(yamlPath1, yamlPath2, 'json')).toBe(jsonResult);
});
