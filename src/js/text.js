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
