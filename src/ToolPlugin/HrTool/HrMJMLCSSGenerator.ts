import {
  MJMLCSSGenerator,
  StyleByItemIDOrView,
} from '../../AppState/EBItem/MJMLCSSGenerator';
import { renderMargin, renderPadding } from '../../common/utils/markup.utils';
import { HrStateNode } from './HrStateNode';

export class HrMJMLCSSGenerator implements MJMLCSSGenerator<HrStateNode> {
  public getCSS({ cssID, state }: HrStateNode): StyleByItemIDOrView {
    return {
      'hr-item':
        'hr.hr-item{border:none;border-top:1px solid var(--black);width:100%}',
      [cssID]: `.${cssID}>p{margin:${renderMargin(state)} !important;}`,
    };
  }
  public getMJML({ state, cssID }: HrStateNode): string {
    const { width, lineType, color } = state.border;

    return [
      `<mj-divider css-class="${cssID}" border-width="${width}"`,
      `border-style="${lineType}" border-color="${color}"`,
      `padding="${renderPadding(state)}" />`,
    ].join(' ');
  }
}
