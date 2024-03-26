import {Convertations, ErrorTestCase, Format, TestCase} from "../types";

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

export const testCases: TestCase[] = [
  {
    input: '**bold**',
    expected: {
      html: '<b>bold</b>',
      ansi: '\x1b[1mbold\x1b[22m'
    }
  },
  {
    input: '_italic_',
    expected: {
      html: '<i>italic</i>',
      ansi: '\x1b[3mitalic\x1b[23m'
    }
  },
  {
    input: '`monospaced`',
    expected: {
      html: '<tt>monospaced</tt>',
      ansi: '\x1b[7mmonospaced\x1b[27m'
    }
  },
  {
    input: '```\npreformatted\n```',
    expected: {
      html: `<pre>\npreformatted\n</pre>`,
      ansi: `\x1B[7m\npreformatted\n\x1B[27m`
    }
  },
  {
    input: 'This is a test\n',
    expected: {
      html: '<p>This is a test</p>',
      ansi: 'This is a test'
    }
  },
  {
    input: 'This is a test\n',
    expected: {
      html: '<p>This is a test</p>',
      ansi: 'This is a test'
    }
  }
];

export const errorTestCases: ErrorTestCase[] = [
  {
    input: '**bold',
    expected: 'In the line 1, the bold tag is not closed\n'
  },
  {
    input: '_ italic_',
    expected: 'In the line 1, there mustn\'t be spaces near _.\n'
  },
  {
    input: '**_`bold`_**',
    expected: 'In the line 1, there are bold, italic and monospaced tags together\n'
  },
  {
    input: '```prefformatted```',
    expected: 'In the line 1, there mustn\'t be spaces near \`\`\`.\n'
  }
];
