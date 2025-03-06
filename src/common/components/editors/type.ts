import { BorderState } from '../../../AppState/State/BorderState';
import { FontState } from '../../../AppState/State/FontState';

export type FontStateChangeEvent = CustomEvent<FontState>;
export type FontFamilyChangeEvent = CustomEvent<string>;
export type BorderStateChangeEvent = CustomEvent<BorderState>;
