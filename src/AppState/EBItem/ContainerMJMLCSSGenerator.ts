import { BasicContainerComponent } from '../StateNode/Basic/BasicContainerComponent';
import { BasicState } from '../State/BasicState';
import { BasicViewerComponent } from '../StateNode/Basic/BasicViewerComponent';
import { ContainerStateNode } from '../StateNode/ContainerStateNode';
import { StateNode } from '../StateNode/StateNode';
import { AppVisitorRegister } from '../Register/Visitor/AppVisitorRegister';
import { MJMLCSSGenerator, StyleByItemIDOrView } from './MJMLCSSGenerator';

export abstract class ContainerMJMLCSSGenerator<
  SN extends ContainerStateNode<
    BasicState,
    BasicContainerComponent<BasicState, StateNode, string>
  >
> implements MJMLCSSGenerator<SN>
{
  public getCSS(
    stateNode: SN,
    appCSSVisitorRegister: AppVisitorRegister<
      StyleByItemIDOrView,
      StateNode<BasicState, BasicViewerComponent<BasicState>>
    >
  ): StyleByItemIDOrView {
    return this.mergeStyleWithChildrenStyle(
      stateNode,
      appCSSVisitorRegister,
      this.getOwnStyle(stateNode)
    );
  }
  protected getMJMLOfChildren(
    stateNode: SN,
    appMJMLVisitorRegister: AppVisitorRegister<
      string,
      StateNode<BasicState, BasicViewerComponent<BasicState>>
    >
  ): string {
    return stateNode.children
      .map((slot) => appMJMLVisitorRegister.visitNode(slot))
      .join('');
  }
  private mergeStyleWithChildrenStyle(
    stateNode: SN,
    appCSSVisitorRegister: AppVisitorRegister<
      StyleByItemIDOrView,
      StateNode<BasicState, BasicViewerComponent<BasicState>>
    >,
    ownStyle: StyleByItemIDOrView
  ): StyleByItemIDOrView {
    return stateNode.children.reduce(
      (acc, child) => ({ ...acc, ...appCSSVisitorRegister.visitNode(child) }),
      ownStyle
    );
  }
  public abstract getMJML(
    stateNode: SN,
    appMJMLVisitorRegister: AppVisitorRegister<
      string,
      StateNode<BasicState, BasicViewerComponent<BasicState>>
    >
  ): string;
  protected abstract getOwnStyle(stateNode: SN): StyleByItemIDOrView;
}
