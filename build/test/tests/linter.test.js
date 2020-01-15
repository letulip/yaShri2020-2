'use strict';

var chai = require('chai');

const WARNING_CODE = `WARNING.`;
const TEXT_BLOCK = `text`;
const TEXT_SIZE_CODE = `TEXT_SIZES_SHOULD_BE_EQUAL`;
const TEXT_SIZE_ERROR = `Тексты в блоке warning должны быть одного размера`;

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

const checkWarningTextSize = (contentArr) => {
  const firstTextElementIndex = findFirstElementIndex(contentArr, TEXT_BLOCK);
  const gauge = contentArr[firstTextElementIndex].mods.size;
  console.log(gauge);
  

  for (let i = firstTextElementIndex + 1; i < contentArr.length; i++) {
    if (contentArr[i].mods.size !== gauge) {
      console.log(contentArr[i], contentArr[i].mods.size);
      
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


const warningTextError = {
      "code": "WARNING.TEXT_SIZES_SHOULD_BE_EQUAL",
      "error": "Тексты в блоке warning должны быть одного размера",
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
