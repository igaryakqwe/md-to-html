import * as path from "path";
import fileReader from "./fileReader";
import * as fs from "fs";

const currentDirectory = process.cwd();

const args = process.argv.slice(2);
let outputPath: string | undefined = undefined;

if (args.length === 2) {
  outputPath = args[1];
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


