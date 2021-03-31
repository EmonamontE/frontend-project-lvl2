import fs from 'fs';
import path from 'path';
import buildingTree from './buildingTree.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf8');

const getData = (filepath) => parse(readFile(filepath), path.extname(filepath).slice(1));

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = getData(filepath1);
  const object2 = getData(filepath2);

  const tree = buildingTree(object1, object2);
  const result = format(tree, formatName);

  return result;
};

export default gendiff;
