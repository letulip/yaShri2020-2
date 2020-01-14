import {assert} from 'chai';

import {warningTest, createErrorObject} from '../linter';

const warningJson = `{
  "block": "warning",
  "content": [
      {
          "block": "placeholder",
          "mods": {
            "size": "m"
          }
      },
      {
          "elem": "content",
          "content": [
              {
                  "block": "text",
                  "mods": {
                    "size": "m"
                  }
              },
              {
                  "block": "text",
                  "mods": {
                    "size": "l"
                  }
              }
          ]
      }
  ]
}`;

const warningResult = [
  {
      "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
      "error": "Тексты в блоке warning должны быть одного размера",
      "location": {
          "start": { "column": 1, "line": 1 },
          "end": { "column": 2, "line": 22 }
      }
  }
];

describe(`Check warning.json test`, () => {
  it(`should return equal warning test result`, () => {
    assert.deepEqual(warningTest(warningJson), warningResult);
  });
});

describe(`Check error object creation`, () => {
  it(`should return propper error object`, () => {
    assert.isObject(createErrorObject());
  });
});
