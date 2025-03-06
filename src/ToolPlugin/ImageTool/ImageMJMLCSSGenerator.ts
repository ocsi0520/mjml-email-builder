import {
  MJMLCSSGenerator,
  StyleByItemIDOrView,
} from '../../AppState/EBItem/MJMLCSSGenerator';
import { AppVisitorRegister } from '../../AppState/Register/Visitor/AppVisitorRegister';
import { BasicState } from '../../AppState/State/BasicState';
import { BasicViewerComponent } from '../../AppState/StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../AppState/StateNode/StateNode';
import { ImageStateNode } from './ImageStateNode';
import { ImageToolState } from './ImageToolState';

export class ImageMJMLCSSGenerator implements MJMLCSSGenerator<ImageStateNode> {
  public getMJML({ state }: ImageStateNode): string {
    return [
      `<mj-image width="${state.width}"`,
      `src="${state.imageURL}"`,
      `${this.getBorderStyle(state)}`, // empty space in case no border
      `href=${state.targetURL} />`,
    ].join(' ');
  }
  // TODO: later do this
  public getCSS(
    _stateNode: StateNode<ImageToolState, BasicViewerComponent<ImageToolState>>,
    _appCSSVisitorRegister: AppVisitorRegister<
      StyleByItemIDOrView,
      StateNode<BasicState, BasicViewerComponent<BasicState>>
    >
  ): StyleByItemIDOrView {
    return {};
  }
  private getBorderStyle({ border }: ImageToolState): string {
    if (!border) return '';
    const { width, lineType, color, radius } = border;
    const simpleBorder = `border="${width} ${lineType} ${color}" `;
    const borderRadius = radius ? `border-radius="${radius}" ` : '';
    return simpleBorder + borderRadius;
  }
}
