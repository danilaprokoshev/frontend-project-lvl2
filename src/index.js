import parse from './parsers.js';
import format from '../formatters/index.js';
import buildDiff from './builddiff.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  // TODO: реализовать проверку на пустые файлы и соответствующий возврат
  if (Object.keys(obj1).length === 0 && Object.keys(obj2).length === 0) {
    return 'no differences';
  }

  const diff = buildDiff(obj1, obj2);

  return format(diff, formatName);
};
