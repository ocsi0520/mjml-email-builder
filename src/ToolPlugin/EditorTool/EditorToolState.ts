import {
  BasicState,
  DEFAULT_BASIC_STATE,
} from '../../AppState/State/BasicState';

export type EditorToolState = BasicState & {
  htmlContent: string;
};

// TODO: translation
export const DEFAULT_STATE: EditorToolState = {
  ...DEFAULT_BASIC_STATE,
  htmlContent: '',
};
