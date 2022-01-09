const httpResponseCode = require("../common/constants");
const HttpError = require("./httpError");

class InternalServerError extends HttpError {
  constructor(message = httpResponseCode[500]) {
    super(message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
    this.name = this.constructor.name;
    this.statusCode = 500;
  }
}

module.exports = InternalServerError;
