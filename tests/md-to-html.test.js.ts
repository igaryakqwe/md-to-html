import MarkdownConverter from "../src/MarkdownConverter";

test ('converts markdown to html', () => {
  expect(new MarkdownConverter('html').convert('**bold**')).toBe('<b>bold</b>');
})
