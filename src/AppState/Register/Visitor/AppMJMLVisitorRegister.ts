import { singletonInstance } from '../../../common/utils/class.util';
import { EBItem } from '../../EBItem/EBItem';
import { BasicState } from '../../State/BasicState';
import { BasicViewerComponent } from '../../StateNode/Basic/BasicViewerComponent';
import { StateNode } from '../../StateNode/StateNode';
import { AppVisitorRegister, BasicVisitor } from './AppVisitorRegister';

export class AppMJMLVisitorRegister extends AppVisitorRegister<
  string,
  StateNode
> {
  public static getInstance = singletonInstance(this);
  protected visitorName: string = 'MJML';
  protected getAssignableValueFrom(
    item: EBItem<string, BasicState>
  ): () => BasicVisitor<
    string,
    StateNode<BasicState, BasicViewerComponent<BasicState>>
  > {
    return () => {
      const generator = item.getMJMLCSSGenerator();
      return {
        visit(node, appVisitor): string {
          return generator.getMJML(node, appVisitor);
        },
      };
    };
  }
}
