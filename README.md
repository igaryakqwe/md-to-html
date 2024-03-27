# The application for converting a given Markdown file to HTML and ANSI encoded text

We can run this application and write the pass to the file, and we will see result in the console. Also, we can write this result into the file.

## Installation

Firstly, we need to install the required packages. We can do this by running the following command:

```shell
npm install
```

## Usage

Then you can run the application by running the following command:

### This command will output in console the ANSI encoded result
```shell
npm start <path-to-file>
```

and if you should write the result into the file, you can run the following command:

### This command will output in console the ANSI encoded result, and create file with HTML markup 
```shell
npm start <path-to-file> -- --out <name-of-result-file>
```
pay attention to the double dash `--` before `--out`, it is necessary to separate the arguments for the application and the arguments for the script.

### This command will output in console the ANSI encoded result, and create file with HTML markup, but you can choose the format of the output result
```shell
npm start <path-to-file> -- --out <name-of-result-file> --format=<html | ansi>
```

### This command runs tests for the application
```shell
npm test
```

### Pointer to commit with failed tests: <a href="https://github.com/igaryakqwe/md-to-html/pull/1/commits/cc21f85d55f3e22f721adcea4ad1b001744812ad">Commit</a>

## Conclusion

Особисто для мене ця лабораторна робота була досить корисною. Я навчився 
покривати тестами свій код, а також деплоїти застосунки. Для мене це досить 
важливо, так як я займаю посаду тімліда фронтенду і планую в майбутньому
робити зі своєю командою покриття тестами застосунку. Також під час роботи
зіткнувся з деякими проблеми при використанні тайпскрипту, проте гугл все 
вирішує :)
