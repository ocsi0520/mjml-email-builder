import {
  BasicState,
  DEFAULT_BASIC_STATE,
} from '../../AppState/State/BasicState';
import {
  BorderState,
  DEFAULT_BORDER_STATE,
} from '../../AppState/State/BorderState';

export type HrToolState = BasicState & { border: BorderState };

export const DEFAULT_STATE: HrToolState = {
  ...DEFAULT_BASIC_STATE,
  border: { ...DEFAULT_BORDER_STATE, radius: undefined },
};
