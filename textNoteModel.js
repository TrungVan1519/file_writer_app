const yargs = require("yargs");
const chalk = require("chalk");
const { log } = console;
const fileSystem = require("./utils/fileSystem");

const destinationPath = "./result/textNote.txt";

// console.log always be required without any export
log(chalk.bgBlue(`"node textNoteModel.js --help" to show all command\n`));

yargs.command({
  command: "addTextNote",
  describe: "Add a new text note",
  builder: {
    title: {
      describe: "Text note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Text note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    try {
      const data = `${argv.title} \n${argv.body}`;
      if (fileSystem.writeFile(destinationPath, data)) {
        log(chalk.green.italic("Writing the text note is done"));
      }
    } catch (error) {
      log(chalk.red.italic(error.message));
    }
  },
});

yargs.command({
  command: "modifyTextNote",
  describe: "Modify an existing text note",
  builder: {
    title: {
      describe: "Text note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Text note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    try {
      const data = `${argv.title} \n${argv.body}`;
      if (fileSystem.modifyFile(destinationPath, data)) {
        log(chalk.green.italic("Modifying the text note is done"));
      }
    } catch (error) {
      log(chalk.red.italic(error.message));
    }
  },
});

yargs.command({
  command: "openTextNote",
  describe: "Open an existing text note",
  handler: (argv) => {
    try {
      const data = fileSystem.readFile(destinationPath);
      log(chalk.yellow.italic(data));
    } catch (error) {
      log(chalk.red.italic(error.message));
    }
  },
});

yargs.parse();
