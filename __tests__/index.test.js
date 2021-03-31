import {
  test,
  expect,
} from '@jest/globals';
// import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('is string', () => {
  const json1 = getFixturePath('one.json');
  const json2 = getFixturePath('two.json');
  const result = gendiff(json1, json2);
  expect(typeof result).toBe('string');
});

test('differences between files', () => {
  const json1 = getFixturePath('one.json');
  const json2 = getFixturePath('two.json');
  const yaml1 = getFixturePath('one.yaml');
  const yaml2 = getFixturePath('two.yaml');
  // const file3 = readFixture('file3.txt');
  const file4 = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(gendiff(json1, json2)).toEqual(file4);
  expect(gendiff(yaml1, yaml2)).toEqual(file4);
});
