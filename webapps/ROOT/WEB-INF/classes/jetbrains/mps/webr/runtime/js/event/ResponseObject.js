Webr.event.ResponseObject = function (xmlHttpRequest) {
  this.status = xmlHttpRequest.status;
  this.statusText = xmlHttpRequest.statusText;
  this.responseText = xmlHttpRequest.responseText;
  this.responseXML = xmlHttpRequest.responseXML;
};
Webr.event.ExceptionObject = function (aborted, timeout) {
  if (timeout) {
    this.status = Webr.event.ExceptionObject.TIMEOUT_ERROR_CODE;
    this.statusText = Webr.event.ExceptionObject.TIMEOUT_ERROR_TEXT;
  } else {
    if (aborted) {
      this.status = Webr.event.ExceptionObject.ABORT_ERROR_CODE;
      this.statusText = Webr.event.ExceptionObject.ABORT_ERROR_TEXT;
    } else {
      this.status = Webr.event.ExceptionObject.COMMUNICATION_ERROR_CODE;
      this.statusText = Webr.event.ExceptionObject.COMMUNICATION_ERROR_TEXT;
    }

  }

};
Webr.event.ExceptionObject.prototype.isAborted = function () {
  return this.status == Webr.event.ExceptionObject.ABORT_ERROR_CODE;
};
Webr.event.ExceptionObject.prototype.isTimeout = function () {
  return this.status == Webr.event.ExceptionObject.TIMEOUT_ERROR_CODE;
};
Webr.event.ExceptionObject.prototype.isCommunication = function () {
  return this.status == Webr.event.ExceptionObject.COMMUNICATION_ERROR_CODE;
};
Webr.event.ExceptionObject.COMMUNICATION_ERROR_CODE = 0;
Webr.event.ExceptionObject.COMMUNICATION_ERROR_TEXT = "Communication failure";
Webr.event.ExceptionObject.ABORT_ERROR_CODE = -1;
Webr.event.ExceptionObject.ABORT_ERROR_TEXT = "Transaction aborted";
Webr.event.ExceptionObject.TIMEOUT_ERROR_CODE = -2;
Webr.event.ExceptionObject.TIMEOUT_ERROR_TEXT = "Transaction timed out";
