'use strict';

var chai = require('chai');

const WARNING_CODE = `WARNING.`;
const TEXT_BLOCK = `text`;
const BUTTON_BLOCK = `button`;
const PLACEHOLDER_BLOCK = `placeholder`;
const TEXT_SIZE_CODE = `TEXT_SIZES_SHOULD_BE_EQUAL`;
const TEXT_SIZE_ERROR = `Тексты в блоке warning должны быть одного размера`;
const BUTTON_SIZE_CODE = `INVALID_BUTTON_SIZE`;
const BUTTON_SIZE_ERROR = `Размер кнопки блока warning должен быть на 1 шаг больше эталонного`;
const BUTTON_POSITION_CODE = `INVALID_BUTTON_POSITION`;
const BUTTON_POSITION_ERROR = `Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности`;
const PLACEHOLDER_SIZE_CODE = `INVALID_PLACEHOLDER_SIZE`;
const PLACEHOLDER_SIZE_ERROR = `Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l`;

const SIZES = [`xs`, `s`, `m`, `l`, `xl`];
const SIZES_PLACEHOLDER = [`s`, `m`, `l`];

const createErrorObject = (errorCode, errorMessage, errorLocationStart, errorLocationEnd) => {
  const error = {
    code: `${errorCode}`,
    error: `${errorMessage}`,
    location: {
      start: {
        column: 1,
        line: 1
      },
      end: {
        column: 2,
        line: 22
      },
    },
  };
  return error;
};

const findFirstElementIndex = (arr, blockName) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].block === blockName) {
      return i;
    }
  }
  return -1;
};

const checkWarningPlaceholderSize = (contentArr) => {
  const placeholderIndex = findFirstElementIndex(contentArr, PLACEHOLDER_BLOCK);

  if (!SIZES_PLACEHOLDER.includes(contentArr[placeholderIndex].mods.size)) {
    return createErrorObject(WARNING_CODE + PLACEHOLDER_SIZE_CODE, PLACEHOLDER_SIZE_ERROR);
  }
};

const checkWarningButtonPosition = (contentArr) => {
  const firstPlaceholderElementIndex = findFirstElementIndex(contentArr, PLACEHOLDER_BLOCK);
  const firstButtonElementIndex = findFirstElementIndex(contentArr, BUTTON_BLOCK);

  if (firstButtonElementIndex < firstPlaceholderElementIndex) {
    return createErrorObject(WARNING_CODE + BUTTON_POSITION_CODE, BUTTON_POSITION_ERROR);
  }
};

const checkWarningButtonSize = (contentArr) => {
  const firstTextElementIndex = findFirstElementIndex(contentArr, TEXT_BLOCK);
  const firstButtonElementIndex = findFirstElementIndex(contentArr, BUTTON_BLOCK);
  const gauge = SIZES[SIZES.indexOf(contentArr[firstTextElementIndex].mods.size) + 1];

  if (contentArr[firstButtonElementIndex].mods.size !== gauge) {
    return createErrorObject(WARNING_CODE + BUTTON_SIZE_CODE, BUTTON_SIZE_ERROR);
  }
};

const checkWarningTextSize = (contentArr) => {
  const firstTextElementIndex = findFirstElementIndex(contentArr, TEXT_BLOCK);
  const gauge = contentArr[firstTextElementIndex].mods.size;

  for (let i = firstTextElementIndex + 1; i < contentArr.length; i++) {
    if (contentArr[i].mods.size !== gauge) {
      return createErrorObject(WARNING_CODE + TEXT_SIZE_CODE, TEXT_SIZE_ERROR);
    }
  }
};

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

// describe(`Check warning.json test`, () => {
//   it(`should return equal warning test result`, () => {
//     assert.deepEqual(warningTest(warningJson), warningResult);
//   });
// });

describe(`Check error object creation`, () => {
  it(`should return propper error object`, () => {
    chai.assert.isObject(createErrorObject());
  });
});

describe(`Check find first element index function`, () => {
  it(`should return proper index of element in array`, () => {
    chai.assert.equal(findFirstElementIndex(warningContent), -1);
    chai.assert.equal(findFirstElementIndex(warningContent, ``), -1);
    chai.assert.equal(findFirstElementIndex(warningContent, `text`), 1);
    chai.assert.equal(findFirstElementIndex(warningContent, `button`), 4);
  });
});

describe(`Check warning text size function`, () => {
  it(`should return propper error object`, () => {
    chai.assert.deepEqual(checkWarningTextSize(warningContent), warningTextError);
  });
});

describe(`Check warning button size function`, () => {
  it(`should return propper error object`, () => {
    chai.assert.deepEqual(checkWarningButtonSize(warningContent), warningButtonSizeError);
  });
});

describe(`Check warning button position function`, () => {
  it(`should return propper error object`, () => {
    chai.assert.deepEqual(checkWarningButtonPosition(warningButtonPositionErrorContent), warningButtonPositionError);
  });
});

describe(`Check warning button position function`, () => {
  it(`should return propper error object`, () => {
    chai.assert.deepEqual(checkWarningPlaceholderSize(warningButtonPositionErrorContent), warningPlaceholderSizeError);
  });
});
