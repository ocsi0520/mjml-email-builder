export const views = ['phone', 'tablet', 'desktop'] as const;
export type View = (typeof views)[number];
export const previewStates = ['none', ...views] as const;
export type Preview = (typeof previewStates)[number];
