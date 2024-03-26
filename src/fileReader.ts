import * as fs from "fs";
import MarkdownConverter from "./MarkdownConverter";

const readFile = (filePath: string): string => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");

    if (!filePath.endsWith(".md")) {
      console.error("This is not a markdown file");
      return "";
    }

    return new MarkdownConverter('ansi').convert(data);
  } catch (err) {
    console.error("File or path not found or cannot be read:", err);
    return "";
  }
}

export default readFile;
