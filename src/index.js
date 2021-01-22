import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildDiff from './builddiff.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = path.resolve(filepath1);
  const absolutePath2 = path.resolve(filepath2);
  const dataType1 = path.extname(absolutePath1).slice(1);
  const data1 = fs.readFileSync(absolutePath1, 'utf-8');

  const dataType2 = path.extname(absolutePath2).slice(1);
  const data2 = fs.readFileSync(absolutePath2, 'utf-8');

  const obj1 = parse(data1, dataType1);
  const obj2 = parse(data2, dataType2);

  const diff = buildDiff(obj1, obj2);

  return format(diff, formatName);
};
