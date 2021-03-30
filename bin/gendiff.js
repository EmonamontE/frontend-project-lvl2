#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();

program
  .version('1.0.0', '-V, --version')
  .description('Compares two configuration files and shows a difference.')
  // .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format [stylish, plain, json]', 'stylish');
/*
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });
*/

program.parse(process.argv);
