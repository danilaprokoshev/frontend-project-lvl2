import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('genDiff - json - general scenario', () => {
  const json1 = getFixturePath('file1.json');
  const json2 = getFixturePath('file2.json');
  const expected = readFile('result-json-general-scenario.txt');
  expect(genDiff(json1, json2)).toBe(expected);
});

test('genDiff - json - corner case #1 (empty files)', () => {
  const json1 = getFixturePath('empty1.json');
  const json2 = getFixturePath('empty2.json');
  expect(genDiff(json1, json2)).toEqual('no differences');
});

test('genDiff - json - corner case #2 (first json is empty)', () => {
  const json1 = getFixturePath('empty1.json');
  const json2 = getFixturePath('file3.json');
  const expected = readFile('result-json-corner-case#2.txt');
  expect(genDiff(json1, json2)).toEqual(expected);
});

test('genDiff - json - corner case #3 (second json is empty)', () => {
  const json1 = getFixturePath('file4.json');
  const json2 = getFixturePath('empty2.json');
  const expected = readFile('result-json-corner-case#3.txt');
  expect(genDiff(json1, json2)).toEqual(expected);
});

test('genDiff - yaml - general scenario', () => {
  const yaml1 = getFixturePath('file1.yml');
  const yaml2 = getFixturePath('file2.yml');
  const expected = readFile('result-yaml-general-scenario.txt');
  expect(genDiff(yaml1, yaml2)).toBe(expected);
});

test('genDiff - json - chaining structure', () => {
  const json1 = getFixturePath('chaining-structure1.json');
  const json2 = getFixturePath('chaining-structure2.json');
  const expected = readFile('result-chaining-structure.txt');
  expect(genDiff(json1, json2)).toBe(expected);
});
