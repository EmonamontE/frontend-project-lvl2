import {
  test,
  expect,
} from '@jest/globals';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylish = readFixture('stylish.txt');
const plain = readFixture('plain.txt');

test('is string', () => {
  const json1 = getFixturePath('one.json');
  const json2 = getFixturePath('two.json');
  const result = gendiff(json1, json2);
  expect(typeof result).toBe('string');
});

test.each([
  'json',
  'yaml',
])('differences between files in format: %s', (format) => {
  const filepath1 = getFixturePath(`one.${format}`);
  const filepath2 = getFixturePath(`two.${format}`);
  expect(gendiff(filepath1, filepath2)).toBe(stylish);
  expect(gendiff(filepath1, filepath2, 'plain')).toBe(plain);
  // expect(genDiff(filepath1, filepath2, 'json')).toBe(json);
});
