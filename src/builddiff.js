import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  return sortedKeys
    .map((key) => {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        const children = buildDiff(obj1[key], obj2[key]);

        return { key, children };
      }
      if (!_.has(obj1, key)) {
        return {
          key, value: obj2[key], status: 'added',
        };
      }
      if (!_.has(obj2, key)) {
        return {
          key, value: obj1[key], status: 'deleted',
        };
      }
      if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        return {
          key, value: obj2[key], previousValue: obj1[key], status: 'changed',
        };
      }

      return {
        key, value: obj1[key], status: 'unchanged',
      };
    });
};

export default buildDiff;
