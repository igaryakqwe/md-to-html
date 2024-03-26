export type ConvertFormat = 'html' | 'ansi';
export type ConvertType = 'bold' | 'italic' | 'monospaced' | 'preformatted' | 'paragraph';

export type Tag = {
  open: string;
  close: string;
};

export type Format = {
  bold: Tag;
  italic: Tag;
  monospaced: Tag;
  preformatted: Tag;
  paragraph: Tag;
};

export type Convertations<T> = {
  html: T;
  ansi: T;
};
