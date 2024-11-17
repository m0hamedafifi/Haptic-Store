const moment = require("moment");

module.exports.dateFormat = () => {
    // return moment().format("YYYY-MM-DD HH:mm:ss")
    return moment().format("DD-MM-YYYY HH:mm:sss");
  };
  

  const randomString = require("randomstring");

  module.exports.generateImgeCode = () => {
    const img_code = randomString.generate({
      length: 7,
      charset: "alphanumeric",
      upperCase: true,
    });
    return img_code;
  };