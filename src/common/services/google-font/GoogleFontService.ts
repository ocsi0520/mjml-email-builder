import { singletonInstance } from '../../utils/class.util';
import { GoogleFont, RawGoogleFont } from './google-font-type';

const GOOGLE_TOKEN = 'A_GOOGLE_TOKEN';

// TODO: test this service
export class GoogleFontService {
  public static getInstance = singletonInstance(this);
  private cachedGetPromise: Promise<Array<GoogleFont>> | null = null;
  public insertFontToHead(fontFamily: string): void {
    this.insertElementFontStyles();
    const styleElement = document.querySelector(
      'style.font-styles'
    ) as HTMLStyleElement;
    const importRule = `@import url("https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap");`;
    if (!styleElement.innerText.includes(importRule))
      styleElement.appendChild(document.createTextNode(importRule));
  }
  public getGoogleFonts(): Promise<Array<GoogleFont>> {
    if (!this.cachedGetPromise) {
      this.cachedGetPromise = this.createGetPromise();
      this.cachedGetPromise.catch(() => {
        this.cachedGetPromise = null;
      });
    }
    return this.cachedGetPromise;
  }
  private async createGetPromise(): Promise<Array<GoogleFont>> {
    const response = await this.fetchGoogleFonts();
    return response.items.map((font) => ({
      family: font.family,
      category: font.category,
    }));
  }
  private async fetchGoogleFonts(): Promise<RawGoogleFont> {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${GOOGLE_TOKEN}`
    );
    const data = await response.json();
    return data;
  }
  private insertElementFontStyles(): void {
    if (document.querySelector('style.font-styles')) return;
    const styleElement = document.createElement('style');
    styleElement.classList.add('font-styles');
    document.head.appendChild(styleElement);
  }
}
