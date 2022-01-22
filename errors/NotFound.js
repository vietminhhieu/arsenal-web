const httpResponseCode = require("../common/constants");
const HttpError = require("./httpError");

class NotFound extends HttpError {
  constructor(messageErr = httpResponseCode[404]) {
    super(messageErr);
    Object.setPrototypeOf(this, NotFound.prototype);
    this.name = this.constructor.name;
    this.statusCode = 404;
  }
}

module.exports = NotFound;
