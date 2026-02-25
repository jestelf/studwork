Webr.event.ParamBuilder = function () {
  this.buffer = [];
};
Webr.event.ParamBuilder.prototype.addParamPair = function (name, value) {
  if (value instanceof Array) {
    for (var i = 0; i < value.length; ++i) {
      this.addParamPair(name, value[i]);
    }

  } else {
    var valueString = "";
    if (value != undefined) {
      valueString = encodeURIComponent(value);
    }

    this.buffer.push(encodeURIComponent(name), "=", valueString, "&");
  }

};
Webr.event.ParamBuilder.prototype.addParamObject = function (o) {
  if (o) {
    for ( var name in o) {
      this.addParamPair(name, o[name]);
    }

  }

};
Webr.event.ParamBuilder.prototype.toParameterString = function () {
  return this.buffer.join("");
};
