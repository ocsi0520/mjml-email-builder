import { CSSResult, css, unsafeCSS } from 'lit';
import { singletonInstance } from '../common/utils/class.util';
import { GlobalSettings } from '../pillar/main/sidepanel/global-settings/global-settings';
import { CanvasStateNode } from './BuiltInItem/Canvas/CanvasStateNode';
import { StyleByItemIDOrView } from './EBItem/MJMLCSSGenerator';
import { AppCSSVisitorRegister } from './Register/Visitor/AppCSSVisitorRegister';

type FontName = string;
type KeyWithFontPrefix = `font-${string}`;
type FontStyles = Record<KeyWithFontPrefix, FontName>;

type SeparatedStyles = {
  otherStyles: StyleByItemIDOrView;
  fontStyles: FontStyles;
};

export class AppStyleGenerator {
  public static getInstance = singletonInstance(this);
  constructor(
    private cssVisitorRegister = AppCSSVisitorRegister.getInstance(),
    private globalSettings = GlobalSettings.getInstance()
  ) {}
  public getMJMLStyles(canvasStateNode: CanvasStateNode): string {
    const { fontStyles, otherStyles } = this.getStylesFrom(canvasStateNode);
    return `<mj-style>${this.getAllStyles(otherStyles)}</mj-style>
        ${this.getMJMLFontStyles(fontStyles)}`;
  }
  private getAllStyles(otherStyles: SeparatedStyles['otherStyles']): string {
    return [this.getGlobalSettingsStyles(), ...Object.values(otherStyles)].join(
      ''
    );
  }
  private getGlobalSettingsStyles(): CSSResult {
    const { font, linkColor } = this.globalSettings;
    return css`
      body {
        font-family: ${unsafeCSS(font.fontFamily)};
        text-align: ${unsafeCSS(font.alignment)};
      }

      a {
        color: ${unsafeCSS(linkColor)};
      }
    `;
  }
  private getStylesFrom(canvasStateNode: CanvasStateNode): SeparatedStyles {
    const cssResult = this.cssVisitorRegister.visitNode(canvasStateNode);
    return this.getSeparatedFontAndOtherStyles(cssResult);
  }
  private getSeparatedFontAndOtherStyles(
    stylesFromCanvas: StyleByItemIDOrView
  ): SeparatedStyles {
    const otherStyles: StyleByItemIDOrView = {};
    const fontStyles: FontStyles = {};
    Object.keys(stylesFromCanvas).forEach((styleKey) => {
      if (styleKey.startsWith('font-'))
        fontStyles[styleKey as KeyWithFontPrefix] = stylesFromCanvas[styleKey];
      else otherStyles[styleKey] = stylesFromCanvas[styleKey];
    });

    return { otherStyles, fontStyles };
  }
  private getMJMLFontStyles(fontStyles: FontStyles): string {
    return Object.values(fontStyles)
      .map(
        (fontFamily) =>
          `<mj-font name="${fontFamily}" href="https://fonts.googleapis.com/css2?family=${fontFamily}" />`
      )
      .join('');
  }
}
