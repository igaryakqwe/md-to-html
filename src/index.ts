import * as path from "path";
import fileReader from "./fileReader";
import * as fs from "fs";

const currentDirectory = process.cwd();

const args = process.argv.slice(2);
let outputPath: string | undefined = undefined;

if (args.includes("--out")) {
  const nextArgIndex = args.indexOf("--out") + 1
  if (!args[nextArgIndex].includes('--')) {
    outputPath = args[nextArgIndex];
  }
}

const filePath = args[0];

if (!filePath) {
  process.exit(1);
}

const result = fileReader(filePath);
console.log(result);
if (outputPath) {
  const absoluteOutputPath = path.join(currentDirectory, outputPath);
  fs.writeFileSync(absoluteOutputPath, result);
}

