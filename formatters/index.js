import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, formatName) => {
  let format;
  if (formatName === 'stylish') {
    format = stylish;
  } else if (formatName === 'plain') {
    format = plain;
  } else throw new Error('Unknown format style');

  return format(diff);
};
