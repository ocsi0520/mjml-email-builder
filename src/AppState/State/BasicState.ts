import { PaddingState, MarginState } from './FourDimensionLengthState';

export type BasicState = {} & PaddingState & MarginState;

export const DEFAULT_BASIC_STATE: BasicState = {
  paddingTop: '0px',
  paddingRight: '0px',
  paddingBottom: '0px',
  paddingLeft: '0px',
  marginTop: '0px',
  marginRight: '0px',
  marginBottom: '0px',
  marginLeft: '0px',
};
