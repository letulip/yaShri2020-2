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

const findFirstElementModsIndex = (arr, blockName, mod) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].block === blockName && arr[i].mods.type === mod) {
      return i;
    }
  }
  return -1;
};

const TEXT_CODE = `TEXT.`;
const TEXT_BLOCK = `text`;
const HEADING_1_BLOCK = `h1`;
const HEADING_2_BLOCK = `h2`;
const HEADING_3_BLOCK = `h3`;

const H1_SEVERAL_CODE = `SEVERAL_H1`;
const H1_SEVERAL_ERROR = `Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным`;
const H2_POSITION_CODE = `INVALID_H2_POSITION`;
const H2_POSITION_ERROR = `Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности`;
const H3_POSITION_CODE = `INVALID_H3_POSITION`;
const H3_POSITION_ERROR = `Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности`;

const findH1 = (value) => {
  if (value.block === TEXT_BLOCK && value.mods.type === HEADING_1_BLOCK) {
    return 1;
  }
};

const checkTextH1Several = (contentArr) => {
  if (contentArr.filter(findH1).length > 1) {
    return createErrorObject(TEXT_CODE + H1_SEVERAL_CODE, H1_SEVERAL_ERROR);
  }
};

const checkTextH2Position = (contentArr) => {
  const firstH1ElementIndex = findFirstElementModsIndex(contentArr, TEXT_BLOCK, HEADING_1_BLOCK);
  const firstH2ElementIndex = findFirstElementModsIndex(contentArr, TEXT_BLOCK, HEADING_2_BLOCK);

  if (firstH1ElementIndex > firstH2ElementIndex) {
    return createErrorObject(TEXT_CODE + H2_POSITION_CODE, H2_POSITION_ERROR);
  }
};

const checkTextH3Position = (contentArr) => {
  const firstH2ElementIndex = findFirstElementModsIndex(contentArr, TEXT_BLOCK, HEADING_2_BLOCK);
  const firstH3ElementIndex = findFirstElementModsIndex(contentArr, TEXT_BLOCK, HEADING_3_BLOCK);

  if (firstH3ElementIndex > firstH2ElementIndex) {
    return createErrorObject(TEXT_CODE + H3_POSITION_CODE, H3_POSITION_ERROR);
  }
};

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
];

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

describe(`Check h1 several function`, () => {
  it(`should return propper error object`, () => {
    chai.assert.deepEqual(checkTextH1Several(textH1SeveralContent), textH1SeveralError);
  });
});

describe(`Check h2 position function`, () => {
  it(`should return propper error object`, () => {
    chai.assert.deepEqual(checkTextH2Position(textH1SeveralContent), textH2PositionError);
  });
});

describe(`Check h3 position function`, () => {
  it(`should return propper error object`, () => {
    chai.assert.deepEqual(checkTextH3Position(textH1SeveralContent), textH3PositonError);
  });
});
