#!/usr/bin/env node
import pkg from 'commander';
import genDiff from '../src/index.js';

const { Command } = pkg;
const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .allowUnknownOption()
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  });

program.parse(process.argv);
