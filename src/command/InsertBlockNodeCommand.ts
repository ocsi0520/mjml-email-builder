import { itemID as blockItemID } from '../AppState/BuiltInItem/Block/BlockItem';
import {
  BlockType,
  DEFAULT_STATE,
} from '../AppState/BuiltInItem/Block/BlockState';
import { BlockStateNode } from '../AppState/BuiltInItem/Block/BlockStateNode';
import { getSlotDomClassesFor } from '../AppState/BuiltInItem/Block/PresentationHelper';
import { CanvasStateNode } from '../AppState/BuiltInItem/Canvas/CanvasStateNode';
import { itemID as slotItemID } from '../AppState/BuiltInItem/Slot/SlotItem';
import { SlotStateNode } from '../AppState/BuiltInItem/Slot/SlotStateNode';
import { StateNodeFactory } from '../AppState/Register/StateNodeFactory';
import { dispatchEBEvent } from '../events/app.event';
import { RevertableCommand } from './RevertableCommand';

export class InsertBlockNodeCommand implements RevertableCommand {
  private createdBlockStateNode: BlockStateNode | null = null;
  constructor(
    private canvasStateNode: CanvasStateNode,
    private blockType: BlockType,
    private stateNodeFactory = StateNodeFactory.getInstance()
  ) {}
  public isExecutable(): boolean {
    return true;
  }
  public execute(): void {
    if (!this.createdBlockStateNode) this.createBlockStateNode();
    this.canvasStateNode.addStateNode(this.createdBlockStateNode!);
    dispatchEBEvent(
      this.canvasStateNode.component,
      'node-selected',
      this.createdBlockStateNode!
    );
  }
  public undo(): void {
    dispatchEBEvent(
      this.canvasStateNode.component,
      'clear-selection',
      this.createdBlockStateNode!
    );
    this.canvasStateNode.removeStateNode(this.createdBlockStateNode!);
  }
  private createBlockStateNode(): void {
    this.createdBlockStateNode = this.stateNodeFactory.createStateNodeBy(
      blockItemID
    ) as BlockStateNode;
    this.createdBlockStateNode.state = {
      ...DEFAULT_STATE,
      type: this.blockType,
    };
    this.addSlotsToBlockBasedOnType();
  }
  private addSlotsToBlockBasedOnType(): void {
    const slotDomClasses = getSlotDomClassesFor(this.blockType);
    slotDomClasses.forEach(() => this.addSlotToBlock());
  }
  private addSlotToBlock(): void {
    const slotStateNode = this.stateNodeFactory.createStateNodeBy(
      slotItemID
    ) as SlotStateNode;
    this.createdBlockStateNode!.addStateNode(slotStateNode);
  }
}
