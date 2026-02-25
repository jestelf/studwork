Webr.event.UploadEvent = function (config) {
  Webr.event.UploadEvent.superclass.constructor.call(this, config);
};
{
  var F = new Function();
  F.prototype = Webr.event.ServerEvent.prototype;
  Webr.event.UploadEvent.prototype = new F();
  Webr.event.UploadEvent.prototype.constructor = Webr.event.UploadEvent;
  Webr.event.UploadEvent.superclass = Webr.event.ServerEvent.prototype;
}

Webr.event.UploadEvent.prototype.send = function () {
  var it = this;
  this.createFrame();
  this.setupPollingAndTimeout();
  this.addParameters();
  try {
    for (var i = 0; i < this.config.fileInput.length; ++i) {
      this.moveFileInput(this.config.fileInput[i]);
    }

    document.body.appendChild(this.form);
    this.form.submit();
    document.body.removeChild(this.form);
  } catch (e) {
    this.releaseFrame();
    this.clearPollingAndTimeout();
    this.fireException(new Webr.event.ExceptionObject(false, false));
  }

};
Webr.event.UploadEvent.prototype.moveFileInput = function (fileInput) {
  var clonedFileInput = fileInput.cloneNode(true);
  fileInput.parentNode.replaceChild(clonedFileInput, fileInput);
  this.form.appendChild(fileInput);
};
Webr.event.UploadEvent.prototype.abort = function (isTimeout) {
  this.releaseFrame();
  this.clearPollingAndTimeout(isTimeout);
  this.fireException(new Webr.event.ExceptionObject(true, isTimeout));
};
Webr.event.UploadEvent.prototype.addParameters = function () {
  var paramBuilder = new Webr.event.FormBuilder(this.form);
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

  delete paramBuilder;
};
Webr.event.UploadEvent.prototype.createFrame = function () {
  //Create frame
  ++Webr.event.UploadEvent.FRAME_ID_COUNTER;
  var frameId = "frame" + Webr.event.UploadEvent.FRAME_ID_COUNTER;
  this.frame = document.createElement("iframe");
  this.frame.id = frameId;
  this.frame.name = frameId;
  this.frame.style.position = "absolute";
  this.frame.style.left = "-10000px";
  this.frame.style.top = "-10000px";
  if (Webr.event.UploadEvent.IS_IE) {
    this.frame.src = "javascript:false";
  }

  document.body.appendChild(this.frame);
  if (Webr.event.UploadEvent.IS_IE) {
    document.frames[frameId].name = frameId;
  }

  //Create form
  this.form = document.createElement("form");
  this.form.target = frameId;
  this.form.method = "POST";
  this.form.enctype = this.form["encoding"] = "multipart/form-data";
  //Add parameter that indicates that request was initiated by XMLHttpRequest
  this.form.action = this.config.handlerUrl + "&X-Requested-With=XMLHttpRequest";
  //Configure onload handler
  var ue = this;
  var handler = function () {
    ue.clearPollingAndTimeout();
    ue.tryHandleAndRelease();
  };
  if (Webr.event.UploadEvent.IS_IE) {
    this.frame.attachEvent("onload", handler);
  } else {
    this.frame.addEventListener("load", handler, false);
  }

};
Webr.event.UploadEvent.prototype.tryHandleAndRelease = function () {
  var doc = this.getFrameDocument();
  if (!doc) {
    this.fireException({status: Webr.event.ExceptionObject.COMMUNICATION_ERROR_CODE, statusText: "Can't reach server or uploads are permitted. Contact your system administrator."});
    this.releaseFrame();
    return ;
  }

  var response = {status: 200, statusText: "OK", responseText: "", responseXML: null};
  var isXml;
  if (doc.body) {
    response.responseText = doc.body.innerHTML;
  }

  if (doc["XMLDocument"]) {
    response.responseXML = doc["XMLDocument"];
  } else {
    if (doc.firstChild.nodeName == "HTML") {
      //in some browsers (Opera) the iframe DOM is not always traversable when
      //the onload callback fires, so we loop a bit to accommodate 
      if (--Webr.event.UploadEvent.DOM_CHECK_COUNTER > 0) {
        var it = this;
        window.setTimeout(function () {
          it.tryHandleAndRelease();
        }, 10);
      } else {
        this.fireException(new Webr.event.ExceptionObject(true, false));
        this.releaseFrame();
      }

      return ;
    }

    response.responseXML = doc;
  }

  this.fireSuccess(response);
  this.releaseFrame();
};
Webr.event.UploadEvent.prototype.fireException = function (exception) {
  Webr.event.PopupMessage.ERROR.show(exception.statusText);
  Webr.event.UploadEvent.superclass.fireException.call(this, exception);
};
Webr.event.UploadEvent.prototype.releaseFrame = function () {
  var ue = this;
  window.setTimeout(function () {
    document.body.removeChild(ue.frame);
    ue.frame = null;
    ue.form = null;
  }, 100);
};
Webr.event.UploadEvent.prototype.setupPollingAndTimeout = function () {
  var serverEvent = this;
  if (this.config.timeout != null) {
    this.timeoutHandle = window.setTimeout(function () {
      serverEvent.abort(true);
    }, this.config.timeout);
  }

  var pollNumber = 0;
  this.pollHandle = window.setInterval(function () {
    serverEvent.firePoll(++pollNumber);
  }, this.config.pollInterval);
};
Webr.event.UploadEvent.prototype.getFrameDocument = function () {
  var doc = null;
  if (Webr.event.UploadEvent.IS_IE) {
    doc = this.frame.contentWindow.document;
  } else {
    doc = this.frame.contentDocument || window.frames[this.frame.id]["document"];
  }

  return doc;
};
Webr.event.UploadEvent.FRAME_ID_COUNTER = 0;
Webr.event.UploadEvent.DOM_CHECK_COUNTER = 50;
Webr.event.UploadEvent.IS_IE = navigator.userAgent.toLowerCase().indexOf("msie") > -1;
Webr.event.UploadEvent.findNonemptyFileInputs = function (rootElement) {
  var fileInputs = [];
  rootElement = rootElement || document.body;
  var inputs = rootElement.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; ++i) {
    var input = inputs[i];
    if (input.type && input.type.toLowerCase() == "file" && input.value) {
      fileInputs.push(input);
    }

  }

  return fileInputs;
};
