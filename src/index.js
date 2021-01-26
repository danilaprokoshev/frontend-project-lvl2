import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildDiff from './builddiff.js';

const readFileAndGetType = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const dataType = path.extname(absolutePath).slice(1);

  return [data, dataType];
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const [data1, dataType1] = readFileAndGetType(filepath1);
  const [data2, dataType2] = readFileAndGetType(filepath2);

  const obj1 = parse(data1, dataType1);
  const obj2 = parse(data2, dataType2);

  const diff = buildDiff(obj1, obj2);

  return format(diff, formatName);
};
