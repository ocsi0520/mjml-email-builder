import sinon from 'sinon';

type ArbitraryFunction = (...args: any) => any;

export type MockMethod<T extends ArbitraryFunction> = sinon.SinonSpy<
  Parameters<T>,
  ReturnType<T>
>;

export const mockMethod = <T extends ArbitraryFunction>(
  implementation?: T
): MockMethod<T> =>
  implementation ? sinon.fake(implementation) : sinon.fake();
