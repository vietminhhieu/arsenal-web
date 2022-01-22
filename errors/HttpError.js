const httpResponseCode = require("../common/constants");

class HttpError extends Error {
  statusCode;

  constructor(messageErr = httpResponseCode[544]) {
    super();
    Object.setPrototypeOf(this, HttpError.prototype);
    this.name = this.constructor.name;
    this.message = messageErr;
    this.statusCode = 544;
  }
}

module.exports = HttpError;
