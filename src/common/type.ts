import { msg } from '@lit/localize';

export enum Alignment {
  left = 'left',
  center = 'center',
  right = 'right',
}

export const AlignmentLocalisations: Record<Alignment, () => string> = {
  left: () => msg('Left'),
  center: () => msg('Center'),
  right: () => msg('Right'),
};
