import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy((_.union(_.keys(obj1), _.keys(obj2))));

  return keys
    .map((key) => {
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        const children = buildDiff(obj1[key], obj2[key]);
        return { key, type: 'nest', children };
      }
      if (!_.has(obj1, key)) {
        return {
          key, value: obj2[key], type: 'added',
        };
      }
      if (!_.has(obj2, key)) {
        return {
          key, value: obj1[key], type: 'deleted',
        };
      }
      if (_.isEqual(obj1[key], obj2[key])) {
        return {
          key, value: obj1[key], type: 'unchanged',
        };
      }

      return {
        key, value: obj2[key], previousValue: obj1[key], type: 'changed',
      };
    });
};

export default buildDiff;
