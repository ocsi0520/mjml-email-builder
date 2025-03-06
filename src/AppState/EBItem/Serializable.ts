export type SerializablePrimitive = number | boolean | string;
export interface SerializableObject {
  [key: string]:
    | SerializablePrimitive
    | Array<SerializablePrimitive>
    | SerializableObject
    | Array<SerializableObject>;
}
export interface Serializable {
  itemID: string;
  state: SerializableObject;
  children?: Array<Serializable>;
}
