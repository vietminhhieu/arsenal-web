const httpResponseCode = require("../common/constants");
const HttpError = require("./HttpError");

class Unauthorized extends HttpError {
  constructor(messageErr = httpResponseCode[401]) {
    super(messageErr);
    Object.setPrototypeOf(this, Unauthorized.prototype);
    this.name = this.constructor.name;
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
