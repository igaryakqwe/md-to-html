import fileReader from "./fileReader";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Input the path to MD file: ', (path: string) => {
  fileReader(path);
  rl.close();
})
