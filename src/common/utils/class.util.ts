type Instantiable<T extends abstract new () => any> = {
  _instance?: InstanceType<T>;
  new (): InstanceType<T>;
};
export const singletonInstance =
  <T extends Instantiable<T>>(classConstructor: T): (() => InstanceType<T>) =>
  () => {
    if (!classConstructor._instance)
      // eslint-disable-next-line new-cap
      classConstructor._instance = new classConstructor();
    return classConstructor._instance;
  };
