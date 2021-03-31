import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf8');

const getData = (filepath) => parse(readFile(filepath), path.extname(filepath).slice(1));

const gendiff = (filepath1, filepath2) => {
  const object1 = getData(filepath1);
  const object2 = getData(filepath2);

  const keys = _.union(Object.keys(object1), Object.keys(object2)).sort();

  const array = keys.map((currentKey) => {
    if (!_.has(object1, currentKey)) {
      return { key: currentKey, value: object2[currentKey], type: 'added' };
    }
    if (!_.has(object2, currentKey)) {
      return { key: currentKey, value: object1[currentKey], type: 'removed' };
    }
    if (object1[currentKey] !== object2[currentKey]) {
      return {
        key: currentKey, oldValue: object1[currentKey], newValue: object2[currentKey], type: 'changed',
      };
    }
    return { key: currentKey, value: object1[currentKey], type: 'unchanged' };
  });

  let result = '{\n';

  array.forEach((element) => {
    if (element.type === 'removed') {
      result += `  - ${element.key}: ${element.value}\n`;
    }

    if (element.type === 'unchanged') {
      result += `    ${element.key}: ${element.value}\n`;
    }

    if (element.type === 'changed') {
      result += `  - ${element.key}: ${element.oldValue}\n`;
      result += `  + ${element.key}: ${element.newValue}\n`;
    }

    if (element.type === 'added') {
      result += `  + ${element.key}: ${element.value}\n`;
    }
  });

  result += '}';

  return result;
};

export default gendiff;
