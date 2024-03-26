import * as path from "path";
import fileReader from "./fileReader";
import * as fs from "fs";
import {Convertations, ConvertFormat} from "./types";

const currentDirectory = process.cwd();

const args = process.argv.slice(2);
let outputPath: string | undefined = undefined;
let format: ConvertFormat | '' = '';

if (args.includes("--out")) {
  const nextArgIndex = args.indexOf("--out") + 1
  if (!args[nextArgIndex].includes('--')) {
    outputPath = args[nextArgIndex];
  }
}

const formatIndex = args.findIndex(arg => arg.startsWith('--format='));
if (formatIndex !== -1) {
  format = args[formatIndex].slice(9) as ConvertFormat;
}

const filePath = args[0];

if (!filePath) {
  process.exit(1);
}

const absoluteOutputPath = path.join(currentDirectory, outputPath as string);
const { html, ansi } = fileReader(filePath) as Convertations<string>;

if (!format) {
  console.log(ansi);
  if (outputPath) {
    fs.writeFileSync(absoluteOutputPath, html);
  }
} else {
  console.log(format === 'html' ? html : ansi);
  if (outputPath) {
    if (outputPath) {
      fs.writeFileSync(absoluteOutputPath, format === 'html' ? html : ansi);
    }
  }
}




