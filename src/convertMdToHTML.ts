class MarkdownConverter {
  private errorMessage: string = '';

  private convertBold(md: string): string {
    const lines = md.split('\n');
    let isPreformatted = false;
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      const isBold = trimmedLine.startsWith('**') && trimmedLine.endsWith('**');
      const includesSpaces = trimmedLine.includes('** ') || trimmedLine.includes(' **');

      if (trimmedLine.includes('<pre>')) {
        isPreformatted = true;
      }

      if (trimmedLine.includes('</pre>')) {
        isPreformatted = false;
      }

      if (isBold && !includesSpaces && isPreformatted) {
        return `<b>${line.slice(2, line.length - 3)}</b>`;
      }

      if (trimmedLine.startsWith('**') && !trimmedLine.endsWith('**')) {
        this.errorMessage += `In the line ${index + 1}, the bold tag is not closed\n`;
      }

      if (includesSpaces) {
        this.errorMessage += `In the line ${index + 1}, there mustn't be spaces near **.\n`;
      }

      return line;
    }).join('\n');
  }

  private convertItalic(md: string): string {
    const lines = md.split('\n');
    let isPreformatted = false;
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      const isItalic = trimmedLine.startsWith('_') && trimmedLine.endsWith('_');
      const includesSpaces = trimmedLine.includes('_ ') || trimmedLine.includes(' _');

      if (trimmedLine.includes('<pre>')) {
        isPreformatted = true;
      }

      if (trimmedLine.includes('</pre>')) {
        isPreformatted = false;
      }

      if (isItalic && !includesSpaces && isPreformatted) {
        return `<i>${line.slice(1, line.length - 2)}</i>`;
      }

      if (trimmedLine.startsWith('_') && !trimmedLine.endsWith('_')) {
        this.errorMessage += `In the line ${index + 1}, the italic tag is not closed\n`;
      }

      if (includesSpaces) {
        this.errorMessage += `In the line ${index + 1}, there mustn't be spaces near _.\n`;
      }

      return line;
    }).join('\n');
  }

  private convertMonospaced(md: string): string {
    const lines = md.split('\n');
    let isPreformatted = false;
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      const isMonospaced =
        trimmedLine.startsWith('`')
        && trimmedLine.endsWith('`')
        && !trimmedLine.includes('```');
      const includesSpaces = trimmedLine.includes('` ') || trimmedLine.includes(' `');

      if (trimmedLine.includes('<pre>')) {
        isPreformatted = true;
      }

      if (trimmedLine.includes('</pre>')) {
        isPreformatted = false;
      }

      if (isMonospaced && !includesSpaces && isPreformatted) {
        return `<tt>${line.slice(1, line.length - 2)}</tt>`;
      }

      if (trimmedLine.startsWith('`') && !trimmedLine.endsWith('`') && isMonospaced) {
        this.errorMessage += `In the line ${index + 1}, the monospaced tag is not closed\n`;
      }

      if (includesSpaces) {
        this.errorMessage += `In the line ${index + 1}, there mustn't be spaces near \`.\n`;
      }

      return line;
    }).join('\n');
  }

  private convertPreformatted(md: string): string {
    const lines = md.split('\n');
    let isInsidePreformattedBlock = false;
    let preformattedContent = '';

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      const isPreformatted = trimmedLine.startsWith('```') && trimmedLine.endsWith('```');

      if (trimmedLine.includes('```') && trimmedLine[3]) {
        this.errorMessage += `In the line ${index + 1}, there mustn't be spaces near \`\`\`.\n`;
      }

      if (isInsidePreformattedBlock) {
        if (trimmedLine === '```') {
          isInsidePreformattedBlock = false;
          preformattedContent += '</pre>\n';
        } else {
          preformattedContent += '  ' + line + '\n';
        }
      } else if (isPreformatted) {
        isInsidePreformattedBlock = true;
        preformattedContent += '<pre>\n';
      }
    });

    return md.replace(/```[\s\S]*?```/g, preformattedContent);
  }

  private convertParagraph(md: string): string {
    const lines = md.split('\n');
    let isPre = false;
    let paragraph = '';
    let result = '';

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      const isBold = trimmedLine.includes('<b>');
      const isItalic = trimmedLine.includes('<i>');
      const isPreformatted = trimmedLine.includes('<tt>');
      const isMonospaced = trimmedLine.includes('<pre>') || trimmedLine.includes('</pre>')
      const isEmpty = line.trim() !== '' && !line.startsWith('\r');

      if (trimmedLine.includes('<pre>')) {
        isPre = true;
      }

      if (trimmedLine.includes('</pre>')) {
        isPre = false;
      }

      const isValid =
        !isBold &&
        !isItalic &&
        !isPreformatted &&
        !isMonospaced &&
        isEmpty &&
        !isPre;

      if (isValid) {
        paragraph += `${trimmedLine} `;
      } else {
        if (paragraph.trim() !== '') {
          result += `<p>${paragraph.trim()}</p>`;
          paragraph = '';
        }
        result += `${trimmedLine}\n`;
      }
    });

    return result;
  }


  public convertMdToHTML(md: string): string {
    let html = md;

    html = this.convertBold(html);
    html = this.convertItalic(html);
    html = this.convertMonospaced(html);
    html = this.convertPreformatted(html);
    html = this.convertParagraph(html);

    if (this.errorMessage) {
      return this.errorMessage;
    }

    return html;
  }
}

export default new MarkdownConverter;
