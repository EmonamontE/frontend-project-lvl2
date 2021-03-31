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

const oneTwo = readFixture('oneTwo.txt');
const threeFour = readFixture('threeFour.txt');

test('is string', () => {
  const json1 = getFixturePath('one.json');
  const json2 = getFixturePath('two.json');
  const result = gendiff(json1, json2);
  expect(typeof result).toBe('string');
});

test('differences between files', () => {
  const json1 = getFixturePath('one.json');
  const json2 = getFixturePath('two.json');
  const json3 = getFixturePath('three.json');
  const json4 = getFixturePath('four.json');
  const yaml1 = getFixturePath('one.yaml');
  const yaml2 = getFixturePath('two.yaml');
  // const file3 = readFixture('file3.txt');
  expect(gendiff(yaml1, yaml2)).toEqual(oneTwo);
  expect(gendiff(json1, json2)).toEqual(oneTwo);
  expect(gendiff(json3, json4)).toBe(threeFour);
});
