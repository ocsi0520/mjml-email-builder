import { msg } from '@lit/localize';
import {
  BasicState,
  DEFAULT_BASIC_STATE,
} from '../../AppState/State/BasicState';
import { FontState } from '../../AppState/State/FontState';
import { GlobalSettings } from '../../pillar/main/sidepanel/global-settings/global-settings';
import { BorderState } from '../../AppState/State/BorderState';

export type TitleToolState = BasicState & {
  titleText: string;
  backgroundColor: string;
  font: FontState;
  url?: string;
  border?: BorderState;
};

export const GET_DEFAULT_STATE = (): TitleToolState => ({
  ...DEFAULT_BASIC_STATE,
  titleText: msg('Title'), // NOTE: We could use a placeholder in the input instead
  backgroundColor: '#ffffff',
  font: { ...GlobalSettings.getInstance().font },
});
