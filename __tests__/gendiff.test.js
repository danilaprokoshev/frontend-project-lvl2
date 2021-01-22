import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const jsonBefore = getFixturePath('before.json');
const jsonAfter = getFixturePath('after.json');

const yamlBefore = getFixturePath('before.yml');
const yamlAfter = getFixturePath('after.yml');

const expectedStylish = readFile('result-stylish.txt');
const expectedPlain = readFile('result-plain.txt');
const expectedJson = readFile('result-json-format.json');

describe.each`
before             | after
${jsonBefore}      | ${jsonAfter}
${yamlBefore}      | ${yamlAfter}
${jsonBefore}      | ${yamlAfter}
`('compares $before & $after', ({ before, after }) => {
  test('shows difference in stylish format', () => {
    expect(genDiff(before, after)).toBe(expectedStylish);
  });

  test('shows difference in plain format', () => {
    expect(genDiff(before, after, 'plain')).toBe(expectedPlain);
  });

  test('shows difference in json format', () => {
    expect(genDiff(before, after, 'json')).toBe(expectedJson);
  });

  test('difference \'before & after\' is not the same as \'after & before\' (replacing args)', () => {
    expect(genDiff(before, after)).not.toBe(genDiff(after, before));
  });
});
