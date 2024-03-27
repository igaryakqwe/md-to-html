import * as fs from "fs";
import MarkdownConverter from "./MarkdownConverter";
import { Convertations } from "./types";

const readFile = (filePath: string): Convertations<string> | undefined => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");

    if (!filePath.endsWith(".md")) {
      console.error("This is not a markdown file");
      return;
    }
    return {
      html: new MarkdownConverter("html").convert(data),
      ansi: new MarkdownConverter("ansi").convert(data),
    };
  } catch (err) {
    console.error("File or path not found or cannot be read:", err);
    return;
  }
}

export default readFile;
