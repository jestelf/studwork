Webr.Event = function () {
};
Webr.Event.loadingListener = new Webr.event.LoadingServerEventListener();
Webr.Event.post = function (config) {
  if (!Webr.event.ResponseServerEventListener.SYNC_CALL_IN_PROGRESS) {
    if (Webr.event.InProgressEventListener.get().checkDoubleSubmit(config)) {
      config = Webr.event.ServerEventConfig.createCopy(config);
      config.timeout = config.timeout || 6 * 60 * 1000;
      config.listeners = config.listeners || [];
      config.listeners.push(new Webr.event.ResponseServerEventListener(config.sync));
      config.sync = false;
      if (!config.hideLoadingPopup) {
        config.listeners.push(Webr.Event.loadingListener);
      }

      config.handlerUrl = config.handlerUrl || Webr.Event.handlerUrl;
      if ((!config.fileInput || config.fileInput.length <= 0) && config.collectFormElements && config.collectFileElements) {
        var fileInputs = Webr.event.UploadEvent.findNonemptyFileInputs(config.rootElement);
        if (fileInputs.length > 0) {
          config.fileInput = fileInputs;
        }

      }

      var serverEvent;
      if (config.fileInput && config.fileInput.length > 0) {
        serverEvent = new Webr.event.UploadEvent(config);
      } else {
        serverEvent = new Webr.event.ServerEvent(config);
      }

      Webr.event.InProgressEventListener.get().rememberEvent(serverEvent);
      serverEvent.send();
    }

  }

};
Webr.Event.callMethod = function (methodName, params, baseConfig) {
  var config = Webr.event.ServerEventConfig.createCopy(baseConfig, {sync: false, preventDoubleSubmit: false, processRecentOnly: false, collectFormElements: true, eventName: methodName, eventParameters: params});
  Webr.Event.post(config);
};
Webr.Event.redirect = function (url) {
  Webr.event.ResponseServerEventListener.PAGE_CHANGED = true;
  window.location = url;
};
Webr.Event.reload = function () {
  Webr.event.ResponseServerEventListener.PAGE_CHANGED = true;
  window.location.reload();
};
Webr.Event.registerFileInput = function (fileInputId, config) {
  var fileInput = document.getElementById(fileInputId);
  config.fileInput = [fileInput];
  fileInput.onchange = function () {
    Webr.Event.post(config);
  };
};
Webr.Event.getUrlParam = function (name) {
  var params = window["$getUrlParam$"];
  if (!params) {
    params = {};
    window.location.href.replace(new RegExp("[?&]+([^=&]+)=([^&]*)", "gi"), function (m, key, value) {
      params[key] = value;
    });
    window["$getUrlParam$"] = params;
  }

  return params[name];
};
