import { BasicState, DEFAULT_BASIC_STATE } from '../../State/BasicState';
import { BorderState } from '../../State/BorderState';

export enum BlockType {
  threeThird = '33-33-33',
  oneAndTwoThird = '33-66',
  twoAndOneThird = '66-33',
  twoHalves = '50-50',
  oneWhole = '100',
}
export const blockColumnWidths: Record<BlockType, string[]> = {
  [BlockType.threeThird]: ['33%', '33%', '33%'],
  [BlockType.oneAndTwoThird]: ['33%', '66%'],
  [BlockType.twoAndOneThird]: ['66%', '33%'],
  [BlockType.twoHalves]: ['50%', '50%'],
  [BlockType.oneWhole]: ['100%'],
};
export type BlockState = BasicState & {
  type: BlockType;
  backgroundColor: string;
  border?: BorderState;
};

export const DEFAULT_STATE: BlockState = {
  ...DEFAULT_BASIC_STATE,
  type: BlockType.oneWhole,
  backgroundColor: '#FFFFFF',
};
