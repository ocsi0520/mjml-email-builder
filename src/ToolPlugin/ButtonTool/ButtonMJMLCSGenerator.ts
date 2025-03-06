import {
  MJMLCSSGenerator,
  StyleByItemIDOrView,
} from '../../AppState/EBItem/MJMLCSSGenerator';
import { AppVisitorRegister } from '../../AppState/Register/Visitor/AppVisitorRegister';
import { BasicState } from '../../AppState/State/BasicState';
import { BasicViewerComponent } from '../../AppState/StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../AppState/StateNode/StateNode';
import { KNOWN_FONTS } from '../../AppState/State/FontState';
import {
  fontStatesAsTemplate,
  renderMargin,
  renderPadding,
} from '../../common/utils/markup.utils';
import { ButtonStateNode } from './ButtonStateNode';
import { ButtonToolState } from './ButtonToolState';

export class ButtonMJMLCSSGenerator
  implements MJMLCSSGenerator<ButtonStateNode>
{
  public getMJML({ state, cssID }: ButtonStateNode): string {
    return [
      `<mj-button inner-padding="${renderPadding(state)}" css-class="${cssID}"`,
      fontStatesAsTemplate(state.font, 'mjml-attribute'),
      `background-color="${state.backgroundColor}" href="${state.url}"`,
      `${this.getBorderStyle(state)}`, // empty space in case no border
      `width="${state.width}"`,
      `>${state.text}</mj-button>`,
    ].join(' ');
  }
  public getCSS(
    {
      state,
      cssID,
    }: StateNode<ButtonToolState, BasicViewerComponent<ButtonToolState>>,
    _appCSSVisitorRegister: AppVisitorRegister<
      StyleByItemIDOrView,
      StateNode<BasicState, BasicViewerComponent<BasicState>>
    >
  ): StyleByItemIDOrView {
    const styles: StyleByItemIDOrView = {
      [cssID]: `.${cssID}>table{margin:${renderMargin(state)};}`,
    };
    const { fontFamily } = state.font;
    // TODO: this is the default, should be explicitly written that
    if (fontFamily !== KNOWN_FONTS.Arial)
      styles[`font-${fontFamily}`] = fontFamily;

    return styles;
  }
  // TODO: de-duplicate with title-tool & use regexp in getFontAttributes
  private getBorderStyle({ border }: ButtonToolState): string {
    if (!border) return '';
    const { width, lineType, color, radius } = border;
    const simpleBorder = `border="${width} ${lineType} ${color}" `;
    const borderRadius = radius ? `border-radius="${radius}" ` : '';
    return simpleBorder + borderRadius;
  }
}
