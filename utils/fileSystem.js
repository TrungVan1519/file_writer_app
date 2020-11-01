const fs = require("fs");

module.exports = {
  checkPath: (path) => {
    if (fs.existsSync(path)) {
      return true;
    }
    return false;
  },
  writeFile: (path, data) => {
    try {
      fs.writeFileSync(path, data);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  modifyFile(path, data) { 
    /**
     * Have to convert to Method because Arrow Function cannot binding 'this' keyword
     * And by the way we can use this.checkPath(path) correctly
     */
    try {
      if (this.checkPath(path)) {
        fs.appendFileSync(path, `\n${data}`);
        return true;
      }
      throw new Error(`${path} does not exist`);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  readFile(path) { 
    /**
     * Have to convert to Method because Arrow Function cannot binding 'this' keyword
     * And by the way we can use this.checkPath(path) correctly
     */
    try {
      if (this.checkPath(path)) {
        const dataBuffer = fs.readFileSync(path);
        return dataBuffer.toString();
      }
      throw new Error(`${path} does not exist`);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
