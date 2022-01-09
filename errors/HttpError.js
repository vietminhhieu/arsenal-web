const httpResponseCode = require("../common/constants");

class HttpError extends Error {
  messageKey;
  statusCode;

  constructor(message = httpResponseCode[544]) {
    super();
    Object.setPrototypeOf(this, HttpError.prototype);
    this.name = this.constructor.name;
    this.message = message;
  }
}

module.exports = HttpError;
