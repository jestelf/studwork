Webr.component.DataList = function (config) {
  Webr.component.DataList.superclass.constructor.call(this);
  this.options = [];
  this.visibleOptions = 0;
  this.currentIndex = -1;
  this.noMatchOption = null;
  this.hideNotMatched = true;
  this.options = [];
  this.visibleOptions = 0;
  this.currenStyleName = config ?config.currentSyleName :"active";
};
{
  var F = new Function();
  F.prototype = Webr.component.Component.prototype;
  Webr.component.DataList.prototype = new F();
  Webr.component.DataList.prototype.constructor = Webr.component.DataList;
  Webr.component.DataList.superclass = Webr.component.Component.prototype;
}

Webr.component.DataList.prototype.addDataListItem = function (listItem, current) {
  if (listItem.option.id !== "nomatch") {
    this.options.push(listItem);
    this.visibleOptions = this.options.length;
    this.registerMouseOver(this.options.length - 1);
  } else {
    this.noMatchOption = listItem;
    return ;
  }

  if (current) {
    this.currentIndex = this.options.length - 1;
    listItem.getElement().addClass(this.currenStyleName);
  }

};
Webr.component.DataList.prototype.addNoMatchOption = function (noMatch) {
  this.noMatchOption = noMatch;
};
Webr.component.DataList.prototype.setHideNotMatched = function (hide) {
  this.hideNotMatched = hide;
};
Webr.component.DataList.prototype.isHideNotMatched = function () {
  return this.hideNotMatched;
};
Webr.component.DataList.prototype.isEmpty = function () {
  return this.options.length <= 0;
};
Webr.component.DataList.prototype.hasVisible = function () {
  return !this.isEmpty() && this.visibleOptions > 0;
};
Webr.component.DataList.prototype.hasCurrent = function () {
  return 0 <= this.currentIndex && this.currentIndex < this.options.length;
};
Webr.component.DataList.prototype.unselectCurrent = function () {
  if (this.hasCurrent()) {
    this.options[this.currentIndex].unselect(this.currenStyleName);
  }

};
Webr.component.DataList.prototype.selectCurrent = function () {
  if (this.hasCurrent()) {
    this.options[this.currentIndex].select(this.currenStyleName);
    this.options[this.currentIndex].scroll();
    this.fire(function (listener) {
      listener.selectionChanged();
    });
  }

};
Webr.component.DataList.prototype.select_next = function () {
  if (this.hasVisible()) {
    if (this.currentIndex == -1) {
    } else {
      this.options[this.currentIndex].unselect(this.currenStyleName);
    }

    for (var i = 1; i < this.options.length; ++i) {
      var num = (this.currentIndex + i) % this.options.length;
      if (this.options[num].visible) {
        this.currentIndex = num;
                break;

      }

    }

    this.selectCurrent();
  }

};
Webr.component.DataList.prototype.select_prev = function () {
  if (this.hasVisible()) {
    if (this.currentIndex == -1) {
      this.currentIndex = this.options.length;
    } else {
      this.options[this.currentIndex].unselect(this.currenStyleName);
    }

    for (var i = this.options.length - 1; i > 0; --i) {
      var num = (this.currentIndex + i) % this.options.length;
      if (this.options[num].visible) {
        this.currentIndex = num;
                break;

      }

    }

    this.selectCurrent();
  }

};
Webr.component.DataList.prototype.select_first = function () {
  if (this.hasVisible()) {
    this.unselectCurrent();
    this.currentIndex = -1;
    this.select_next();
  }

};
Webr.component.DataList.prototype.select_last = function () {
  if (this.hasVisible()) {
    this.unselectCurrent();
    this.currentIndex = -1;
    this.select_prev();
  }

};
Webr.component.DataList.prototype.getCurrentName = function () {
  var suggestOption = this.getCurrentOption();
  if (suggestOption != null) {
    return suggestOption.text;
  } else {
    return "";
  }

};
Webr.component.DataList.prototype.getCurrentId = function () {
  var suggestOption = this.getCurrentOption();
  if (suggestOption != null) {
    return suggestOption.id;
  } else {
    return "";
  }

};
Webr.component.DataList.prototype.getCurrentItem = function () {
  var suggestOption = null;
  if (this.hasCurrent()) {
    suggestOption = this.options[this.currentIndex];
  }

  return suggestOption;
};
Webr.component.DataList.prototype.getCurrentOption = function () {
  var suggestOption = null;
  if (this.hasCurrent()) {
    suggestOption = this.options[this.currentIndex].option;
  }

  return suggestOption;
};
Webr.component.DataList.prototype.setCurrentOption = function (option) {
  if (this.getCurrentOption() != option) {
    var it = this;
    this.unselectCurrent();
    jQuery.each(this.options, function (index, item) {
      if (item.option === option) {
        it.currentIndex = index;
        return false;
      }

      it.currentIndex = -1;
    });
    this.selectCurrent();
  }

};
Webr.component.DataList.prototype.resize = function (s) {
  this.visibleOptions = 0;
  this.noMatchOption.hide();
  for (var i = 0; i < this.options.length; ++i) {
    if (Webr.component.DataListItem.narrow(this.options[i], s, this.hideNotMatched)) {
      this.visibleOptions += 1;
    }

  }

  this.findAndSelectCurrent();
  if (!this.hasVisible()) {
    this.noMatchOption.show();
    if (this.hasCurrent()) {
      this.getCurrentItem().unselect(this.currenStyleName);
    }

    this.currentIndex = -1;
  }

};
Webr.component.DataList.prototype.findAndSelectCurrent = function () {
  var visible = this.hideNotMatched ?this.hasCurrent() ?this.getCurrentItem().visible :false :false;
  if (!visible) {
    var match = this.hasCurrent() ?this.getCurrentItem().match :false;
    if (!match && this.hasVisible()) {
      if (this.currentIndex == -1) {
        this.currentIndex = 0;
      } else {
        this.options[this.currentIndex].unselect(this.currenStyleName);
      }

      for (var i = 1; i < this.options.length; ++i) {
        var num = (this.currentIndex + i) % this.options.length;
        if (this.options[num].visible && this.options[num].match) {
          match = true;
          this.currentIndex = num;
                    break;

        }

      }

      if (match) {
        this.options[this.currentIndex].select(this.currenStyleName);
      } else {
        this.currentIndex = -1;
      }

    }

  }

};
Webr.component.DataList.prototype.narrow = function (s) {
};
Webr.component.DataList.prototype.forEach = function (f) {
  for (var i = 0; i < this.options.length; ++i) {
    f(this.options[i]);
  }

  if (this.noMatchOption) {
    f(this.noMatchOption);
  }

};
Webr.component.DataList.prototype.mouseOver = function (index) {
  if (this.hasCurrent()) {
    this.getCurrentItem().unselect(this.currenStyleName);
  }

  this.currentIndex = index;
  this.getCurrentItem().select(this.currenStyleName);
};
Webr.component.DataList.prototype.registerClickHandler = function (clickHandler) {
  var length = this.options.length;
  for (var i = 0; i < length; ++i) {
    this.options[i].registerClickHandler(clickHandler);
  }

};
Webr.component.DataList.prototype.registerCheckHandler = function (checkHandler) {
  var length = this.options.length;
  for (var i = 0; i < length; ++i) {
    this.options[i].registerCheckHandler(checkHandler);
  }

};
Webr.component.DataList.prototype.registerMouseOver = function (index) {
  var it = this;
  this.options[index].getElement().mouseover(function () {
    it.mouseOver(index);
  });
};
Webr.component.RemoteDataList = function (comboBase, config) {
  Webr.component.RemoteDataList.superclass.constructor.call(this, config);
  this.comboBase = comboBase;
  var it = this;
};
{
  var F = new Function();
  F.prototype = Webr.component.DataList.prototype;
  Webr.component.RemoteDataList.prototype = new F();
  Webr.component.RemoteDataList.prototype.constructor = Webr.component.RemoteDataList;
  Webr.component.RemoteDataList.superclass = Webr.component.DataList.prototype;
}

