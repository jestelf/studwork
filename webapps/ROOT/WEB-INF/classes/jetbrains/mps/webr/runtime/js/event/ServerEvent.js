Webr.event.ServerEvent = function (config) {
  this.config = config;
  this.config.pollInterval = this.config.pollInterval || Webr.event.ServerEvent.DEFAULT_POLL_INTERVAL;
};
Webr.event.ServerEvent.prototype.send = function () {
  var headers = {"X-Requested-With": "XMLHttpRequest", "Content-Type": "application/x-www-form-urlencoded"};
  this.xmlHttpRequest = this.newXmlHttpRequest();
  this.xmlHttpRequest.open("POST", this.config.handlerUrl, !this.config.sync);
  for ( var headerName in headers) {
    this.xmlHttpRequest.setRequestHeader(headerName, headers[headerName]);
  }

  this.setupPollingAndTimeout();
  var parameters = this.getParameters();
  this.xmlHttpRequest.send(parameters);
};
Webr.event.ServerEvent.prototype.abort = function (isTimeout) {
  var aborted = false;
  if (this.inProgress()) {
    this.xmlHttpRequest.abort();
    this.clearPollingAndTimeout();
    this.handleResponse(true, isTimeout);
    aborted = true;
  }

  return aborted;
};
Webr.event.ServerEvent.prototype.inProgress = function () {
  var inProgress = false;
  if (this.xmlHttpRequest) {
    var state = this.xmlHttpRequest.readyState;
    inProgress = state != 4 && state != 0;
  }

  return inProgress;
};
Webr.event.ServerEvent.prototype.fireSuccess = function (response) {
  if (this.config.listeners) {
    for (var i = 0; i < this.config.listeners.length; ++i) {
      var listener = this.config.listeners[i];
      listener.onSuccess(this, response);
    }

  }

};
Webr.event.ServerEvent.prototype.fireFailure = function (response) {
  if (this.config.listeners) {
    for (var i = 0; i < this.config.listeners.length; ++i) {
      var listener = this.config.listeners[i];
      listener.onFailure(this, response);
    }

  }

};
Webr.event.ServerEvent.prototype.fireException = function (exception) {
  if (this.config.listeners) {
    for (var i = 0; i < this.config.listeners.length; ++i) {
      var listener = this.config.listeners[i];
      listener.onException(this, exception);
    }

  }

};
Webr.event.ServerEvent.prototype.firePoll = function (pollNumber) {
  if (this.config.listeners) {
    for (var i = 0; i < this.config.listeners.length; ++i) {
      var listener = this.config.listeners[i];
      listener.onPoll(this, pollNumber);
    }

  }

};
Webr.event.ServerEvent.prototype.getParameters = function () {
  var paramBuilder = new Webr.event.ParamBuilder();
  //Add parameter that indicates that request was initiated by XMLHttpRequest
  paramBuilder.addParamPair("X-Requested-With", "XMLHttpRequest");
  paramBuilder.addParamPair("http_session_id", Webr.Event.sessionId);
  if (this.config.eventSource) {
    paramBuilder.addParamPair("event_source", this.config.eventSource);
  }

  if (this.config.eventName) {
    paramBuilder.addParamPair("event_", this.config.eventName);
  }

  //Collect form input values from the document
  if (this.config.collectFormElements) {
    var inputCollector = new Webr.event.InputCollector(this.config.rootElement);
    inputCollector.collect(paramBuilder);
    delete inputCollector;
  }

  //Add additional user specified parameters
  if (this.config.eventParameters) {
    paramBuilder.addParamObject(this.config.eventParameters);
  }

  var paramString = paramBuilder.toParameterString();
  delete paramBuilder;
  if (this.config.eventParametersAsString) {
    paramString = paramString + this.config.eventParametersAsString;
  }

  return paramString;
};
Webr.event.ServerEvent.prototype.newXmlHttpRequest = function () {
  var xmlHttpRequest = null;
  try {
    xmlHttpRequest = new XMLHttpRequest();
  } catch (e) {
    for (var i = 0; i < Webr.event.ServerEvent.IE_ACTIVE_X.length; ++i) {
      var activeXName = Webr.event.ServerEvent.IE_ACTIVE_X[i];
      try {
        xmlHttpRequest = new ActiveXObject(activeXName);
                break;

      } catch (e2) {
        //Skip and go to next
      }

    }

  }

  return xmlHttpRequest;
};
Webr.event.ServerEvent.prototype.releaseXmlHttpRequest = function () {
  delete this.xmlHttpRequest;
  this.xmlHttpRequest = null;
};
Webr.event.ServerEvent.prototype.setupPollingAndTimeout = function () {
  var serverEvent = this;
  if (this.config.timeout != null) {
    this.timeoutHandle = window.setTimeout(function () {
      serverEvent.abort(true);
    }, this.config.timeout);
  }

  var pollNumber = 0;
  this.pollHandle = window.setInterval(function () {
    if (serverEvent.xmlHttpRequest && serverEvent.xmlHttpRequest.readyState == 4) {
      serverEvent.clearPollingAndTimeout();
      serverEvent.handleResponse(false, false);
    } else {
      serverEvent.firePoll(++pollNumber);
    }

  }, this.config.pollInterval);
};
Webr.event.ServerEvent.prototype.clearPollingAndTimeout = function (timeout) {
  if (this.pollHandle != null) {
    window.clearInterval(this.pollHandle);
    delete this.pollHandle;
  }

  if (this.timeoutHandle != null) {
    if (!timeout) {
      window.clearTimeout(this.timeoutHandle);
    }

    delete this.timeoutHandle;
  }

};
Webr.event.ServerEvent.prototype.handleResponse = function (aborted, timeout) {
  if (!aborted) {
    var httpStatus;
    try {
      if (this.xmlHttpRequest.status !== undefined && this.xmlHttpRequest.status != 0) {
        httpStatus = this.xmlHttpRequest.status;
      } else {
        httpStatus = Webr.event.ServerEvent.STATE_ERROR;
      }

    } catch (e) {
      httpStatus = Webr.event.ServerEvent.STATE_ERROR;
    }

    if (httpStatus >= 200 && httpStatus < 300) {
      var responseObject = new Webr.event.ResponseObject(this.xmlHttpRequest);
      this.fireSuccess(responseObject);
    } else {
      var exceptionCodes = Webr.event.ServerEvent.EXCEPTION_CODES;
      var isException = false;
      for (var i = 0; i < exceptionCodes.length; ++i) {
        if (httpStatus == exceptionCodes[i]) {
          isException = true;
                    break;

        }

      }

      if (isException) {
        var exceptionObject = new Webr.event.ExceptionObject(aborted, timeout);
        this.fireException(exceptionObject);
      } else {
        var responseObject = new Webr.event.ResponseObject(this.xmlHttpRequest);
        this.fireFailure(responseObject);
      }

    }

  } else {
    var exceptionObject = new Webr.event.ExceptionObject(aborted, timeout);
    this.fireException(exceptionObject);
  }

  this.releaseXmlHttpRequest();
};
Webr.event.ServerEvent.prototype.getHttpStatus = function () {
  var httpStatus;
  try {
    if (this.xmlHttpRequest.status !== undefined && this.xmlHttpRequest.status != 0) {
      httpStatus = this.xmlHttpRequest.status;
    } else {
      httpStatus = Webr.event.ServerEvent.STATE_ERROR;
    }

  } catch (e) {
    httpStatus = Webr.event.ServerEvent.STATE_ERROR;
  }

  return httpStatus;
};
Webr.event.ServerEvent.IE_ACTIVE_X = ["MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
Webr.event.ServerEvent.DEFAULT_POLL_INTERVAL = 50;
Webr.event.ServerEvent.STATE_ERROR = 13030;
Webr.event.ServerEvent.EXCEPTION_CODES = [12002, 12029, 12030, 12031, 12152, 13030];
Webr.event.ServerEventConfig = function () {
  this.rootElement = document.body;
  this.collectFormElements = false;
  this.collectFileElements = false;
  this.timeout = null;
  this.sync = false;
  this.preventDoubleSubmit = false;
  this.processRecentOnly = false;
  this.pollInterval = Webr.event.ServerEvent.DEFAULT_POLL_INTERVAL;
};
Webr.event.ServerEventConfig.createCopy = function (baseConfig, defaultConfig) {
  var config = {};
  if (defaultConfig != null) {
    for ( var p in defaultConfig) {
      config[p] = defaultConfig[p];
    }

  }

  if (baseConfig != null) {
    for ( var p in baseConfig) {
      config[p] = baseConfig[p];
    }

  }

  return config;
};
Webr.event.ServerEventListener = function () {
};
Webr.event.ServerEventListener.prototype.onSuccess = function (event, response) {
  this.onFinish(event, true);
};
Webr.event.ServerEventListener.prototype.onFailure = function (event, response) {
  this.onFinish(event, false);
};
Webr.event.ServerEventListener.prototype.onException = function (event, exception) {
  this.onFinish(event, false, exception);
};
Webr.event.ServerEventListener.prototype.onFinish = function (event, success, exception) {
};
Webr.event.ServerEventListener.prototype.onPoll = function (event, pollNumber) {
};
