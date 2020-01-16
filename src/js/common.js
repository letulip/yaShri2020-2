const WARNING_CODE = `WARNING.`;
const TEXT_CODE = `TEXT.`;
const TEXT_BLOCK = `text`;
const HEADING_1_BLOCK = `h1`;
const HEADING_2_BLOCK = `h2`;
const HEADING_3_BLOCK = `h3`;
const BUTTON_BLOCK = `button`;
const PLACEHOLDER_BLOCK = `placeholder`;

const ERROR_CODES = [
  {
    warning: `WARNING.`,
    codes: [
      {
        text_size: `TEXT_SIZES_SHOULD_BE_EQUAL`,
        message: ``
      },
      {
        button_size: `INVALID_BUTTON_SIZE`,
        message: ``
      }
    ]  
  },
  {
    text: `TEXT.`,
    codes: [
      {
        several_h1: `SEVERAL_H1`,
        message: ``
      },
      {
        h2_position: `INVALID_H2_POSITION`,
        message: ``
      }
    ]  
  }
];

const SIZES = [`xs`, `s`, `m`, `l`, `xl`];
const SIZES_PLACEHOLDER = [`s`, `m`, `l`];

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

const findFirstElementIndex = (arr, blockName) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].block === blockName) {
      return i;
    }
  }
  return -1;
};

const findFirstElementModsIndex = (arr, blockName, mod) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].block === blockName && arr[i].mods.type === mod) {
      return i;
    }
  }
  return -1;
};

export {
  SIZES,
  SIZES_PLACEHOLDER,
  createErrorObject,
  findFirstElementIndex,
  findFirstElementModsIndex
};
