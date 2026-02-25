Webr.event.InputCollector = function (rootElement) {
  this.rootElement = rootElement || document.body;
};
Webr.event.InputCollector.prototype.collect = function (paramBuilder) {
  this.paramBuilder = paramBuilder;
  this.collectSelects();
  this.collectInputs();
  this.collectTextAreas();
};
Webr.event.InputCollector.prototype.collectSelects = function () {
  var selects = $(this.rootElement).find("select[name]:not([disabled])");
  for (var i = 0; i < selects.length; ++i) {
    var select = selects.get(i);
    var name = select.name;
    var selectedOptions = $(select).find("option:selected");
    for (var j = 0; j < selectedOptions.length; ++j) {
      var selectedOption = selectedOptions.get(j);
      var value;
      if ($(selectedOption).is("[value]")) {
        value = selectedOption.value;
      } else {
        value = selectedOption.text;
      }

      this.appendParameter(name, value);
    }

  }

};
Webr.event.InputCollector.prototype.collectInputs = function () {
  var inputs = $(this.rootElement).find("input[name]:not([disabled])");
  var radios = inputs.filter(":radio:checked");
  for (var i = 0; i < radios.length; ++i) {
    var radio = radios.get(i);
    this.appendParameter(radio.name, radio.value);
  }

  var checkboxes = inputs.filter(":checkbox");
  for (var i = 0; i < checkboxes.length; ++i) {
    var checkbox = checkboxes.get(i);
    this.appendParameter(checkbox.name, checkbox.checked);
  }

  var texts = inputs.filter(":text,:password,:hidden");
  for (var i = 0; i < texts.length; ++i) {
    var text = texts.get(i);
    if ($(text).attr("valueId") !== undefined) {
      this.appendParameter(text.name, text.getAttribute("valueId"));
    } else {
      this.appendParameter(text.name, text.value);
    }

  }

};
Webr.event.InputCollector.prototype.collectTextAreas = function () {
  var textAreas = $(this.rootElement).find("textarea[name]:not([disabled])");
  for (var i = 0; i < textAreas.length; ++i) {
    var textArea = textAreas.get(i);
    this.appendParameter(textArea.name, textArea.value);
  }

};
Webr.event.InputCollector.prototype.appendParameter = function (name, value) {
  if (name.length && name.length >= 1 && name.charAt(0) != "-") {
    this.paramBuilder.addParamPair(name, value);
  }

};
Webr.event.InputCollector.isIE = navigator.userAgent.toLowerCase().indexOf("msie") > -1;
