import { CommandManager } from '../../../command/CommandManager';
import { EBRoot } from '../../../eb-root';
import { CanvasEmailBuilderEventMap, DropData } from '../../canvas.event';
import { EventNamesByListeners, Listener } from '../EmailEventListener';
import { InsertBlockNodeCommand } from '../../../command/InsertBlockNodeCommand';
import { InsertToolNodeCommand } from '../../../command/MouseCommand/InsertToolNodeCommand';
import { StateNode } from '../../../AppState/StateNode/StateNode';
import { SetNewStateCommand } from '../../../command/SetNewStateCommand';
import { DeleteStateNodeCommand } from '../../../command/DeleteStateNodeCommand';
import { EBHighlightSelection } from '../../../pillar/main/highlight-selection/eb-highlight-selection';
import { MoveStateNodeCommand } from '../../../command/MouseCommand/MoveStateNodeCommand';
import { CopyStateNodeCommand } from '../../../command/CopyStateNodeCommand';
import { DragService } from '../../../AppState/DragService';
import { EBEventHandler } from '../EBEventHandler';
import { BlockStateNode } from '../../../AppState/BuiltInItem/Block/BlockStateNode';
import { BasicState } from '../../../AppState/State/BasicState';
import { BlockType } from '../../../AppState/BuiltInItem/Block/BlockState';

// __QUESTION__: remove insertToolNode, instead create a state node on dragging an icon
// and insert it --> MoveSN & InsertToolNode commands would merge

// TODO: when dragging an element the highlighters has wrong position

// TODO: separate command-related events from mouse-related ones
// commands: undo,redo,copy,delete,new-block,

type CanvasListeners = EventNamesByListeners<CanvasEmailBuilderEventMap>;

