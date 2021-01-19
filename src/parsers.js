import yaml from 'js-yaml';

const parse = (data, extName) => {
  switch (extName) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error("Unexpected file's extension");
  }
};

export default parse;
