import * as fs from "fs";
import MarkdownConverter from "./convertMdToHTML";

const readFile = (filePath: string): void => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error("File or path has not found");
      return;
    }
    if (!filePath.endsWith(".md")) {
      console.error("This is not a markdown file");
      return;
    }
    console.log(MarkdownConverter.convertMdToHTML(data));
  });
}

export default readFile;
