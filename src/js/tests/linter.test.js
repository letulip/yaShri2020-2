import {assert} from 'chai';

import {
  warningTest,
  createErrorObject,
  findFirstElementIndex,
  checkWarningTextSize,
  checkWarningButtonSize
} from '../linter';

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

const warningContent = [
  {
    "block": "placeholder",
    "mods": {
        "view": "primary",
        "size": "m"
    }
  },
  {
    "block": "text",
    "mods": {
      "size": "m"
    }
  },
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
  },
  {
    "block": "button",
    "mods": {
      "size": "m"
    }
  }
];

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

const warningTextError = {
      "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
      "error": "Тексты в блоке warning должны быть одного размера",
      "location": {
          "start": { "column": 1, "line": 1 },
          "end": { "column": 2, "line": 22 }
      }
  };

const warningButtonSizeError = {
    "code": "WARNING.INVALID_BUTTON_SIZE",
    "error": "Размер кнопки блока warning должен быть на 1 шаг больше эталонного",
    "location": {
        "start": { "column": 1, "line": 1 },
        "end": { "column": 2, "line": 22 }
    }
};

// describe(`Check warning.json test`, () => {
//   it(`should return equal warning test result`, () => {
//     assert.deepEqual(warningTest(warningJson), warningResult);
//   });
// });

describe(`Check error object creation`, () => {
  it(`should return propper error object`, () => {
    assert.isObject(createErrorObject());
  });
});

describe(`Check find first element index function`, () => {
  it(`should return proper index of element in array`, () => {
    assert.equal(findFirstElementIndex(warningContent), -1);
    assert.equal(findFirstElementIndex(warningContent, ``), -1);
    assert.equal(findFirstElementIndex(warningContent, `text`), 1);
    assert.equal(findFirstElementIndex(warningContent, `button`), 4);
  });
});

describe(`Check warning text size function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkWarningTextSize(warningContent), warningTextError);
  });
});

describe(`Check warning button size function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkWarningButtonSize(warningContent), warningButtonSizeError);
  });
});