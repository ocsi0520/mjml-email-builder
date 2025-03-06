import {
  MJMLCSSGenerator,
  StyleByItemIDOrView,
} from '../../AppState/EBItem/MJMLCSSGenerator';
import { KNOWN_FONTS } from '../../AppState/State/FontState';
import {
  fontStatesAsTemplate,
  renderMargin,
  renderPadding,
} from '../../common/utils/markup.utils';
import { TitleStateNode } from './TitleStateNode';
import { TitleToolState } from './TitleToolState';

export class TitleMJMLCSSGenerator implements MJMLCSSGenerator<TitleStateNode> {
  public getMJML({ state }: TitleStateNode): string {
    const padding = renderPadding(state);
    const margin = renderMargin(state);
    const h1Template =
      `<h1 style="margin:${margin};padding:${padding};` +
      `${this.getBorderStyle(state)}` +
      `${fontStatesAsTemplate(state.font, 'style')}` +
      `">${state.titleText}</h1>`;
    const actualTemplate = state.url
      ? `<a href="${state.url}" style="text-decoration:none">${h1Template}</a>`
      : h1Template;
    return `<mj-text container-background-color="${state.backgroundColor}">
      ${actualTemplate}
    </mj-text>`;
  }
  public getCSS({ state }: TitleStateNode): StyleByItemIDOrView {
    const styles: StyleByItemIDOrView = {};
    const { fontFamily } = state.font;
    // TODO: this is the default, should be explicitly written that
    if (fontFamily !== KNOWN_FONTS.Arial)
      styles[`font-${fontFamily}`] = fontFamily;
    return styles;
  }
  private getBorderStyle({ border }: TitleToolState): string {
    if (!border) return '';
    const { width, lineType, color, radius } = border;
    const simpleBorder = `border:${width} ${lineType} ${color};`;
    const borderRadius = radius ? `border-radius:${radius};` : '';
    return simpleBorder + borderRadius;
  }
}
