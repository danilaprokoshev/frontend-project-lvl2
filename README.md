# Difference Generator
## Hexlet tests and linter status:
[![Actions Status](https://github.com/danilaprokoshev/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/danilaprokoshev/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/c1d813008c3b81d0f134/maintainability)](https://codeclimate.com/github/danilaprokoshev/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c1d813008c3b81d0f134/test_coverage)](https://codeclimate.com/github/danilaprokoshev/frontend-project-lvl2/test_coverage)

## About

Difference Generator is my educational project that I performed during the studying on [hexlet.io](https://ru.hexlet.io/professions) (project level 2).

Difference Generator is CLI application that determines the differences between two data structures.

**Options**:
* Capable with different files: `.yaml`, `.json`.
* Representing reports as _plain text_, _stylish_ and _json_.

**Examples**
* Report as _plain text_:
```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```
* Report in _stylish_:
```
{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```
* Report in _json_:
```
[{"key":"common","children":[{"key":"follow","value":false,"status":"added"},{"key":"setting1","value":"Value 1","status":"unchanged"},{"key":"setting2","value":200,"status":"deleted"},{"key":"setting3","value":null,"previousValue":true,"status":"changed"},{"key":"setting4","value":"blah blah","status":"added"},{"key":"setting5","value":{"key5":"value5"},"status":"added"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","value":"so much","previousValue":"","status":"changed"}]},{"key":"key","value":"value","status":"unchanged"},{"key":"ops","value":"vops","status":"added"}]}]},{"key":"group1","children":[{"key":"baz","value":"bars","previousValue":"bas","status":"changed"},{"key":"foo","value":"bar","status":"unchanged"},{"key":"nest","value":"str","previousValue":{"key":"value"},"status":"changed"}]},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"deleted"},{"key":"group3","value":{"fee":100500,"deep":{"id":{"number":45}}},"status":"added"}]
```

## Installation

1. Clone the repository or download ZIP.
2. In the root directory: ```$ make install```.
3. To install the package in your OS: ```$ npm link``` from the root directory.

#### Example of using package (on project step#3)
[![asciicast](https://asciinema.org/a/lnG4ZhpGgTZellhDpxFuoQZgu.svg)](https://asciinema.org/a/lnG4ZhpGgTZellhDpxFuoQZgu)

#### Example of using package (on project step#5)
[![asciicast](https://asciinema.org/a/o6c78yhJgCzNTkta8fmt0dRUC.svg)](https://asciinema.org/a/o6c78yhJgCzNTkta8fmt0dRUC)

#### Example of using package (on project step#6)
[![asciicast](https://asciinema.org/a/6rF7VBXTWIT1DF1urrhUMTaoz.svg)](https://asciinema.org/a/6rF7VBXTWIT1DF1urrhUMTaoz)

#### Example of using package (on project step#7)
[![asciicast](https://asciinema.org/a/auhoGKw7JeXK02XzMtFAsuy9T.svg)](https://asciinema.org/a/auhoGKw7JeXK02XzMtFAsuy9T)

#### Example of using package (on project step#8)
[![asciicast](https://asciinema.org/a/D5MPwlI8lIZ6J9EUTrA2cI6Wn.svg)](https://asciinema.org/a/D5MPwlI8lIZ6J9EUTrA2cI6Wn)
