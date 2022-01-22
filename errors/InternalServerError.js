const httpResponseCode = require("../common/constants");
const HttpError = require("./httpError");

class InternalServerError extends HttpError {
  constructor(messageErr = httpResponseCode[500]) {
    super(messageErr);
    Object.setPrototypeOf(this, InternalServerError.prototype);
    this.name = this.constructor.name;
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
