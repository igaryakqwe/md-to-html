import {Convertations, Format} from "../types";

export const convertations: Convertations<Format> = {
  html: {
    bold: {
      open: '<b>',
      close: '</b>',
    },
    italic: {
      open: '<i>',
      close: '</i>',
    },
    monospaced: {
      open: '<tt>',
      close: '</tt>',
    },
    preformatted: {
      open: '<pre>',
      close: '</pre>',
    },
    paragraph: {
      open: '<p>',
      close: '</p>',
    }
  },
  ansi: {
    bold: {
      open: '\x1b[1m',
      close: '\x1b[22m',
    },
    italic: {
      open: '\x1b[3m',
      close: '\x1b[23m',
    },
    monospaced: {
      open: '\x1b[7m',
      close: '\x1b[27m',
    },
    preformatted: {
      open: '\x1B[7m',
      close: '\x1B[27m',
    },
    paragraph: {
      open: '',
      close: '',
    }
  }
}
