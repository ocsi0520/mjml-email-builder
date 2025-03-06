export type RawGoogleFontItem = {
  family: string;
  variants: Array<string>;
  subsets: Array<string>;
  version: string;
  lastModified: string; // a date string i.e. "2022-09-22"
  // the keys are fontweight (100, regular, 400italic, 700)
  // the values are urls to ttf files
  files: Record<string, string>;
  category: string;
  kind: string; // always "webfonts#webfont"
  menu: string; // url to the basic ttf file
};

export type RawGoogleFont = {
  kind: string;
  items: Array<RawGoogleFontItem>;
};

export type GoogleFont = {
  family: RawGoogleFontItem['family'];
  category: RawGoogleFontItem['category'];
};
