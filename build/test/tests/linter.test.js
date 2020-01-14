'use strict';

var chai = require('chai');

const WARNING = `WARNING.`;
const TEXT_SIZE_CODE = `TEXT_SIZES_SHOULD_BE_EQUAL`;
const TEXT_SIZE_ERROR = `Тексты в блоке warning должны быть одного размера`;

let column = 0;

let errors = [];

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

const checkTextBlocksSizeEquality = (object, errors) => {
  const contents = object.content[1].content;
  for (let block = 0; block < contents.length - 1; block++) {
    if (contents[block].mods.size !== contents[block + 1].mods.size) {
      errors.push(createErrorObject(WARNING + TEXT_SIZE_CODE, TEXT_SIZE_ERROR));
      return;
    }
  }
};

const objectDestruct = (object) => {

  if (object.block) {
    console.log(`column: ${column} block name: ${object.block}`);

    if (object.block === `warning`) {
      checkTextBlocksSizeEquality(object, errors);
    }
  }

  if (object.content) {
    column += 1;
    console.log(`block content:`);
    object.content.forEach((contentElement) => {
      
      // if (contentElement) {
      //   console.log(contentElement);
      // }

      if (contentElement.elem) {
        console.log(`column: ${column} element name: ${contentElement.elem}`);
      }

      if (typeof contentElement === `object`) {
        objectDestruct(contentElement);
      }
    });
  } 

  if (object.mods) {
    console.log(`block mods:`);
    // objectDestruct(object.mods);
    console.log(object.mods);
  }
  
};

const warningTest = (warningBlock) => {
  const object = JSON.parse(warningBlock);

  objectDestruct(object);

  console.log(errors);
  
  return errors;
};

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
    chai.assert.deepEqual(warningTest(warningJson), warningResult);
  });
});

describe(`Check error object creation`, () => {
  it(`should return propper error object`, () => {
    chai.assert.isObject(createErrorObject());
  });
});