export class CanvasEventHandler implements EBEventHandler {
  constructor(
    private ebRoot: EBRoot,
    private commandManager = CommandManager.getInstance(),
    private dragService = DragService.getInstance()
  ) {}
  private get selectHighlighter(): EBHighlightSelection {
    return this.ebRoot.selectHighlighterRef.value!;
  }
  private get blockHoverHighlighter(): EBHighlightSelection {
    return this.ebRoot.blockHoverHighlighterRef.value!;
  }
  private get nodeHoverHighlighter(): EBHighlightSelection {
    return this.ebRoot.nodeHoverHighlighterRef.value!;
  }
  public getEventListeners(): CanvasListeners {
    // eslint-disable-next-line no-empty-function
    const noop = (): void => {};
    const listenersWithoutHighlighterUpdate: CanvasListeners = {
      'clear-selection': this.handleClearSelection,
      'node-selected': this.handleNodeSelected,
      'node-hovered': this.handleNodeHovered,
      'node-state-changed': this.handleNodeStateChanged,
      'new-block': this.insertNewBlock,
      'state-node-drop-zone': this.handleDrop,
      'delete-state-node': this.deleteStateNode,
      'state-node-drag-start': this.handleStateNodeDragStart,
      'state-node-drag-stop': this.handleStateNodeDragStop,
      'copy-state-node': this.copyStateNode,
      undo: noop,
      redo: noop,
    };
    return this.getWrappedListenersWithHighlighterUpdate(
      listenersWithoutHighlighterUpdate
    );
  }
  private getWrappedListenersWithHighlighterUpdate(
    listeners: CanvasListeners
  ): CanvasListeners {
    const wrappedListeners: Partial<CanvasListeners> = {};
    for (const key of Object.keys(listeners)) {
      const typedKey = key as keyof CanvasListeners;
      wrappedListeners[typedKey] = this.updateWrapperHOF(
        listeners[typedKey] as any
      ) as any;
    }
    return wrappedListeners as CanvasListeners;
  }
  private updateWrapperHOF =
    <T extends Event>(listener: Listener<T>): Listener<T> =>
    (ev) => {
      listener(ev);
      requestAnimationFrame(() => this.updateHighlighters());
    };
  private handleClearSelection = (ev: CustomEvent<StateNode | null>): void => {
    if (ev.detail === null || ev.detail === this.ebRoot._selectedStateNode)
      this.clearSelectionForCurrentStateNode();
  };
  private handleNodeSelected = (ev: CustomEvent<StateNode>): void => {
    this.clearSelectionForCurrentStateNode();
    // __QUESTION__ this might not be the case anymore
    // TODO: a problem (which right now is worked around)
    // this one runs before block highlighter actually says
    // 'state-node-drag-stop'
    // so we can't use `ev.detail` in #handleStateNodeDragStop
    if (this.blockHoverHighlighter.selectedStateNode === ev.detail)
      this.blockHoverHighlighter.selectedStateNode = null;
    if (this.nodeHoverHighlighter.selectedStateNode === ev.detail)
      this.nodeHoverHighlighter.selectedStateNode = null;
    this.selectStateNode(ev.detail);
  };
  private handleNodeHovered = (ev: CustomEvent<StateNode>): void => {
    const isDraggingInProgress = Boolean(this.dragService.draggedItem);
    if (isDraggingInProgress) return;
    const isAlreadyHighlighted = [
      this.selectHighlighter.selectedStateNode,
      this.blockHoverHighlighter.selectedStateNode,
      this.nodeHoverHighlighter.selectedStateNode,
    ].includes(ev.detail);
    if (isAlreadyHighlighted) return;
    if (ev.detail instanceof BlockStateNode)
      this.blockHoverHighlighter.selectedStateNode = ev.detail;
    else this.nodeHoverHighlighter.selectedStateNode = ev.detail;
  };
  private handleNodeStateChanged = (ev: CustomEvent<BasicState>): void => {
    const selectedNode = this.ebRoot._selectedStateNode;
    if (!selectedNode) return;
    this.commandManager.apply(new SetNewStateCommand(selectedNode, ev.detail));
  };
  private insertNewBlock = (ev: CustomEvent<BlockType>): void => {
    const insertCmd = new InsertBlockNodeCommand(
      this.ebRoot.canvasStateNode,
      ev.detail
    );
    this.commandManager.apply(insertCmd);
    this.ebRoot._commandManagerState = this.commandManager.getCurrentState();
  };
  private handleDrop = (ev: CustomEvent<DropData>): void => {
    if (this.dragService.draggedIcon) {
      this.insertToolNode(ev.detail, this.dragService.draggedIcon.itemID);
      // TODO: this should be triggered in ToolIcon, but unfortunately the time
      // when we dispatch the new event (ondragstop), the img is already removed from DOM
      // therefore it won't arrive to eb-root
      this.dragService.draggedIcon = null;
    }
    if (this.dragService.draggedStateNode)
      this.handleStateNodeMovement(
        ev.detail,
        this.dragService.draggedStateNode
      );
  };
  private deleteStateNode = (ev: CustomEvent<StateNode>): void => {
    if (ev.detail === this.ebRoot._selectedStateNode)
      this.clearSelectionForCurrentStateNode();
    if (this.blockHoverHighlighter.selectedStateNode === ev.detail)
      this.blockHoverHighlighter.selectedStateNode = null;
    if (this.nodeHoverHighlighter.selectedStateNode === ev.detail)
      this.nodeHoverHighlighter.selectedStateNode = null;
    const command = new DeleteStateNodeCommand(ev.detail);
    if (!command.isExecutable()) return;
    this.commandManager.apply(command);
  };
  private handleStateNodeDragStart = (ev: CustomEvent<StateNode>): void => {
    ev.detail.component.classList.add('dragged');
    this.dragService.draggedStateNode = ev.detail;
  };
  private handleStateNodeDragStop = (_ev: CustomEvent<StateNode>): void => {
    this.dragService.draggedStateNode!.component.classList.remove('dragged');
    this.dragService.draggedStateNode = null;
  };
  private copyStateNode = (ev: CustomEvent<StateNode>): void => {
    const command = new CopyStateNodeCommand(ev.detail);
    if (!command.isExecutable()) return;
    this.commandManager.apply(command);
  };
  private clearSelectionForCurrentStateNode(): void {
    if (!this.ebRoot._selectedStateNode) return;
    this.ebRoot._sidePanelView = 'tools';
    this.ebRoot._selectedStateNode = null;
    this.selectHighlighter.selectedStateNode = null;
  }
  private selectStateNode(stateNode: StateNode): void {
    this.ebRoot._selectedStateNode = stateNode;
    this.selectHighlighter.selectedStateNode = stateNode;
    this.ebRoot._sidePanelView = 'editor';
  }
  private insertToolNode(dropData: DropData, itemID: string): void {
    const command = new InsertToolNodeCommand(dropData, itemID);
    if (command.isExecutable()) {
      this.commandManager.apply(command);
      this.ebRoot._commandManagerState = this.commandManager.getCurrentState();
    }
  }
  private handleStateNodeMovement(
    dropData: DropData,
    draggedStateNode: StateNode
  ): void {
    const command = new MoveStateNodeCommand(draggedStateNode, dropData);
    if (command.isExecutable()) {
      this.commandManager.apply(command);
      this.ebRoot._commandManagerState = this.commandManager.getCurrentState();
    }
  }
  private updateHighlighters(): void {
    this.selectHighlighter.requestUpdate();
    this.blockHoverHighlighter.requestUpdate();
    this.nodeHoverHighlighter.requestUpdate();
  }
}
