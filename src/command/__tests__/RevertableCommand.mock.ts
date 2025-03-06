import { mockMethod } from '../../__tests__/helpers/method.mock';
import { RevertableCommand } from '../RevertableCommand';

export class MockRevertableCommand<DummyKey extends string = string>
  implements RevertableCommand
{
  public stubIsExectuable = true;
  public execute = mockMethod<RevertableCommand['execute']>(() => {
    this.state[this.dummyKey]++;
  });
  public undo = mockMethod<RevertableCommand['undo']>(() => {
    this.state[this.dummyKey]--;
  });
  public isExecutable = mockMethod<RevertableCommand['isExecutable']>(
    () => this.stubIsExectuable
  );
  constructor(
    private dummyKey: DummyKey,
    private state: Record<DummyKey, number>
  ) {}
}
