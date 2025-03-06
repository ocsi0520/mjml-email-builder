import { singletonInstance } from '../../../common/utils/class.util';
import { EBRoot } from '../../../eb-root';
import { EBEventHandler } from '../EBEventHandler';
import { CanvasEventHandler } from './CanvasEventHandler';
import { HeaderEventHandler } from './HeaderEventHandler';
import { SidePanelEventHandler } from './SidePanelEventHandler';
import { ToolbarEventHandler } from './ToolbarEventHandler';

export class EventHandlerProvider {
  public static getInstance = singletonInstance(this);
  private cachedEventHandlers: Array<EBEventHandler> | null = null;
  private previouslyUsedRoot: EBRoot | null = null;
  public getAllEventHandlersFor(ebRoot: EBRoot): Array<EBEventHandler> {
    const isPreviousNotApplicable =
      this.previouslyUsedRoot !== ebRoot || !this.cachedEventHandlers;
    if (isPreviousNotApplicable) {
      this.previouslyUsedRoot = ebRoot;
      this.cachedEventHandlers = this.createEventHandlers(ebRoot);
    }
    return this.cachedEventHandlers!;
  }
  private createEventHandlers(ebRoot: EBRoot): Array<EBEventHandler> {
    return [
      new HeaderEventHandler(ebRoot),
      new CanvasEventHandler(ebRoot),
      new ToolbarEventHandler(ebRoot),
      new SidePanelEventHandler(ebRoot),
    ];
  }
}
