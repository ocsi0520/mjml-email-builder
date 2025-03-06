import { msg } from '@lit/localize';
import { LengthString } from '../../common/components/length-input/type';
import { LocalizationRecord } from '../../common/localization.type';

export const allAllowedLineTypes = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
] as const;

export type LineType = (typeof allAllowedLineTypes)[number];
export const allAllowedLineTypesLocalization: LocalizationRecord<LineType> = {
  dashed: () => msg('dashed'),
  dotted: () => msg('dotted'),
  double: () => msg('double'),
  groove: () => msg('groove'),
  inset: () => msg('inset'),
  outset: () => msg('outset'),
  ridge: () => msg('ridge'),
  solid: () => msg('solid'),
};

export type BorderState = {
  width: LengthString;
  color: string;
  radius?: LengthString;
  lineType: LineType;
};

export const DEFAULT_BORDER_STATE: BorderState = {
  width: '2px',
  color: '#ffffff',
  radius: '10px',
  lineType: 'solid',
};
