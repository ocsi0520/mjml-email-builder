import { BasicState, DEFAULT_BASIC_STATE } from '../../State/BasicState';

export type CanvasState = BasicState & {
  emailTitle: string;
  backgroundColor: string;
};
export const DEFAULT_STATE: CanvasState = {
  ...DEFAULT_BASIC_STATE,
  emailTitle: 'An email',
  backgroundColor: '#FFFFFF',
};
