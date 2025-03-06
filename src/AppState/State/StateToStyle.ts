import { StyleInfo } from 'lit/directives/style-map';
import { BasicState } from './BasicState';

// TODO: separate margin & padding states
export const mapBasicStateToStyleInfo = (
  basicState: BasicState
): Readonly<StyleInfo> => ({
  marginBottom: basicState.marginBottom,
  marginLeft: basicState.marginLeft,
  marginRight: basicState.marginRight,
  marginTop: basicState.marginTop,
  paddingBottom: basicState.paddingBottom,
  paddingLeft: basicState.paddingLeft,
  paddingRight: basicState.paddingRight,
  paddingTop: basicState.paddingTop,
});