Webr.component.RemoteDataList.prototype.narrow = function (s) {
  this.comboBase.reload(s.toLowerCase());
};
Webr.component.RemoteDataList.prototype.selectFirstNotEmpty = function () {
  if (this.currentIndex > -1 && this.visibleOptions > 0) {
    this.currentIndex = 0;
    if (this.options.length > 2) {
      if (this.options[0].getElement().hasClass("empty")) {
        this.currentIndex = 1;
      }

    }

    this.options[this.currentIndex].getElement().select(this.currenStyleName);
  }

};
Webr.component.MemoryDataList = function (config) {
  Webr.component.MemoryDataList.superclass.constructor.call(this, config);
};
{
  var F = new Function();
  F.prototype = Webr.component.DataList.prototype;
  Webr.component.MemoryDataList.prototype = new F();
  Webr.component.MemoryDataList.prototype.constructor = Webr.component.MemoryDataList;
  Webr.component.MemoryDataList.superclass = Webr.component.DataList.prototype;
}

Webr.component.MemoryDataList.prototype.narrow = function (s) {
  this.resize(s.toLowerCase());
  if (this.hasCurrent()) {
    this.getCurrentItem().scroll();
  }

};
Webr.component.DataListConfig = function () {
  this.currentSyleName = "active";
};
Webr.component.DataListItem = function (option) {
  this.visible = true;
  this.match = false;
  this.el = null;
  this.option = option;
};
Webr.component.DataListItem.prototype.select = function (c) {
  this.el.addClass(c);
};
Webr.component.DataListItem.prototype.unselect = function (c) {
  this.el.removeClass(c);
};
Webr.component.DataListItem.prototype.scroll = function () {
};
Webr.component.DataListItem.prototype.show = function () {
  this.visible = true;
  this.el.show();
};
Webr.component.DataListItem.prototype.hide = function () {
  this.visible = false;
  this.el.hide();
};
Webr.component.DataListItem.prototype.getElement = function () {
  return this.el;
};
Webr.component.DataListItem.prototype.registerClickHandler = function (handler) {
};
Webr.component.DataListItem.prototype.registerCheckHandler = function (handler) {
};
Webr.component.DataListItem.narrow = function (dataListItem, s, hideNotMatched) {
  var option = dataListItem.option;
  var p = option.text.toLowerCase().indexOf(s);
  if (s.length == 0 || p == -1) {
    dataListItem.getElement().text(option.text);
    if (hideNotMatched == true && s.length != 0) {
      dataListItem.hide();
    } else {
      dataListItem.show();
    }

    if (s.length == 0) {
      dataListItem.match = true;
    } else {
      dataListItem.match = false;
    }

  } else {
    dataListItem.getElement().html(option.text.substring(0, p) + "<span class=\"match\">" + option.text.substring(p, p + s.length) + "</span>" + option.text.substring(p + s.length));
    dataListItem.show();
    dataListItem.match = true;
  }

  return dataListItem.visible;
};
Webr.component.SelectionListener = function () {
  Webr.component.SelectionListener.superclass.constructor.call(this);
};
{
  var F = new Function();
  F.prototype = Webr.component.ComponentListener.prototype;
  Webr.component.SelectionListener.prototype = new F();
  Webr.component.SelectionListener.prototype.constructor = Webr.component.SelectionListener;
  Webr.component.SelectionListener.superclass = Webr.component.ComponentListener.prototype;
}

Webr.component.SelectionListener.prototype.selectionChanged = function () {
};
