#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import gendiff, { getData } from '../index.js';

const program = new Command();

program
  .version('1.0.0', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format [stylish, plain, json]', 'stylish')
  .action((filepath1, filepath2) => {
    const data1 = getData(filepath1);
    const data2 = getData(filepath2);
    console.log(gendiff(data1, data2));
  });

program.parse(process.argv);
