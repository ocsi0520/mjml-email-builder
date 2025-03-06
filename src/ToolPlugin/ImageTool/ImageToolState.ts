import {
  BasicState,
  DEFAULT_BASIC_STATE,
} from '../../AppState/State/BasicState';
import { Alignment } from '../../common/type';
import { LengthString } from '../../common/components/length-input/type';
import { BorderState } from '../../AppState/State/BorderState';

export type ImageToolState = BasicState & {
  imageURL: string;
  targetURL: string;
  width?: LengthString; // Only px
  alignment: Alignment;
  border?: BorderState;
  backgroundColor: string;
};

export const DEFAULT_STATE: ImageToolState = {
  // imageURL: new URL('../../../../assets/image-icon-alt.svg', import.meta.url).href,
  imageURL: 'https://www.pngrepo.com/png/110227/512/linkedin-big-logo.png',
  targetURL: 'https://www.google.com',
  alignment: Alignment.center,
  backgroundColor: '#ffffff',
  ...DEFAULT_BASIC_STATE,
};
