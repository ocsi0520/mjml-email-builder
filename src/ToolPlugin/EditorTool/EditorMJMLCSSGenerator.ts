import {
  MJMLCSSGenerator,
  StyleByItemIDOrView,
} from '../../AppState/EBItem/MJMLCSSGenerator';
import { renderPadding, renderMargin } from '../../common/utils/markup.utils';
import { EditorStateNode } from './EditorStateNode';

export class EditorMJMLCSSGenerator
  implements MJMLCSSGenerator<EditorStateNode>
{
  public getMJML({ state, cssID }: EditorStateNode): string {
    const padding = renderPadding(state);
    return `<mj-text css-class="${cssID}" padding="${padding}">${state.htmlContent}</mj-text>`;
  }
  public getCSS({ state, cssID }: EditorStateNode): StyleByItemIDOrView {
    return {
      [cssID]: `.${cssID}>div{margin:${renderMargin(state)};}`,
    };
  }
}
