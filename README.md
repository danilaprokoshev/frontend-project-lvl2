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
[{"key":"common","type":"nest","children":[{"key":"follow","value":false,"type":"added"},{"key":"setting1","value":"Value 1","type":"unchanged"},{"key":"setting2","value":200,"type":"deleted"},{"key":"setting3","value":null,"previousValue":true,"type":"changed"},{"key":"setting4","value":"blah blah","type":"added"},{"key":"setting5","value":{"key5":"value5"},"type":"added"},{"key":"setting6","type":"nest","children":[{"key":"doge","type":"nest","children":[{"key":"wow","value":"so much","previousValue":"","type":"changed"}]},{"key":"key","value":"value","type":"unchanged"},{"key":"ops","value":"vops","type":"added"}]}]},{"key":"group1","type":"nest","children":[{"key":"baz","value":"bars","previousValue":"bas","type":"changed"},{"key":"foo","value":"bar","type":"unchanged"},{"key":"nest","value":"str","previousValue":{"key":"value"},"type":"changed"}]},{"key":"group2","value":{"abc":12345,"deep":{"id":45}},"type":"deleted"},{"key":"group3","value":{"fee":100500,"deep":{"id":{"number":45}}},"type":"added"}]
```

## Installation

1. Clone the repository or download ZIP.
2. In the root directory: ```$ make install```.
3. To install the package in your OS: ```$ npm link``` from the root directory.

**Example of using package**
<script id="asciicast-6sl0K1bc3URBYzV2UXPInLXJ0" src="https://asciinema.org/a/6sl0K1bc3URBYzV2UXPInLXJ0.js" async></script>
