import { singletonInstance } from '../../../common/utils/class.util';
import { EBItem } from '../../EBItem/EBItem';
import { StyleByItemIDOrView } from '../../EBItem/MJMLCSSGenerator';
import { BasicState } from '../../State/BasicState';
import { BasicViewerComponent } from '../../StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../StateNode/StateNode';
import { AppVisitorRegister, BasicVisitor } from './AppVisitorRegister';

export class AppCSSVisitorRegister extends AppVisitorRegister<
  StyleByItemIDOrView,
  StateNode
> {
  public static getInstance = singletonInstance(this);
  protected visitorName: string = 'CSS';
  protected getAssignableValueFrom(
    item: EBItem<string, BasicState>
  ): () => BasicVisitor<
    StyleByItemIDOrView,
    StateNode<BasicState, BasicViewerComponent<BasicState>>
  > {
    return () => {
      const cssGenerator = item.getMJMLCSSGenerator();
      return {
        visit(node, appVisitor): StyleByItemIDOrView {
          return cssGenerator.getCSS(node, appVisitor);
        },
      };
    };
  }
}
