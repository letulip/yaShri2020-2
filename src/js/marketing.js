import {
  createErrorObject
} from './common';

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



export {
  checkMarketingBlocks
};