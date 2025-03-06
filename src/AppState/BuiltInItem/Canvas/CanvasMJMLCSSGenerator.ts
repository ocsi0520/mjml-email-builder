import { ContainerMJMLCSSGenerator } from '../../EBItem/ContainerMJMLCSSGenerator';
import {
  MJMLCSSGenerator,
  StyleByItemIDOrView,
} from '../../EBItem/MJMLCSSGenerator';
import { AppMJMLVisitorRegister } from '../../Register/Visitor/AppMJMLVisitorRegister';
import { CanvasStateNode } from './CanvasStateNode';

export class CanvasMJMLCSSGenerator
  extends ContainerMJMLCSSGenerator<CanvasStateNode>
  implements MJMLCSSGenerator<CanvasStateNode>
{
  public getMJML(
    stateNode: CanvasStateNode,
    register: AppMJMLVisitorRegister
  ): string {
    return this.getMJMLOfChildren(stateNode, register);
  }
  protected getOwnStyle(): StyleByItemIDOrView {
    return {};
  }
}
