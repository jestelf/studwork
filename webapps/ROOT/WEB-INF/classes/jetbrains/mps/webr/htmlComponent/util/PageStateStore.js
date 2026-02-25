Webr.util.PageStateStore = function () {
  Webr.util.PageStateStore.superclass.constructor.call(this);
  this.params = new Webr.util.Map();
  var it = this;
  this.parser = new Webr.util.HashParametersParser(window.location.hash, this);
  this.update();
};
{
  var F = new Function();
  F.prototype = Webr.util.HashParameterListener.prototype;
  Webr.util.PageStateStore.prototype = new F();
  Webr.util.PageStateStore.prototype.constructor = Webr.util.PageStateStore;
  Webr.util.PageStateStore.superclass = Webr.util.HashParameterListener.prototype;
}

Webr.util.PageStateStore.prototype.get = function (key) {
  return this.params.get(key.toLowerCase());
};
Webr.util.PageStateStore.prototype.put = function (key, value) {
  this.params.put(key.toLowerCase(), value);
  this.formLocation();
};
Webr.util.PageStateStore.prototype.removeKey = function (key) {
  this.params.remove(key.toLowerCase());
  this.formLocation();
};
Webr.util.PageStateStore.prototype.update = function () {
  delete this.params;
  this.params = new Webr.util.Map();
  this.parser.setInputString(window.location.hash);
  this.parser.parse();
};
Webr.util.PageStateStore.prototype.getParams = function () {
  return this.params;
};
Webr.util.PageStateStore.prototype.parameter = function (key, value) {
  this.params.put(key.toLowerCase(), value);
};
Webr.util.PageStateStore.prototype.formLocation = function () {
  var hashString = "";
  this.params.forEach(function (key, value) {
    hashString = hashString + key + "=";
    if (value != null) {
      hashString = hashString + value;
    }

    hashString = hashString + "&";
  });
  var hash = hashString.length > 0 ?hashString.substring(0, hashString.length - 1) :" ";
  if (Webr.util.Util.isSafari) {
    window.location = window.location.href.split("#")[0] + "#" + hash;
  } else {
    window.location.hash = hash;
  }

};
Webr.util.PageStateStore.getInstance = function () {
  if (!Webr.util.PageStateStore.map) {
    Webr.util.PageStateStore.map = new Webr.util.PageStateStore();
  }

  return Webr.util.PageStateStore.map;
};
