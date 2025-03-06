import {
  BasicState,
  DEFAULT_BASIC_STATE,
} from '../../AppState/State/BasicState';
import { FontState, FontWeightKeyword } from '../../AppState/State/FontState';
import { LengthString } from '../../common/components/length-input/type';
import { Alignment } from '../../common/type';
import { GlobalSettings } from '../../pillar/main/sidepanel/global-settings/global-settings';
import { BorderState } from '../../AppState/State/BorderState';

export type ButtonToolState = BasicState & {
  text: string;
  url: string;
  font: FontState;
  backgroundColor: string;
  width: LengthString;
  alignment: Alignment;
  border?: BorderState;
};

const font = { ...GlobalSettings.getInstance().font };
font.size = '18px';
font.color = 'white';
font.weight = FontWeightKeyword.bold;

export const DEFAULT_STATE: ButtonToolState = {
  text: 'CLICK',
  url: 'https://www.google.com',
  ...DEFAULT_BASIC_STATE,
  font,
  backgroundColor: '#0de0be',
  width: '200px',
  alignment: Alignment.center,
  border: {
    width: '2px',
    color: '#ffffff',
    radius: '10px',
    lineType: 'solid',
  },
};
