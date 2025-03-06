import { EBItem } from '../EBItem/EBItem';

export abstract class EBItemRegister<AssignableValue> {
  private registeredItems: Record<string, AssignableValue> = {};
  public registerItem(item: EBItem): void {
    const isAlreadyRegisteredItem = Boolean(this.registeredItems[item.itemID]);
    if (isAlreadyRegisteredItem) return;
    const assignableValue = this.getAssignableValueFrom(item);
    this.registeredItems[item.itemID] = assignableValue;
  }
  protected getAssignedValueFor(
    itemID: EBItem['itemID']
  ): AssignableValue | null {
    return this.registeredItems[itemID] ?? null;
  }
  protected abstract getAssignableValueFrom(item: EBItem): AssignableValue;
}
