const httpResponseCode = require("../common/constants");
const HttpError = require("./httpError");

class BadRequest extends HttpError {
  constructor(messageErr = httpResponseCode[400]) {
    super(messageErr);
    Object.setPrototypeOf(this, BadRequest.prototype);
    this.name = this.constructor.name;
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
