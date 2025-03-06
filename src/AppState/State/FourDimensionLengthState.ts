import { LengthString } from '../../common/components/length-input/type';

export type Dimension = 'Top' | 'Right' | 'Bottom' | 'Left';
export type LengthProperty = 'padding' | 'margin' | 'border';

export type FourDimensionLength<
  PropertyPrefix extends LengthProperty,
  PropertySuffix extends string = ''
> = {
  [key in `${PropertyPrefix}${Dimension}${PropertySuffix}`]: LengthString;
};

export type PaddingState = FourDimensionLength<'padding'>;
export type MarginState = FourDimensionLength<'margin'>;
