import * as chai from '@esm-bundle/chai';
import sinonChai from 'sinon-chai-es';
import { CommandManager } from '../CommandManager';
import { MockRevertableCommand } from './RevertableCommand.mock';

chai.use(sinonChai);
const expect = chai.expect;

type StubState = {
  a: number;
  b: number;
  c: number;
  d: number;
};

describe(CommandManager.name, () => {
  const deepCopy = <T>(value: T): T => JSON.parse(JSON.stringify(value));
  const originalState = { a: 0, b: 0, c: 0, d: 0 };
  const getStateWith = (
    currentState: StubState,
    appliedCommand: keyof StubState
  ): StubState => ({ ...currentState, [appliedCommand]: 1 });

  let state: StubState;
  let commandA: MockRevertableCommand;
  let commandB: MockRevertableCommand;
  let commandC: MockRevertableCommand;
  let commandD: MockRevertableCommand;
  let unitUnderTest: CommandManager;

  beforeEach(() => {
    state = deepCopy(originalState);
    commandA = new MockRevertableCommand('a', state);
    commandB = new MockRevertableCommand('b', state);
    commandC = new MockRevertableCommand('c', state);
    commandD = new MockRevertableCommand('d', state);
    unitUnderTest = new CommandManager();
  });
  describe('empty command list', () => {
    it('should do nothing when reverting', () => {
      expect(() => unitUnderTest.undoLast()).not.throws();
    });
    it('should do nothing when reapplying', () => {
      expect(() => unitUnderTest.reapplyPrevious()).not.throws();
    });
  });
  describe('non-empty command list', () => {
    it('should apply a command', () => {
      unitUnderTest.apply(commandA);
      const expectedState = getStateWith(originalState, 'a');
      expect(state).deep.equals(expectedState);
      expect(commandA.execute).callCount(1);
    });
    it('should apply a command, then revert it', () => {
      unitUnderTest.apply(commandA);
      unitUnderTest.undoLast();
      expect(state).deep.equals(originalState);
      expect(commandA.execute).callCount(1);
      expect(commandA.undo).callCount(1);
    });
    it('should apply a command, revert it, then reapply', () => {
      const expectedState = getStateWith(originalState, 'a');
      unitUnderTest.apply(commandA);
      unitUnderTest.undoLast();
      unitUnderTest.reapplyPrevious();
      expect(state).deep.equals(expectedState);
      expect(commandA.execute).callCount(2);
      expect(commandA.undo).callCount(1);
    });
    it(
      'should apply 2 commands, revert 2nd, ' +
        'apply new one, and not let reapply',
      () => {
        unitUnderTest.apply(commandA);
        unitUnderTest.apply(commandB);
        unitUnderTest.undoLast();
        unitUnderTest.apply(commandC);
        unitUnderTest.reapplyPrevious();
        const expectedState = getStateWith(
          getStateWith(originalState, 'a'),
          'c'
        );
        expect(state).deep.equals(expectedState);
      }
    );
    it('should undo-redo-undo 2nd, undo 3rd, apply 4th, try reapply', () => {
      unitUnderTest.apply(commandA);
      unitUnderTest.apply(commandB);
      unitUnderTest.apply(commandC);
      unitUnderTest.undoLast();
      unitUnderTest.undoLast();
      unitUnderTest.reapplyPrevious();
      unitUnderTest.apply(commandD);

      unitUnderTest.reapplyPrevious();

      const expectedState: StubState = { a: 1, b: 1, c: 0, d: 1 };
      expect(state).deep.equals(expectedState);
    });
  });
  // TODO: #getCurrentState
});
