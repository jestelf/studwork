charisma.smartui.PropertySelector = function () {
  this.inited = false;
  var it = this;
  this.handler = function (e) {
    if (e.isKey(Webr.util.Key.TAB)) {
      it.select(++it.current);
      e.preventDefault();
    } else if (e.isShift(Webr.util.Key.TAB)) {
      it.select(--it.current);
      e.preventDefault();
    }

    return it.submit(e);
  };
};
charisma.smartui.PropertySelector.prototype.init = function (root, head, tail, submit) {
  if (this.inited) {
    delete this.head;
    delete this.tail;
    this.inited = false;
  }

  this.updateRoot(root);
  this.head = head;
  this.tail = tail;
  this.submit = submit;
  this.inited = true;
};
charisma.smartui.PropertySelector.prototype.updateRoot = function (root) {
  if (this.inited) {
    this.properties.unbind("ShowOptions").unbind("HideOptions");
    delete this.properties;
  }

  this.root = $(root);
  this.properties = this.root.find("div." + "combobox");
  this.len = this.properties.length;
  if (this.len <= 0) {
    return ;
  }

  charisma.smartui.PropertySelector.LAST = this.len - 1;
  this.fields = this.properties.prev();
  var it = this;
  this.properties.bind("ShowOptions", function () {
    it.onShowCombo(it.properties.index(this));
  }).bind("HideOptions", function () {
    it.onHideCombo(it.properties.index(this));
  });
};
charisma.smartui.PropertySelector.prototype.onShowCombo = function (n) {
  info("Shown " + n);
  this.current = n;
  Webr.util.Util.addKeyHandler(this.properties.eq(n), this.handler);
};
charisma.smartui.PropertySelector.prototype.onHideCombo = function (n) {
  info("Hidden " + n);
  var it = this;
  //MultiBox can unhandle before we got key event
  window.setTimeout(function () {
    Webr.util.Util.removeKeyHandler(it.properties.eq(n), it.handler);
  }, 10);
};
charisma.smartui.PropertySelector.prototype.select = function (index) {
  if (this.inited) {
    if (index < 0) {
      this.current = 0;
      this.head();
      return false;
    } else if (index > this.len - 1) {
      this.current = this.len - 1;
      this.tail();
      return false;
    }

    this.current = index;
    var it = this;
    //Avoid TAB that will be recieved in Combo on open
    window.setTimeout(function () {
      it.mdown();
    }, 10);
    return true;
  }

};
charisma.smartui.PropertySelector.prototype.mdown = function () {
  info("Switch to " + this.current);
  this.fields.eq(this.current).trigger("click");
};
charisma.smartui.PropertySelector._INSTANCE_ = null;
charisma.smartui.PropertySelector.LAST = 0;
charisma.smartui.PropertySelector.getInstance = function () {
  if (charisma.smartui.PropertySelector._INSTANCE_ == null) {
    charisma.smartui.PropertySelector._INSTANCE_ = new charisma.smartui.PropertySelector();
  }

  return charisma.smartui.PropertySelector._INSTANCE_;
};
