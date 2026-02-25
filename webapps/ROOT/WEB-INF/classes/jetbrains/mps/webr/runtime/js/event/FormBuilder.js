Webr.event.FormBuilder = function (form) {
  Webr.event.FormBuilder.superclass.constructor.call(this);
  this.form = form;
};
{
  var F = new Function();
  F.prototype = Webr.event.ParamBuilder.prototype;
  Webr.event.FormBuilder.prototype = new F();
  Webr.event.FormBuilder.prototype.constructor = Webr.event.FormBuilder;
  Webr.event.FormBuilder.superclass = Webr.event.ParamBuilder.prototype;
}

Webr.event.FormBuilder.prototype.addParamPair = function (name, value) {
  if (value instanceof Array) {
    for (var i = 0; i < value.length; ++i) {
      this.addParamPair(name, value[i]);
    }

  } else {
    var input = document.createElement("input");
    input.name = name;
    input.value = value;
    input.type = "hidden";
    this.form.appendChild(input);
  }

};
Webr.event.FormBuilder.prototype.addParamObject = function (o) {
  if (o) {
    for ( var name in o) {
      this.addParamPair(name, o[name]);
    }

  }

};
