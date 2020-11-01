const yargs = require("yargs");
const chalk = require("chalk");
const { log } = console;
const fileSystem = require("./utils/fileSystem");
const validate = require("./utils/validate");

const destinationPath = "./result/jsonNote.json";
const forConvertingPath = "./result/textNote.txt";

// console.log always be required without any export
log(chalk.bgRed(`"node jsonNoteModel.js --help" to show all command \n`));

yargs.command({
  command: "addJsonNote",
  describe: "Add a new JSON note",
  builder: {
    age: {
      describe: "Student's age",
      demandOption: true,
      type: "string",
    },
    name: {
      describe: "Student's name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Student's email",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    try {
      if (
        validate.isNumber(argv.age) &&
        validate.isNotEmpty(argv.name) &&
        validate.isEmail(argv.email)
      ) {
        const data = [{ age: argv.age, name: argv.name, email: argv.email }];
        const jsonData = JSON.stringify(data);

        if (fileSystem.writeFile(destinationPath, jsonData)) {
          log(chalk.green.italic("Writing the JSON note is done"));
        }
      } else {
        // console.log( validate.isNumber(argv.age));
        // console.log( validate.isNotEmpty(argv.name));
        // console.log( validate.isEmail(argv.email));
        throw new Error("age, name or email is invalid");
      }
    } catch (error) {
      log(chalk.red.italic(error.message));
    }
  },
});

yargs.command({
  command: "modifyJsonNote",
  describe: "Modify an existing JSON note",
  builder: {
    age: {
      describe: "Student's age",
      demandOption: true,
      type: "string",
    },
    name: {
      describe: "Student's name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Student's email",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    try {
      let data = [];
      if (fileSystem.checkPath(destinationPath)) {
        const jsonString = fileSystem.readFile(destinationPath);
        data = JSON.parse(jsonString);
      }

      if (
        validate.isNumber(argv.age) &&
        validate.isNotEmpty(argv.name) &&
        validate.isEmail(argv.email)
      ) {
        const object = { age: argv.age, name: argv.name, email: argv.email };
        data.push(object);
        const jsonData = JSON.stringify(data);

        if (fileSystem.writeFile(destinationPath, jsonData)) {
          log(chalk.green.italic("Modifying the JSON note is done"));
        }
      } else {
        // console.log( validate.isNumber(argv.age));
        // console.log( validate.isNotEmpty(argv.name));
        // console.log( validate.isEmail(argv.email));
        throw new Error("age, name or email is invalid");
      }
    } catch (error) {
      log(chalk.red.italic(error.message));
    }
  },
});

yargs.command({
  command: "removeJsonNote",
  describe: "Remove existing JSON note by name property",
  builder: {
    name: {
      describe: "Student's name",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    try {
      let data = [];
      if (fileSystem.checkPath(destinationPath)) {
        const jsonString = fileSystem.readFile(destinationPath);
        data = JSON.parse(jsonString);
      }

      const newData = data.filter((element) => element.name !== argv.name);
      const jsonData = JSON.stringify(newData);

      if (fileSystem.writeFile(destinationPath, jsonData)) {
        log(chalk.green.italic("Removing JSON note is done"));
      }
    } catch (error) {
      log(chalk.red.italic(error.message));
    }
  },
});

yargs.command({
  command: "openJsonNote",
  describe: "Open an existing JSON note",
  handler: (argv) => {
    try {
      const data = fileSystem.readFile(destinationPath);
      log(chalk.yellow.italic(data));
    } catch (error) {
      log(chalk.red.italic(error.message));
    }
  },
});

yargs.command({
  command: "convertJsonToText",
  describe: `Convert JSON in ${destinationPath} to text in ${forConvertingPath}`,
  handler: (argv) => {
    try {
      const jsonString = fileSystem.readFile(destinationPath);
      if (fileSystem.modifyFile(forConvertingPath, jsonString)) {
        log(chalk.green.italic("Converting the JSON to text is done"));
      }
      const data = fileSystem.readFile(forConvertingPath);
      console.log(chalk.yellow.italic(data));
    } catch (error) {
      log(chalk.red.italic(error.message));
    }
  },
});

yargs.parse();
