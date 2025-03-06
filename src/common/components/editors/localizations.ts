import { msg } from '@lit/localize';
import {
  FontAlignment,
  FontStyle,
  FontWeightKeyword,
  TextDecoration,
  TextTransform,
} from '../../../AppState/State/FontState';

export const FontWeightLocalisations: Record<FontWeightKeyword, () => string> =
  {
    lighter: () => msg('Lighter'),
    normal: () => msg('Regular'),
    bold: () => msg('Bold'),
    bolder: () => msg('Bolder', { desc: 'Bolder at font weight' }),
  };

export const FontStyleLocalisations: Record<FontStyle, () => string> = {
  normal: () => msg('Normal'),
  italic: () => msg('Italic'),
  oblique: () => msg('Oblique'),
};

export const TextDecorationLocalisations: Record<TextDecoration, () => string> =
  {
    none: () => msg('None'),
    underline: () => msg('Underline'),
    overline: () => msg('Overline'),
    'line-through': () => msg('Line-through'),
  };

export const TextTransformLocalisations: Record<TextTransform, () => string> = {
  none: () => msg('None'),
  uppercase: () => msg('Uppercase'),
  lowercase: () => msg('Lowercase'),
  capitalize: () => msg('Capitalize'),
};

export const FontAlignmentLocalisations: Record<FontAlignment, () => string> = {
  left: () => msg('Left'),
  center: () => msg('Center'),
  right: () => msg('Right'),
  justify: () => msg('Justify'),
};
