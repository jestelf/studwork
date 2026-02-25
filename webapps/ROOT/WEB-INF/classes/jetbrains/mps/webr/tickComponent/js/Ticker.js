Webr.tick.Ticker = function (fqname) {
  this.wasStarted = false;
  this.fqname = fqname;
  this.event = {data: {realPath: this.fqname.substring(0, fqname.lastIndexOf(".")), it: this}};
  this.resetCounter();
};
Webr.tick.Ticker.prototype.fire = function () {
  this.tickCount += 1;
  if (this.listeners != null) {
    for (var i = 0; i < this.listeners.length; ++i) {
      this.listeners[i](this.event, this.tickCount);
    }

  }

};
Webr.tick.Ticker.prototype.start = function (period) {
  this.wasStarted = true;
  if (this.handler != null) {
    window.clearInterval(this.handler);
  }

  var t = this;
  this.handler = window.setInterval(function () {
    t.fire();
  }, period);
};
Webr.tick.Ticker.prototype.stop = function () {
  if (this.handler != null) {
    window.clearInterval(this.handler);
    this.handler = null;
  }

};
Webr.tick.Ticker.prototype.addServerSideListener = function (baseConfig, tickCountParameterName) {
  if (this.hasServerSideListener()) {
    return ;
  }

  tickCountParameterName = tickCountParameterName || "tickCount";
  var defaultConfig = {eventName: this.fqname + ":tick", collectFormElements: true, hideLoadingPopup: true, sync: false, preventDoubleSubmit: true, eventParameters: {}};
  this.serverSideListener = function (event, tickCount) {
    var config = Webr.event.ServerEventConfig.createCopy(baseConfig, defaultConfig);
    config.eventParameters[tickCountParameterName] = tickCount;
    Webr.Event.post(config);
  };
  this.addListener(this.serverSideListener);
};
Webr.tick.Ticker.prototype.hasServerSideListener = function () {
  return this.serverSideListener;
};
Webr.tick.Ticker.prototype.addListener = function (listener) {
  if (this.listeners == null) {
    this.listeners = [];
  }

  this.listeners.push(listener);
};
Webr.tick.Ticker.prototype.resetCounter = function () {
  this.tickCount = 0;
};
Webr.tick.Ticker.prototype.getAttribute = function () {
  return null;
};
