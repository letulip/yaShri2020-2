import {assert} from 'chai';

import {
  warningTest,
  createErrorObject,
  findFirstElementIndex,
  checkWarningTextSize,
  checkWarningButtonSize,
  checkWarningButtonPosition,
  checkWarningPlaceholderSize,
  checkTextH1Several,
  checkTextH2Position,
  checkTextH3Position
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

const warningButtonPositionErrorContent = [
  {
    "block": "button",
    "mods": {
      "size": "m"
    }
  },
  {
    "block": "placeholder",
    "mods": {
        "view": "primary",
        "size": "xl"
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
  }
];

const textH1SeveralContent = [
  {
    "block": "text",
    "mods": {
      "type": "h2"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h1"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h3"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h2"
    }
  },
  {
    "block": "text",
    "mods": {
      "type": "h1"
    }
  },
]

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

const warningButtonPositionError = {
  "code": "WARNING.INVALID_BUTTON_POSITION",
  "error": "Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности",
  "location": {
      "start": { "column": 1, "line": 1 },
      "end": { "column": 2, "line": 22 }
  }
};

const warningPlaceholderSizeError = {
  "code": "WARNING.INVALID_PLACEHOLDER_SIZE",
  "error": "Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l",
  "location": {
      "start": { "column": 1, "line": 1 },
      "end": { "column": 2, "line": 22 }
  }
};

const textH1SeveralError = {
  "code": "TEXT.SEVERAL_H1",
  "error": "Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным",
  "location": {
      "start": { "column": 1, "line": 1 },
      "end": { "column": 2, "line": 22 }
  }
};

const textH2PositionError = {
  "code": "TEXT.INVALID_H2_POSITION",
  "error": "Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности",
  "location": {
      "start": { "column": 1, "line": 1 },
      "end": { "column": 2, "line": 22 }
  }
};

const textH3PositonError = {
  "code": "TEXT.INVALID_H3_POSITION",
  "error": "Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности",
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

describe(`Check warning button position function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkWarningButtonPosition(warningButtonPositionErrorContent), warningButtonPositionError);
  });
});

describe(`Check warning button position function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkWarningPlaceholderSize(warningButtonPositionErrorContent), warningPlaceholderSizeError);
  });
});

describe(`Check h1 several function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkTextH1Several(textH1SeveralContent), textH1SeveralError);
  });
});

describe(`Check h2 position function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkTextH2Position(textH1SeveralContent), textH2PositionError);
  });
});

describe(`Check h3 position function`, () => {
  it(`should return propper error object`, () => {
    assert.deepEqual(checkTextH3Position(textH1SeveralContent), textH3PositonError);
  });
});