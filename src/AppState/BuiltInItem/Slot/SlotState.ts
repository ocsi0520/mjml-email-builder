import { BasicState, DEFAULT_BASIC_STATE } from '../../State/BasicState';

export type SlotState = BasicState & {};

export const DEFAULT_STATE: SlotState = {
  ...DEFAULT_BASIC_STATE,
};
