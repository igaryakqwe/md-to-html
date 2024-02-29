let errorMessage = '';
let isInsidePreformattedBlock = false;

const convertBold = (md: string): string => {
  const lines = md.split('\n');
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    const isBold = trimmedLine.startsWith('**') && trimmedLine.endsWith('**');
    const includesSpaces = trimmedLine.includes('** ') || trimmedLine.includes(' **');

    if (isBold && !includesSpaces) {
      return `<b>${line.slice(2, line.length - 3)}</b>`;
    }

    if (trimmedLine.startsWith('**') && !trimmedLine.endsWith('**')) {
      errorMessage += `In the line ${index + 1} the bold tag is not closed\n`;
    }

    if (includesSpaces) {
      errorMessage += `In the line ${index + 1}, mustn't be spaces near **.\n`;
    }

    return line;
  }).join('\n');
};


const convertItalic = (md: string): string => {
  const lines = md.split('\n');
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    const isItalic = trimmedLine.startsWith('_') && trimmedLine.endsWith('_');
    const includesSpaces = trimmedLine.includes('_ ') || trimmedLine.includes(' _');

    if (isItalic && !includesSpaces) {
      return `<i>${line.slice(1, line.length - 2)}</i>`;
    }

    if (trimmedLine.startsWith('_') && !trimmedLine.endsWith('_')) {
      errorMessage += `In the line ${index + 1} the italic tag is not closed\n`;
    }

    if (includesSpaces) {
      errorMessage += `In the line ${index + 1}, mustn't be spaces near _.\n`;
    }

    return line;
  }).join('\n');
}

const convertMonospaced = (md: string): string => {
  const lines = md.split('\n');
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    const isMonospaced =
      trimmedLine.startsWith('`')
      && trimmedLine.endsWith('`')
      && !trimmedLine.includes('```');
    const includesSpaces = trimmedLine.includes('` ') || trimmedLine.includes(' `');

    if (isMonospaced && !includesSpaces) {
      return `<tt>${line.slice(1, line.length - 2)}</tt>`;
    }

    if (trimmedLine.startsWith('`') && !trimmedLine.endsWith('`') && isMonospaced) {
      errorMessage += `In the line ${index + 1} the monospaced tag is not closed\n`;
    }

    if (includesSpaces) {
      errorMessage += `In the line ${index + 1}, mustn't be spaces near \`.\n`;
    }

    return line;
  }).join('\n');
}

const convertPreformatted = (md: string): string => {
  const lines = md.split('\n');
  let preformattedContent = '';


  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    const isPreformatted = trimmedLine.startsWith('```') && trimmedLine.endsWith('```');

    if (trimmedLine.includes('```') && trimmedLine[3]) {
      errorMessage += `In the line ${index + 1}, mustn't be spaces near \`\`\`.\n`;
    }

    if (isInsidePreformattedBlock) {
      if (trimmedLine === '```') {
        isInsidePreformattedBlock = false;
        preformattedContent += '</pre>\n';
      } else {
        preformattedContent += '  ' +  line + '\n';
      }


    } else if (isPreformatted) {
      isInsidePreformattedBlock = true;
      preformattedContent += '<pre>\n';
    }
  });

  return md.replace(/```[\s\S]*?```/g, preformattedContent);
}


const convertParagraph = (md: string): string => {
  const lines = md.split('\n');
  return lines.map((line) => {
    const trimmedLine = line.trim();
    const isBold = trimmedLine.includes('<b>');
    const isItalic = trimmedLine.includes('<i>');
    const isPreformatted = trimmedLine.includes('<tt>');
    const isMonospaced = trimmedLine.includes('<pre>');
    const isEmpty = line.trim() !== '' && !line.startsWith('\r');
    const isValid = !isBold && !isItalic && !isPreformatted && !isMonospaced && isEmpty && !isInsidePreformattedBlock;
    if (isValid) {
      return `<p>${trimmedLine}</p>`;
    }
    return line;
  }).join('\n')
}


const convertMdToHTML = (md: string): string => {
  let html = md;

  html = convertBold(html);
  html = convertItalic(html);
  html = convertMonospaced(html);
  html = convertPreformatted(html);
  html = convertParagraph(html);

  if (errorMessage) {
    return errorMessage;
  }

  return html;
}

export default convertMdToHTML;
