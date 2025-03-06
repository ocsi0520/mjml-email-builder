import { BlockType } from './BlockState';

export const getSlotDomClassesFor = (
  blockType: BlockType
  // TODO: this is a question, because I want to catch build-time the error
  // when we introduce new type of block and this function does not handle it
  // eslint-disable-next-line consistent-return
): Array<string> => {
  switch (blockType) {
    case BlockType.oneWhole:
      return [''];
    case BlockType.threeThird:
      return ['', '', ''];
    case BlockType.twoHalves:
      return ['', ''];
    case BlockType.oneAndTwoThird:
      return ['', 'two-unit'];
    case BlockType.twoAndOneThird:
      return ['two-unit', ''];
  }
};
