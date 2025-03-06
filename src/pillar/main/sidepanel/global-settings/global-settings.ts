import { LitElement } from 'lit';
import {
  FontState,
  makeDefaultFontState,
} from '../../../../AppState/State/FontState';
import { singletonInstance } from '../../../../common/utils/class.util';

export class GlobalSettings {
  public static getInstance = singletonInstance(this);
  private _font: FontState = {
    ...makeDefaultFontState(),
    size: '32px',
  };
  private _linkColor: string = '#0000ff';
  private listenerComponent?: LitElement;
  public get font(): FontState {
    return this._font;
  }
  public set font(value: FontState) {
    this._font = value;
    this.listenerComponent?.requestUpdate();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  public get linkColor(): string {
    return this._linkColor;
  }
  public set linkColor(value: string) {
    this._linkColor = value;
    this.listenerComponent?.requestUpdate();
  }
  // I know this is not the best option, but there won't be any other component that
  // listens to global settings' changes
  public setListenerComponent(component: LitElement): void {
    this.listenerComponent = component;
  }
}
