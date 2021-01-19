import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(`Unknown format style: '${formatName}'!`);
  }
};
