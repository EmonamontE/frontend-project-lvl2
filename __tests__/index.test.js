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

const result = readFixture('one.txt');

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
  expect(gendiff(json1, json2)).toEqual(result);
  expect(gendiff(yaml1, yaml2)).toEqual(result);
});
