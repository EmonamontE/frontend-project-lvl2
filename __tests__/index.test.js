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

test('is string', () => {
  const file1 = readFixture('file1.json');
  const file2 = readFixture('file2.json');
  const result = gendiff(file1, file2);
  expect(typeof result).toBe('string');
});

test('differences between files', () => {
  const file1 = readFixture('file1.json');
  const file2 = readFixture('file2.json');
  const file3 = readFixture('file3.txt');
  expect(gendiff(file1, file2)).toBe(file3);
});
