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

const MARKETING_BLOCKS = [`commercial`, `offer`];

const GRID = `GRID.`;
const TOO_MUCH_MARKETING_CODE = `TOO_MUCH_MARKETING_BLOCKS`;
const TOO_MUCH_MARKETING_ERROR = `Маркетинговые блоки занимают не больше половины от всех колонок блока grid`;

const checkMarketingBlocks = (contentArr, columns) => {
  const gauge = parseInt(columns)/2;
  let colsCount = 0;
  contentArr.forEach((element) => {
    if (MARKETING_BLOCKS.includes(element.content[0].block)) {
      colsCount += parseInt(element.elemMods[`m-col`]);
    }
  });
  
  if (colsCount > gauge) {
    return createErrorObject(GRID + TOO_MUCH_MARKETING_CODE, TOO_MUCH_MARKETING_ERROR);
  }
};

const gridCorrectToCheck = {
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "8"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
};

const gridErrorToCheck = {
    "block": "grid",
    "mods": {
        "m-columns": "10"
    },
    "content": [
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "2"
            },
            "content": [
                {
                    "block": "payment"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "5"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        },
        {
            "block": "grid",
            "elem": "fraction",
            "elemMods": {
                "m-col": "3"
            },
            "content": [
                {
                    "block": "offer"
                }
            ]
        }
    ]
};

const tooMuchMarketingError = {
  "code": "GRID.TOO_MUCH_MARKETING_BLOCKS",
  "error": "Маркетинговые блоки занимают не больше половины от всех колонок блока grid",
  "location": {
      "start": { "column": 1, "line": 1 },
      "end": { "column": 2, "line": 22 }
  }
};

describe(`Check too much marketing function`, () => {
  it(`should return propper error object`, () => {
    chai.assert.deepEqual(checkMarketingBlocks(gridErrorToCheck.content, gridCorrectToCheck.mods["m-columns"]), tooMuchMarketingError);
  });
  it(`should return undefined`, () => {
    chai.assert.equal(checkMarketingBlocks(gridCorrectToCheck.content, gridCorrectToCheck.mods["m-columns"]), undefined);
  });
});
