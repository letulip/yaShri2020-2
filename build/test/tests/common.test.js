'use strict';

var chai = require('chai');

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

const testContent = [
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

describe(`Check error object creation`, () => {
  it(`should return propper error object`, () => {
    chai.assert.isObject(createErrorObject());
  });
});

describe(`Check find first element index function`, () => {
  it(`should return proper index of element in array`, () => {
    chai.assert.equal(findFirstElementIndex(testContent), -1);
    chai.assert.equal(findFirstElementIndex(testContent, ``), -1);
    chai.assert.equal(findFirstElementIndex(testContent, `text`), 1);
    chai.assert.equal(findFirstElementIndex(testContent, `button`), 4);
  });
});
