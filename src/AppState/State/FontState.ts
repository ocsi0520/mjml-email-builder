import { LengthString } from '../../common/components/length-input/type';

export const KNOWN_FONTS = {
  Arial: 'Arial, sans-serif',
  Verdana: 'Verdana, sans-serif',
  Tahoma: 'Tahoma, sans-serif',
  Trebuchet: 'Trebuchet MS, sans-serif',
  'Times New Roman': 'Times New Roman, serif',
  Georgia: 'Georgia, serif',
  Garamond: 'Garamond, serif',
  'Courier New': 'Courier New, monospace',
};

export enum FontWeightKeyword {
  lighter = 'lighter',
  normal = 'normal',
  bold = 'bold',
  bolder = 'bolder',
}

export enum FontStyle {
  normal = 'normal',
  italic = 'italic',
  oblique = 'oblique',
}

export enum TextDecoration {
  none = 'none',
  underline = 'underline',
  overline = 'overline',
  lineThrough = 'line-through',
}

export enum TextTransform {
  none = 'none',
  uppercase = 'uppercase',
  lowercase = 'lowercase',
  capitalize = 'capitalize',
}

export enum FontAlignment {
  left = 'left',
  center = 'center',
  right = 'right',
  justify = 'justify',
}

export type FontWeight = FontWeightKeyword | number;

export type FontState = {
  fontFamily: string;
  size?: LengthString;
  lineHeight: LengthString;
  letterSpacing: LengthString;
  alignment: FontAlignment;
  weight: FontWeight;
  color: string;
  fontStyle: FontStyle;
  textDecoration: TextDecoration;
  textTransform: TextTransform;
};

// TODO: check why we need this separate function
export function makeDefaultFontState(): FontState {
  return {
    alignment: FontAlignment.center,
    color: '#000000',
    fontFamily: KNOWN_FONTS.Arial,
    size: '16px',
    weight: 400,
    fontStyle: FontStyle.normal,
    textDecoration: TextDecoration.none,
    textTransform: TextTransform.none,
    lineHeight: '40px',
    letterSpacing: '1px',
  };
}
