import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parse = (filepath) => {
  const format = path.extname(filepath);
  const data = fs.readFileSync(filepath, 'utf-8');

  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error("Unexpected file's extension");
  }
};

export default parse;
