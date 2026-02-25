Webr.component.ComboBoxContentComponentBind = function (element, bindToElement) {
  var _wrap = $(document.createElement("div")).addClass("inputWrapper");
  var input = document.createElement("input");
  input.name = element.id.substring(3);
  input.setAttribute("valueId", element.getAttribute("_valueId"));
  _wrap.append($(input));
  var el = $(element);
  el.append(_wrap);
  var bind = $(bindToElement);
  el.css("top", bind.offset().top + bind.outerHeight(true)).css("left", bind.offset().left);
  Webr.component.ComboBoxContentComponentBind.superclass.constructor.call(this, new Webr.component.ComboBoxComponent(element), bindToElement);
};
{
  var F = new Function();
  F.prototype = Webr.component.ComboComponentBaseBind.prototype;
  Webr.component.ComboBoxContentComponentBind.prototype = new F();
  Webr.component.ComboBoxContentComponentBind.prototype.constructor = Webr.component.ComboBoxContentComponentBind;
  Webr.component.ComboBoxContentComponentBind.superclass = Webr.component.ComboComponentBaseBind.prototype;
}

Webr.component.ComboBoxContentComponentBind.prototype.makeHidden = function () {
  this.comboComponent.inputElement.setValueNoEvents("");
};
Webr.component.ComboBoxContentComponentBind.prototype.makeVisible = function () {
  if (this.comboComponent.getPositionWatcher().getListElement() == null) {
    this.comboComponent.getPositionWatcher().setListElement(this.comboComponent.listWrapper);
  }

};
Webr.component.ComboBoxContentComponentBind.prototype.submitted = function (option, source) {
  if (option) {
    if (this.comboComponent.defaultOption) {
      this.jQbindedElement.removeClass(this.comboComponent.defaultOption.styleClass);
      var element = this.jQbindedElement.children().get(0);
      var text = element.innerHTML.replace(this.comboComponent.defaultOption.text, this.comboComponent.dataList.getCurrentOption().text);
      element.innerHTML = text;
      this.comboComponent.defaultOption = this.comboComponent.dataList.getCurrentOption();
    }

    this.jQbindedElement.addClass(this.comboComponent.dataList.getCurrentOption().styleClass);
  }

};
Webr.component.ComboBoxContentComponentBind.prototype.updated = function () {
  this.comboComponent.dataList.setHideNotMatched(true);
};
