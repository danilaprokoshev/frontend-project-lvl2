#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const absolutePath1 = path.resolve(filepath1);
    const absolutePath2 = path.resolve(filepath2);
    console.log(genDiff(absolutePath1, absolutePath2));
  });

program.parse(process.argv);
