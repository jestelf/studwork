Webr.component.ComboBoxComponentBind = function (element, bindToElement) {
  var _wrap = $(document.createElement("div")).addClass("inputWrapper");
  var input = document.createElement("input");
  input.name = element.id.substring(3);
  input.setAttribute("valueId", element.getAttribute("_valueId"));
  _wrap.append($(input));
  var el = $(element);
  el.append(_wrap);
  var bind = $(bindToElement);
  el.css("top", bind.offset().top + bind.outerHeight(true)).css("left", bind.offset().left);
  Webr.component.ComboBoxComponentBind.superclass.constructor.call(this, new Webr.component.ComboBoxComponent(element), bindToElement);
};
{
  var F = new Function();
  F.prototype = Webr.component.ComboComponentBaseBind.prototype;
  Webr.component.ComboBoxComponentBind.prototype = new F();
  Webr.component.ComboBoxComponentBind.prototype.constructor = Webr.component.ComboBoxComponentBind;
  Webr.component.ComboBoxComponentBind.superclass = Webr.component.ComboComponentBaseBind.prototype;
}

Webr.component.ComboBoxComponentBind.prototype.makeHidden = function () {
};
Webr.component.ComboBoxComponentBind.prototype.makeVisible = function () {
  if (this.comboComponent.getPositionWatcher().getListElement() == null) {
    this.comboComponent.getPositionWatcher().setListElement(this.comboComponent.listWrapper);
  }

  this.comboComponent.setFocusNoEvents();
};
Webr.component.ComboBoxComponentBind.prototype.submitted = function (option, source) {
  if (option) {
    if (this.comboComponent.defaultOption) {
      this.jQbindedElement.removeClass(this.comboComponent.defaultOption.styleClass);
      var text = this.jQbindedElement.get(0).innerHTML.replace(this.comboComponent.defaultOption.text, this.comboComponent.dataList.getCurrentOption().text);
      this.jQbindedElement.get(0).innerHTML = text;
      this.comboComponent.defaultOption = this.comboComponent.dataList.getCurrentOption();
    }

    this.jQbindedElement.addClass(this.comboComponent.dataList.getCurrentOption().styleClass);
  }

};
Webr.component.ComboBoxComponentBind.prototype.updated = function () {
  this.comboComponent.dataList.setHideNotMatched(true);
};
