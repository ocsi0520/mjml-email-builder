import { ToolIconDescriptor } from '../ToolPlugin/ToolIconDescriptor';
import { ToolPlugin } from '../ToolPlugin/ToolPlugin';
import { blockItem } from './BuiltInItem/Block/BlockItem';
import { canvasItem } from './BuiltInItem/Canvas/CanvasItem';
import { EBItem } from './EBItem/EBItem';
import { EBItemRegister } from './Register/EBItemRegister';
import { slotItem } from './BuiltInItem/Slot/SlotItem';
import { StateEditorFactory } from './Register/StateEditorFactory';
import { StateNodeFactory } from './Register/StateNodeFactory';
import { AppCSSVisitorRegister } from './Register/Visitor/AppCSSVisitorRegister';
import { AppCompressorRegister } from './Register/Visitor/AppCompressorRegister';
import { AppDecompressorRegister } from './Register/Visitor/AppDecompressorRegister';
import { ItemCopierVisitorRegister } from './Register/Visitor/ItemCopierVisitorRegister';
import { AppMJMLVisitorRegister } from './Register/Visitor/AppMJMLVisitorRegister';

class EBItemManager {
  private registeredPlugins: Array<ToolPlugin> = [];
  constructor(
    private registers: Array<EBItemRegister<unknown>> = [
      AppCompressorRegister.getInstance(),
      AppDecompressorRegister.getInstance(),
      StateNodeFactory.getInstance(),
      StateEditorFactory.getInstance(),
      AppMJMLVisitorRegister.getInstance(),
      AppCSSVisitorRegister.getInstance(),
      ItemCopierVisitorRegister.getInstance(),
    ]
  ) {
    const builtInItems = [canvasItem, blockItem, slotItem] as const;
    builtInItems.forEach((item) => this.registerItemAtServices(item));
  }
  public register(plugin: ToolPlugin<string, any>): void {
    const alreadyRegistered = this.registeredPlugins.some(
      (registeredPlugin) => registeredPlugin.itemID === plugin.itemID
    );
    if (alreadyRegistered) return;
    this.registeredPlugins.push(plugin);
    this.registerItemAtServices(plugin);
  }
  public getAllIcons(): Array<ToolIconDescriptor<string>> {
    return this.registeredPlugins.map((plugin) => plugin.getIcon());
  }
  // TODO: get rid of any type --- it's likely that we can't get rid of it :(
  private registerItemAtServices(item: EBItem<string, any>): void {
    this.registers.forEach((service) => service.registerItem(item));
  }
}

export const ebItemManager = new EBItemManager();
