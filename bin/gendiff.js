#!/usr/bin/env node
import pkg from 'commander';
import path from 'path';
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
    const absolutePath1 = path.resolve(filepath1);
    const absolutePath2 = path.resolve(filepath2);
    console.log(genDiff(absolutePath1, absolutePath2, program.format));
  });

program.parse(process.argv);
