let errorMessage = '';

const convertParagraph = (lines: string[]): string => {
  return lines.map((line) => {
    const isBold = line.startsWith('**');
    const isItalic = line.startsWith('_');
    const isCode = line.startsWith('```');
    const isTt = line.startsWith('`');
    const isEmpty = line.trim() !== '' && !line.startsWith('\r');
    if (!isBold && !isItalic && !isCode && !isTt && isEmpty) {
      return `<p>${line.trim()}</p>`;
    }
    return line;
  }).join('\n')
}

const convertBold = (lines: string[]): string => {
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    const isBold = trimmedLine.startsWith('**') && trimmedLine.endsWith('**')
    if (isBold) {
      return `<b>${line.slice(2, line.length - 3)}</b>`;
    } else if (trimmedLine.startsWith('**') && !trimmedLine.endsWith('**')) {
      errorMessage += `In the line ${index + 1} the bold tag is not closed\n`;
    }
    return line;
  }).join('\n')
}

const convertItalic = (lines: string[]): string => {
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    const isItalic = trimmedLine.startsWith('_') && trimmedLine.endsWith('_')
    if (isItalic) {
      return `<i>${line.slice(1, line.length - 2)}</i>`;
    } else if (trimmedLine.startsWith('_') && !trimmedLine.endsWith('_')) {
      errorMessage += `In the line ${index + 1} the italic tag is not closed\n`;
    }
    return line;
  }).join('\n')
}

const convertMdToHTML = (md: string): string => {
  let html = md;
  const lines = md.split('\n');

  html = convertParagraph(lines);

  html = convertBold(lines);

  html = convertItalic(lines);

  html = html.replace(/`(.*?)`/g, '<tt>$1</tt>');

  html = html.replace(/```(.*?)```/gs, '<pre>$1</pre>');

  if (errorMessage) {
    return errorMessage;
  }

  return html;
}

export default convertMdToHTML;
