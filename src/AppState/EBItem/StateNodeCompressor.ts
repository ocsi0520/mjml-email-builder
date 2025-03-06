import { BasicViewerComponent } from '../StateNode/Basic/BasicViewerComponent';
import { BasicState } from '../State/BasicState';
import { StateNode } from '../StateNode/StateNode';
import { Serializable } from './Serializable';
import { AppVisitorRegister } from '../Register/Visitor/AppVisitorRegister';

export interface StateNodeCompressor<State extends BasicState> {
  compress(
    stateNode: StateNode<State, BasicViewerComponent<State>>,
    compressorRegister: AppVisitorRegister<Serializable, StateNode>
  ): Serializable;
  decompress(
    serializableObject: Serializable,
    appStateSerializer: AppVisitorRegister<StateNode, Serializable>
  ): StateNode<State, BasicViewerComponent<State>>;
}
