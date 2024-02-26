const replaceParagraphs = (md: string): string => {
  const lines = md.split('\n');
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

const convertMdToHTML = (md: string): string => {
  let html = md;

  html = replaceParagraphs(html);

  html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

  html = html.replace(/_(.*?)_/g, '<i>$1</i>');

  html = html.replace(/`(.*?)`/g, '<tt>$1</tt>');

  html = html.replace(/```(.*?)```/gs, '<pre>$1</pre>');

  return html;
}

export default convertMdToHTML;


