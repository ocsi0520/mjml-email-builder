import { FontState } from './State/FontState';
import { singletonInstance } from '../common/utils/class.util';
import { GlobalSettings } from '../pillar/main/sidepanel/global-settings/global-settings';
import { itemID as canvasItemID } from './BuiltInItem/Canvas/CanvasItem';
import { CanvasStateNode } from './BuiltInItem/Canvas/CanvasStateNode';
import { Serializable } from './EBItem/Serializable';
import { AppCompressorRegister } from './Register/Visitor/AppCompressorRegister';
import { AppDecompressorRegister } from './Register/Visitor/AppDecompressorRegister';

type SerializableGlobalSettings = {
  font: FontState;
  linkColor: string;
};

type SerializableAppState = {
  globalSettings: SerializableGlobalSettings;
  canvas: Serializable;
};

export type DeserializedAppState = {
  canvas: CanvasStateNode;
  globalSettings: SerializableGlobalSettings;
};

export class AppStateSerializer {
  public static getInstance = singletonInstance(this);
  constructor(
    private compressorRegister = AppCompressorRegister.getInstance(),
    private decompressorRegister = AppDecompressorRegister.getInstance()
  ) {}
  public serializeAppState(
    canvasStateNode: CanvasStateNode,
    globalSettings: GlobalSettings
  ): string {
    const serializableState: SerializableAppState = {
      globalSettings: {
        font: globalSettings.font,
        linkColor: globalSettings.linkColor,
      },
      canvas: this.compressorRegister.visitNode(canvasStateNode),
    };
    return JSON.stringify(serializableState);
  }
  // TODO: validate global settings as well
  public deserializeAppState(serializedCanvas: string): DeserializedAppState {
    const { canvas: serializableCanvas, globalSettings }: SerializableAppState =
      JSON.parse(serializedCanvas);
    if (serializableCanvas.itemID !== canvasItemID)
      throw new Error("The given text's root is not a canvas");
    return {
      canvas: this.decompressorRegister.visitNode(
        serializableCanvas
      ) as CanvasStateNode,
      globalSettings,
    };
  }
}
