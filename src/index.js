import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildDiff from './builddiff.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const extName1 = path.extname(filepath1);
  const data1 = fs.readFileSync(filepath1, 'utf-8');

  const extName2 = path.extname(filepath2);
  const data2 = fs.readFileSync(filepath2, 'utf-8');

  const obj1 = parse(data1, extName1);
  const obj2 = parse(data2, extName2);

  // TODO: реализовать проверку на пустые файлы и соответствующий возврат
  if (Object.keys(obj1).length === 0 && Object.keys(obj2).length === 0) {
    return 'no differences';
  }

  const diff = buildDiff(obj1, obj2);

  return format(diff, formatName);
};
