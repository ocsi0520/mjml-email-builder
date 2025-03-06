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
import { FooterStateNode } from './FooterStateNode';

export class FooterMJMLCSSGenerator
  implements MJMLCSSGenerator<FooterStateNode>
{
  public getMJML({ state }: FooterStateNode): string {
    const padding = renderPadding(state);
    const margin = renderMargin(state);
    const htmlTemplate =
      `<h1 style="margin:${margin};padding:${padding};` +
      `${fontStatesAsTemplate(state.font, 'style')}` +
      `">${state.unsubscribeText}` +
      `<a href="${state.unsubscribeLink}" style="text-decoration:none">` +
      ` ${state.linkText}</a></h1>`;
    return `<mj-text container-background-color="${state.backgroundColor}">
    ${htmlTemplate}</mj-text>`;
  }
  public getCSS({ state }: FooterStateNode): StyleByItemIDOrView {
    const styles: StyleByItemIDOrView = {};
    const { fontFamily } = state.font;
    // TODO: this is the default, should be explicitly written that
    if (fontFamily !== KNOWN_FONTS.Arial)
      styles[`font-${fontFamily}`] = fontFamily;
    return styles;
  }
}
