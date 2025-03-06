export interface OutgoingEventMap {
  'send-app-state': CustomEvent<string>;
  'send-email-info': CustomEvent<{
    serializedState: string;
    compiledHTML: string;
  }>;
  'exit-event': CustomEvent<null>;
}
