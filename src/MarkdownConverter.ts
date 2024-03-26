import { ConvertFormat } from "./types";
import { convertations } from "./constants";

class MarkdownConverter {
  private errorMessage: string = '';
  constructor(private format: ConvertFormat = 'html') {}
  private currentFormat = convertations[this.format];

  private checkErrors(md: string): void {
    const lines = md.split('\n');
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      const isMultipleTags = trimmedLine.includes('**') && trimmedLine.includes('_') && trimmedLine.includes('`');
      if (isMultipleTags) {
        this.errorMessage += `In the line ${index + 1}, there are bold, italic and monospaced tags together\n`;
        return
      }
    });
  }

  private convertBold(md: string): string {
    const lines = md.split('\n');
    let isPreformatted = false;
    const open = this.currentFormat.bold.open;
    const close = this.currentFormat.bold.close;
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      const isBold = trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine !== '**'
      const includesSpaces = trimmedLine.includes('** ') || trimmedLine.includes(' **');

      if (trimmedLine.includes(this.currentFormat.preformatted.open)) {
        isPreformatted = true;
      }

      if (trimmedLine.includes(this.currentFormat.preformatted.close)) {
        isPreformatted = false;
      }

      if (isBold && !includesSpaces && !isPreformatted) {
        return `${open}${line.slice(2, line.length - 3)}${close}`;
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
    const open = this.currentFormat.italic.open;
    const close = this.currentFormat.italic.close;
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      const isItalic = trimmedLine.startsWith('_') && trimmedLine.endsWith('_') && trimmedLine !== '_';
      const includesSpaces = trimmedLine.includes('_ ') || trimmedLine.includes(' _');

      if (trimmedLine.includes(this.currentFormat.preformatted.open)) {
        isPreformatted = true;
      }

      if (trimmedLine.includes(this.currentFormat.preformatted.close)) {
        isPreformatted = false;
      }

      if (isItalic && !includesSpaces && !isPreformatted) {
        return `${open}${line.slice(1, line.length - 2)}${close}`;
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
    const open = this.currentFormat.monospaced.open;
    const close = this.currentFormat.monospaced.close;
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      const isMonospaced =
        trimmedLine.startsWith('`')
        && trimmedLine.endsWith('`')
        && !trimmedLine.includes('```')
        && trimmedLine !== '`';
      const includesSpaces = trimmedLine.includes('` ') || trimmedLine.includes(' `');

      if (trimmedLine.includes(this.currentFormat.preformatted.open)) {
        isPreformatted = true;
      }

      if (trimmedLine.includes(this.currentFormat.preformatted.close)) {
        isPreformatted = false;
      }

      if (isMonospaced && !includesSpaces && !isPreformatted) {
        return `${open}${line.slice(1, line.length - 2)}${close}`;
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
    const open = this.currentFormat.preformatted.open;
    const close = this.currentFormat.preformatted.close;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      const isPreformatted = trimmedLine.startsWith('```') && trimmedLine.endsWith('```');

      if (trimmedLine.includes('```') && trimmedLine[3]) {
        this.errorMessage += `In the line ${index + 1}, there mustn't be spaces near \`\`\`.\n`;
      }

      if (isInsidePreformattedBlock) {
        if (trimmedLine === '```') {
          isInsidePreformattedBlock = false;
          preformattedContent += `${close}\n`;
        } else {
          preformattedContent += '  ' + line + '\n';
        }
      } else if (isPreformatted) {
        isInsidePreformattedBlock = true;
        preformattedContent += `${open}\n`;
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
      const open = this.currentFormat.paragraph.open;
      const close = this.currentFormat.paragraph.close;

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
          result += `${open + paragraph.trim() + close}`;
          paragraph = '';
        }
        result += `${trimmedLine}\n`;
      }
    });

    return result;
  }

  public convert(md: string): string {
    let html = md;

    this.checkErrors(md);

    html = this.convertPreformatted(html);
    html = this.convertBold(html);
    html = this.convertItalic(html);
    html = this.convertMonospaced(html);
    if (this.format === 'html') {
      html = this.convertParagraph(html);
    }

    if (this.errorMessage) {
      return this.errorMessage;
    }

    return html;
  }
}

export default MarkdownConverter;
