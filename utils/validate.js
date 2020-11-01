const validator = require("validator");

module.exports = {
  isNumber: (data) => {
    if (validator.isNumeric(data)) {
      return true;
    }
    return false;
  },
  isNotEmpty: (data) => {
    if (!validator.isEmpty(data)) {
      return true;
    }
    return false;
  },
  isEmail: (data) => {
    if (validator.isEmail(data)) {
      return true;
    }
    return false;
  },
};
