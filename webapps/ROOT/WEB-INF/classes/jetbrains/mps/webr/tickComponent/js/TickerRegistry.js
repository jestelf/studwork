Webr.tick.Registry = function () {
  Webr.tick.Registry.superclass.constructor.call(this);
  this.tickers = [];
};
{
  var F = new Function();
  F.prototype = Webr.event.RefreshListener.prototype;
  Webr.tick.Registry.prototype = new F();
  Webr.tick.Registry.prototype.constructor = Webr.tick.Registry;
  Webr.tick.Registry.superclass = Webr.event.RefreshListener.prototype;
}

Webr.tick.Registry.prototype.unregister = function (templatePath) {
  templatePath = templatePath + ".";
  for ( var componentName in this.tickers) {
    if (componentName.indexOf(templatePath) >= 0) {
      this.tickers[componentName].stop();
      delete this.tickers[componentName];
    }

  }

};
Webr.tick.Registry.get = function () {
  if (!Webr.tick.Registry.instance) {
    Webr.tick.Registry.instance = new Webr.tick.Registry();
    Webr.event.RefreshCommandProcessor.addListener(Webr.tick.Registry.instance);
  }

  return Webr.tick.Registry.instance;
};
Webr.tick.Registry.getTicker = function (path, name, period) {
  var fqname;
  var _path;
  if (path.path) {
    _path = path.path;
  } else {
    _path = path;
  }

  if (name == undefined) {
    name = _path.substring(_path.lastIndexOf(".") + 1);
    fqname = _path;
  } else {
    fqname = _path + "." + name;
  }

  var registry = Webr.tick.Registry.get();
  var ticker = registry.tickers[fqname];
  if (!ticker) {
    ticker = new Webr.tick.Ticker(fqname);
    registry.tickers[fqname] = ticker;
    //start ticker on first registration only
  }

  if (period && !ticker.wasStarted) {
    ticker.start(period);
  }

  return ticker;
};
Webr.tick.Registry.getTickerInEventHandler = function (event, name) {
  return Webr.tick.Registry.getTicker(event.data.realPath, name);
};
var regt = Webr.tick.Registry.getTicker;
