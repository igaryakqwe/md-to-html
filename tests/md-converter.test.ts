import MarkdownConverter from "../src/MarkdownConverter";
import { testCases, errorTestCases } from "../src/constants";

describe('Test MarkdownConverter', () => {
  test ('test MD to HTML', () => {
    testCases.forEach((testCase) => {
      const converter = new MarkdownConverter('html');
      expect(converter.convert(testCase.input)).toBe(testCase.expected.html);
    });
  });
  test('test MD to ANSI', () => {
    testCases.forEach((testCase) => {
      const converter = new MarkdownConverter('ansi');
      expect(converter.convert(testCase.input)).toBe(testCase.expected.ansi);
    });
  });
  test('test converter with errors', () => {
    errorTestCases.forEach((testCase) => {
      const converter = new MarkdownConverter('html');
      expect(converter.convert(testCase.input)).toBe(testCase.expected);
    });
  });
});

