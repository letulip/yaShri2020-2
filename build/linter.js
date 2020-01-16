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

const TEXT_SIZE_CODE = `TEXT_SIZES_SHOULD_BE_EQUAL`;
const TEXT_SIZE_ERROR = `Тексты в блоке warning должны быть одного размера`;
const BUTTON_SIZE_CODE = `INVALID_BUTTON_SIZE`;
const BUTTON_SIZE_ERROR = `Размер кнопки блока warning должен быть на 1 шаг больше эталонного`;
const BUTTON_POSITION_CODE = `INVALID_BUTTON_POSITION`;
const BUTTON_POSITION_ERROR = `Блок button в блоке warning не может находиться перед блоком placeholder на том же или более глубоком уровне вложенности`;
const PLACEHOLDER_SIZE_CODE = `INVALID_PLACEHOLDER_SIZE`;
const PLACEHOLDER_SIZE_ERROR = `Допустимые размеры для блока placeholder в блоке warning (значение модификатора size): s, m, l`;
const H1_SEVERAL_CODE = `SEVERAL_H1`;
const H1_SEVERAL_ERROR = `Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным`;
const H2_POSITION_CODE = `INVALID_H2_POSITION`;
const H2_POSITION_ERROR = `Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности`;
const H3_POSITION_CODE = `INVALID_H3_POSITION`;
const H3_POSITION_ERROR = `Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности`;

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

// const checkWarningPlaceholderSize = (contentArr) => {
//   const placeholderIndex = findFirstElementIndex(contentArr, PLACEHOLDER_BLOCK);

//   if (!SIZES_PLACEHOLDER.includes(contentArr[placeholderIndex].mods.size)) {
//     return createErrorObject(WARNING_CODE + PLACEHOLDER_SIZE_CODE, PLACEHOLDER_SIZE_ERROR);
//   }
// };

// const checkWarningButtonPosition = (contentArr) => {
//   const firstPlaceholderElementIndex = findFirstElementIndex(contentArr, PLACEHOLDER_BLOCK);
//   const firstButtonElementIndex = findFirstElementIndex(contentArr, BUTTON_BLOCK);

//   if (firstButtonElementIndex < firstPlaceholderElementIndex) {
//     return createErrorObject(WARNING_CODE + BUTTON_POSITION_CODE, BUTTON_POSITION_ERROR);
//   }
// };

// const checkWarningButtonSize = (contentArr) => {
//   const firstTextElementIndex = findFirstElementIndex(contentArr, TEXT_BLOCK);
//   const firstButtonElementIndex = findFirstElementIndex(contentArr, BUTTON_BLOCK);
//   const gauge = SIZES[SIZES.indexOf(contentArr[firstTextElementIndex].mods.size) + 1];

//   if (contentArr[firstButtonElementIndex].mods.size !== gauge) {
//     return createErrorObject(WARNING_CODE + BUTTON_SIZE_CODE, BUTTON_SIZE_ERROR);
//   }
// };

// const checkWarningTextSize = (contentArr) => {
//   const firstTextElementIndex = findFirstElementIndex(contentArr, TEXT_BLOCK);
//   const gauge = contentArr[firstTextElementIndex].mods.size;

//   for (let i = firstTextElementIndex + 1; i < contentArr.length; i++) {
//     if (contentArr[i].mods.size !== gauge) {
//       return createErrorObject(WARNING_CODE + TEXT_SIZE_CODE, TEXT_SIZE_ERROR);
//     }
//   }
// };

const findFirstElementModsIndex = (arr, blockName, mod) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].block === blockName && arr[i].mods.type === mod) {
      return i;
    }
  }
  return -1;
};

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

const warningTest = (warningBlock) => {
  const warningObject = JSON.parse(warningBlock);

  // console.log(errors);
  
  return errors;
};

export {
  SIZES,
  SIZES_PLACEHOLDER,
  warningTest,
  createErrorObject,
  findFirstElementIndex,
  checkTextH1Several,
  checkTextH2Position,
  checkTextH3Position
};

import {
  createErrorObject
} from './common';

const TEXT_CODE = `TEXT.`;
const TEXT_BLOCK = `text`;
const HEADING_1_BLOCK = `h1`;
const HEADING_2_BLOCK = `h2`;
const HEADING_3_BLOCK = `h3`;

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

const H1_SEVERAL_CODE = `SEVERAL_H1`;
const H1_SEVERAL_ERROR = `Заголовок первого уровня (блок text с модификатором type h1) на странице должен быть единственным`;
const H2_POSITION_CODE = `INVALID_H2_POSITION`;
const H2_POSITION_ERROR = `Заголовок второго уровня (блок text с модификатором type h2) не может находиться перед заголовком первого уровня на том же или более глубоком уровне вложенности`;
const H3_POSITION_CODE = `INVALID_H3_POSITION`;
const H3_POSITION_ERROR = `Заголовок третьего уровня (блок text с модификатором type h3) не может находиться перед заголовком второго уровня на том же или более глубоком уровне вложенности`;

let column = 0;

let errors = [];

const findFirstElementModsIndex = (arr, blockName, mod) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].block === blockName && arr[i].mods.type === mod) {
      return i;
    }
  }
  return -1;
};

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

export {
  checkTextH1Several,
  checkTextH2Position,
  checkTextH3Position
};

import {
  SIZES,
  SIZES_PLACEHOLDER,
  createErrorObject,
  findFirstElementIndex
} from './common';

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

export {
  checkWarningTextSize,
  checkWarningButtonSize,
  checkWarningButtonPosition,
  checkWarningPlaceholderSize
};
//# sourceMappingURL=linter.js.map
