export interface RevertableCommand {
  execute(): void;
  undo(): void;
  isExecutable(): boolean;
}
