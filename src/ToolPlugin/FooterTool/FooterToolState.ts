import { msg } from '@lit/localize';
import {
  BasicState,
  DEFAULT_BASIC_STATE,
} from '../../AppState/State/BasicState';
import { FontAlignment, FontState } from '../../AppState/State/FontState';
import { GlobalSettings } from '../../pillar/main/sidepanel/global-settings/global-settings';

export type FooterToolState = BasicState & {
  unsubscribeText: string;
  linkText: string;
  backgroundColor: string;
  font: FontState;
  unsubscribeLink: string;
};

export const GET_DEFAULT_STATE = (): FooterToolState => ({
  ...DEFAULT_BASIC_STATE,
  unsubscribeText: msg('Unsubscribe'), // NOTE: We could use a placeholder in the input instead
  linkText: msg('Unsubscribe link text'),
  backgroundColor: '#ffffff',
  font: {
    ...GlobalSettings.getInstance().font,
    size: '12px',
    alignment: FontAlignment.left,
  },
  unsubscribeLink: 'https://www.google.com',
});
