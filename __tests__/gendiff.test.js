import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('genDiff - general scenario', () => {
  const json1 = readFile('file1.json');
  const json2 = readFile('file2.json');
  const expected = readFile('result-general-scenario.txt');
  expect(genDiff(json1, json2)).toBe(expected);
});

test('genDiff - corner case #1 (empty jsons)', () => {
  const actual = genDiff('{}', '{}');
  expect(actual).toEqual('{}');
});

test('genDiff - corner case #2 (first json is empty)', () => {
  const actual = genDiff('{}', '{ "data": "info", "meta": "env" }');
  const expected = `{
  + data: info
  + meta: env
}`;
  expect(actual).toEqual(expected);
});

test('genDiff - corner case #3 (second json is empty)', () => {
  const actual = genDiff('{ "isLight": true, "brightness": 33 }', '{}');
  const expected = `{
  - brightness: 33
  - isLight: true
}`;
  expect(actual).toEqual(expected);
});
