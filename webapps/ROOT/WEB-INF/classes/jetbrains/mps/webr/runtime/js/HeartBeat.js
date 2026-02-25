Webr.HeartBeat = function () {
};
Webr.HeartBeat.init = function () {
  var f = function () {
    Webr.Event.post({collectFormElements: false, eventName: "_heart_beat", handlerUrl: Webr.Event.handlerUrl, hideLoadingPopup: true, preventDoubleSubmit: true, timeout: 5 * 60 * 1000});
  };
  return window.setInterval(f, new Number("40000"));
};
