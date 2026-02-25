Webr.component.MultiBox = function (searchInput, bindToId, allowNewOption, checkDifferent) {
  Webr.component.MultiBox.superclass.constructor.call(this);
  this.noMatch = {name: "&lt;no matches&gt;", id: "nomatch", checked: false};
  this.newOption = {name: "", id: "newoption", checked: false};
  this.allowNewOption = false;
  this.optionsLoaded = false;
  this.inited = false;
  this.visible = false;
  this.submitted = false;
  this.height = 0;
  this.clickOptionFunction = null;
  this.searchInput = searchInput;
  this.allowNewOption = allowNewOption;
  //create hidden input and tweak original one
  this.valueQuery = $(this.searchInput);
  this.valueQuery.data(Webr.component.ComponentRegistry.COMPONENT_INSTANCE, this);
  this.searchInput.name = this.searchInput.id.substring(3);
  this.mainElement = this.valueQuery.parent().parent();
  this.height = this.mainElement.get(0).getAttribute("_max-height");
  var it = this;
  this.checkOptionFunction = function (option) {
    if (option.checked) {
      it.checkedOptions[option.id] = option;
      it.searchInput.setAttribute("valueId", it.collectOptions());
      it.onSelect(option.id);
    } else {
      delete it.checkedOptions[option.id];
      it.searchInput.setAttribute("valueId", it.collectOptions());
      it.onUnSelect(option.id);
    }

    if (it.applyButton) {
      it.applyButton.show();
    }

    it.focusInput();
  };
  if (checkDifferent == true) {
    this.clickOptionFunction = function (option) {
      it.searchInput.setAttribute("valueId", option.id);
      it.submit();
      it.reset([option.id]);
    };
  } else {
    this.clickOptionFunction = this.checkOptionFunction;
  }

  if (bindToId) {
    this.applyButton = $(document.createElement("div"));
    this.applyButton.html("Apply");
    this.applyButton.addClass("applyButton");
    this.applyButton.click(function () {
      it.submit();
    });
    this.applyButton.hide();
    this.bindToElement = document.getElementById(bindToId);
    //createHandlers
    this.handleBlurMouseDown = function (event) {
      if (!it.mainElement.ancestorOf(event.target)) {
        it.blur();
      }

    };
    this.handleBlurKeyDown = function (event) {
      if (event.isKey(Webr.util.Key.ESC) || event.isShift(Webr.util.Key.TAB)) {
        it.blur();
      }

    };
  } else {
    this.collectItems();
  }

};
{
  var F = new Function();
  F.prototype = Webr.component.Component.prototype;
  Webr.component.MultiBox.prototype = new F();
  Webr.component.MultiBox.prototype.constructor = Webr.component.MultiBox;
  Webr.component.MultiBox.superclass = Webr.component.Component.prototype;
}

Webr.component.MultiBox.prototype.init = function (bindToElement) {
  var it = this;
  //Tweak input!
  this.searchInput.attachWatcher(true);
  this.searchInput.setWatcherDelay(0);
  var input = $(this.searchInput);
  //tweak handlers
  input.bind("valuechange", function () {
    it.inputValueChanged();
  });
  var keyHandler = function (e) {
    return it.handleKeyDown(e);
  };
  if (Webr.util.Util.isWebkit || Webr.util.Util.isIE) {
    input.keydown(keyHandler);
    input.keypress(function (e) {
      if (e.keyCode == 32) {
        if (it.dataList.getCurrentOption() !== null) {
          return false;
        }

        return true;
      }

    });
  } else {
    input.keypress(keyHandler);
    input.keydown(function (e) {
      if (e.keyCode == 32) {
        if (it.dataList.getCurrentOption() !== null) {
          return false;
        }

        return true;
      }

    });
  }

};
Webr.component.MultiBox.prototype.collectItems = function () {
  var it = this;
  this.checkedOptions = {};
  this.dataList = new Webr.component.MultiDataList();
  this.originalSelectedIds = [];
  this.originalOptions = [];
  this.uList = this.mainElement.find("ul.comboboxList");
  this.listWrapper = this.uList.parent();
  this.uList.children().each(function () {
    it.dataList.addOption(new Webr.component.CheckListItem(null).collectElement(this));
    if (!it.cellHeight) {
      it.cellHeight = $(this).height();
    }

  });
  if (this.height) {
    this.listWrapper.css("max-height", this.height * this.cellHeight);
  }

  for (var i = 0; i < this.dataList.options.length; ++i) {
    var option = this.dataList.options[i].option;
    if (option.checked) {
      this.checkedOptions[option.id] = option;
      this.originalSelectedIds.push(option.id);
    }

    this.originalOptions.push(option);
  }

  this.searchInput.setAttribute("valueId", it.collectOptions());
  this.dataList.registerCheckHandller(this.checkOptionFunction);
  this.dataList.registerClickHandler(this.clickOptionFunction);
  this.optionsLoaded = true;
};
Webr.component.MultiBox.prototype.update = function (options, selectedIds) {
  this.checkedOptions = {};
  this.dataList = new Webr.component.MultiDataList();
  this.originalSelectedIds = selectedIds;
  this.originalOptions = options;
  this.submitted = false;
  var it = this;
  var dlen = options.length;
  var wrapper = $(document.createElement("div"));
  wrapper.addClass("contentWrapper");
  var ul = document.createElement("ul");
  ul.className = "comboboxList";
  wrapper.append(ul);
  for (var i = 0; i < dlen; i += 1) {
    if (jQuery.inArray(options[i].id, selectedIds) !== -1) {
      it.checkedOptions[options[i].id] = options[i];
      options[i].checked = true;
    }

    var listItem = new Webr.component.CheckListItem(options[i]);
    this.dataList.addOption(listItem);
    ul.appendChild(listItem.getOptionElement().get(0));
    if (!this.cellHeight) {
      this.cellHeight = listItem.getOptionElement().height();
    }

  }

  this.dataList.registerClickHandler(it.clickOptionFunction);
  this.dataList.registerCheckHandller(it.checkOptionFunction);
  if (options == undefined || options.length == 0) {
    this.noMatch.name = "&lt;empty list&gt;";
    var listItem = new Webr.component.CheckListItem(this.noMatch);
    this.dataList.addOption(listItem);
    ul.appendChild(listItem.getOptionElement().get(0));
  } else {
    if (this.bindToElement) {
      var listItem = new Webr.component.CheckListItem(this.noMatch);
      this.dataList.addOption(listItem);
      ul.appendChild(listItem.getOptionElement().get(0));
    }

  }

  if (this.allowNewOption) {
    var listItem = new Webr.component.CheckListItem(this.newOption);
    this.dataList.addOption(listItem);
    ul.appendChild(listItem.getOptionElement().get(0));
    listItem.registerClickHandler(function (option) {
      it.submit(option.name);
    });
  }

  this.searchInput.setAttribute("valueId", it.collectOptions());
  if (this.listWrapper) {
    this.listWrapper.replaceWith(wrapper);
  } else {
    this.mainElement.append(wrapper);
  }

  if (this.bindToElement) {
    this.mainElement.append(this.applyButton);
  }

  this.uList = $(ul);
  this.listWrapper = wrapper;
  if (this.height) {
    this.listWrapper.css("max-height", this.height * this.cellHeight);
  }

  if (this.bindToElement && this.visible) {
    this.showOptions();
  }

};
Webr.component.MultiBox.prototype.fixHeight = function () {
  var ulElement = this.listWrapper.get(0);
  var maxHeight = this.listWrapper.maxVisibleHeight();
  var toTop = false;
  var height = this.listWrapper.height();
  var screenHeight = $(window).height();
  if (height > maxHeight && maxHeight < screenHeight / 5) {
    toTop = true;
    maxHeight = $(this.bindToElement).offset().top - $(window).scrollTop() - this.mainElement.outerHeight(true);
  }

  this.move(toTop);
  if (height > maxHeight) {
    this.uList.css("max-height", maxHeight).css("overflow-y", "scroll");
  } else {
    this.uList.css("max-height", "").css("overflow-y", "");
  }

};
Webr.component.MultiBox.prototype.move = function (toTop) {
  if (toTop) {
    if (this.bindToElement) {
      this.mainElement.addClass("reversal").css("top", $(this.bindToElement).position().top - this.mainElement.outerHeight(true));
    }

  } else {
    this.mainElement.removeClass("reversal").css("top", "");
  }

};
Webr.component.MultiBox.prototype.submit = function (newOption) {
  this.submitted = true;
  this.originalSelectedIds = [];
  for ( var key in this.checkedOptions) {
    this.originalSelectedIds.push(key);
  }

  this.blur();
  if (newOption) {
    this.onSubmitNewOption(newOption);
  } else {
    this.onsubmit();
  }

};
Webr.component.MultiBox.prototype.reset = function (selected) {
  for (var i = 0; i < this.originalOptions.length; ++i) {
    this.originalOptions[i].checked = false;
  }

  this.update(this.originalOptions, selected ?selected :this.originalSelectedIds);
};
Webr.component.MultiBox.prototype.collectOptions = function () {
  var first = true;
  var string = "";
  for ( var option in this.checkedOptions) {
    if (!first) {
      string += ",";
    }

    string += option;
    first = false;
  }

  return string;
};
Webr.component.MultiBox.prototype.blur = function () {
  this.unhandleBlur();
  this.hideOptions();
};
Webr.component.MultiBox.prototype.handleBlur = function () {
  var d = $(Webr.util.Util.isIE ?document.body :document);
  d.mousedown(this.handleBlurMouseDown);
  Webr.util.Util.addKeyHandler(d, this.handleBlurKeyDown);
};
Webr.component.MultiBox.prototype.unhandleBlur = function () {
  var d = $(Webr.util.Util.isIE ?document.body :document);
  d.unbind("mousedown", this.handleBlurMouseDown);
  Webr.util.Util.removeKeyHandler(d, this.handleBlurKeyDown);
};
Webr.component.MultiBox.prototype.inputValueChanged = function () {
  this.newOption.name = this.searchInput.value;
  this.dataList.narrow(this.searchInput.value.toLowerCase(), this.bindToElement != undefined);
};
Webr.component.MultiBox.prototype.loadOptions = function () {
  if (!this.optionsLoaded) {
    if (this.valueQuery.triggerHandler("load") != undefined) {
      this.optionsLoaded = true;
    } else {
      var it = this;
      window.setTimeout(function () {
        it.loadOptions();
      }, 50);
    }

  }

};
Webr.component.MultiBox.prototype.focus = function () {
  if (!this.optionsLoaded) {
    this.loadOptions();
    this.visible = true;
  } else {
    this.showOptions();
  }

  if (!this.inited) {
    this.init(this.bindToElement != undefined);
    this.inited = true;
  }

  if (this.bindToElement) {
    this.handleBlur();
  }

};
Webr.component.MultiBox.prototype.handleKeyDown = function (event) {
  if (this.bindToElement) {
    if (Webr.util.Key.isKeyNoModifiers(event, Webr.util.Key.ENTER)) {
      //Submit new option
      if (this.dataList.hasCurrent()) {
        this.dataList.getCurrentItem().check();
      }

      this.submit();
    }

    if (event.isKey(Webr.util.Key.TAB)) {
      this.submit();
    }

  }

  if (Webr.util.Key.isKeyNoModifiers(event, Webr.util.Key.DOWN)) {
    this.dataList.next();
    return false;
  }

  if (Webr.util.Key.isKeyNoModifiers(event, Webr.util.Key.UP)) {
    this.dataList.prev();
    return false;
  }

  if (event.which == 32) {
    if (this.dataList.getCurrentOption() !== null) {
      this.dataList.getCurrentItem().check();
      return false;
    }

  }

  if (Webr.util.Key.isKeyNoModifiers(event, Webr.util.Key.PAGEDOWN)) {
    this.dataList.last();
    return false;
  }

  if (Webr.util.Key.isKeyNoModifiers(event, Webr.util.Key.PAGEUP)) {
    this.dataList.first();
    return false;
  }

  return true;
};
Webr.component.MultiBox.prototype.showOptions = function () {
  if (this.mainElement) {
    this.submitted = false;
    this.visible = true;
    if (this.bindToElement) {
      this.dataList.narrow("", false);
      this.mainElement.show();
      this.focusInput();
      this.fixHeight();
    }

    this.onShowOptions();
  }

};
Webr.component.MultiBox.prototype.hideOptions = function () {
  if (this.mainElement) {
    this.visible = false;
    if (this.bindToElement) {
      this.searchInput.setValueNoEvents("");
      this.mainElement.hide();
      this.bindToElement.focus();
      var it = this;
      //workaround strange opera behaviour
      window.setTimeout(function () {
        $(it.bindToElement).one("click", function () {
          it.focus();
          return false;
        });
      }, 150);
    }

    this.move(false);
    this.onHideOptions();
  }

};
Webr.component.MultiBox.prototype.focusInput = function () {
  try {
    this.searchInput.focus();
  } catch (ex) {
  }

};
Webr.component.MultiBox.prototype.onload = function () {
};
Webr.component.MultiBox.prototype.onsubmit = function () {
  this.valueQuery.trigger("submit");
};
Webr.component.MultiBox.prototype.onSubmitNewOption = function (option) {
  this.valueQuery.trigger("SubmitNewOption", {option: option});
};
Webr.component.MultiBox.prototype.onSelect = function (option) {
  this.valueQuery.trigger("Select", {option: option});
};
Webr.component.MultiBox.prototype.onUnSelect = function (option) {
  this.valueQuery.trigger("UnSelect", {option: option});
};
Webr.component.MultiBox.prototype.onShowOptions = function () {
  this.valueQuery.trigger("ShowOptions");
};
Webr.component.MultiBox.prototype.onHideOptions = function () {
  this.valueQuery.trigger("HideOptions");
};
Webr.component.MultiBox.registerMultibox = function (path, multiboxSuffixName, allowNewOption) {
  cr.forEach(path, multiboxSuffixName, function () {
    var e = $(this);
    var bindToId = e.attr("bid");
    var checkDifferent = bindToId ?true :false;
    var f = function () {
      var mb = new Webr.component.MultiBox(e.get(0), bindToId, allowNewOption, checkDifferent);
      mb.focus();
      return false;
    };
    if (bindToId) {
      $(document.getElementById(bindToId)).one("click", f);
    } else {
      f();
    }

  });
};
Webr.component.MultiDataList = function () {
  this.options = [];
  this.visibleOptions = 0;
  this.currenStyleName = "active";
  this.currentIndex = -1;
};
Webr.component.MultiDataList.prototype.addOption = function (listItem) {
  this.options.push(listItem);
  if (listItem.option.id !== "nomatch") {
    this.visibleOptions = this.options.length;
    this.subscribeMouseOver(this.options.length - 1);
  } else {
    this.noMatch = listItem;
  }

};
Webr.component.MultiDataList.prototype.isEmpty = function () {
  return this.options.length <= 0;
};
Webr.component.MultiDataList.prototype.hasVisible = function () {
  return !this.isEmpty() && this.visibleOptions > 0;
};
Webr.component.MultiDataList.prototype.hasCurrent = function () {
  return 0 <= this.currentIndex && this.currentIndex < this.options.length;
};
Webr.component.MultiDataList.prototype.unselectCurrent = function () {
  if (this.hasCurrent()) {
    this.options[this.currentIndex].unselect(this.currenStyleName);
  }

};
Webr.component.MultiDataList.prototype.next = function () {
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

    this.options[this.currentIndex].selectAndScroll(this.currenStyleName);
  }

};
Webr.component.MultiDataList.prototype.prev = function () {
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

    this.options[this.currentIndex].selectAndScroll(this.currenStyleName);
  }

};
Webr.component.MultiDataList.prototype.first = function () {
  if (this.hasVisible()) {
    this.unselectCurrent();
    this.currentIndex = -1;
    this.next();
  }

};
Webr.component.MultiDataList.prototype.last = function () {
  if (this.hasVisible()) {
    this.unselectCurrent();
    this.currentIndex = -1;
    this.prev();
  }

};
Webr.component.MultiDataList.prototype.getCurrentName = function () {
  var suggestOption = this.getCurrentOption();
  if (suggestOption != null) {
    return suggestOption.name;
  } else {
    return "";
  }

};
Webr.component.MultiDataList.prototype.getCurrentId = function () {
  var suggestOption = this.getCurrentOption();
  if (suggestOption != null) {
    return suggestOption.id;
  } else {
    return "";
  }

};
Webr.component.MultiDataList.prototype.getCurrentOption = function () {
  var suggestOption = null;
  if (this.hasCurrent()) {
    suggestOption = this.options[this.currentIndex].option;
    if (suggestOption.id === "nomatch" || suggestOption.id === "apply" || suggestOption.id === "newoption") {
      suggestOption = null;
    }

  }

  return suggestOption;
};
Webr.component.MultiDataList.prototype.getCurrentItem = function () {
  var suggestOption = null;
  if (this.hasCurrent()) {
    suggestOption = this.options[this.currentIndex];
  }

  return suggestOption;
};
Webr.component.MultiDataList.prototype.narrow = function (s, hideNotMached) {
  this.visibleOptions = 0;
  for (var i = 0; i < this.options.length; ++i) {
    if (this.options[i].narrow(s, hideNotMached)) {
      this.visibleOptions += 1;
    }

  }

  var visible = hideNotMached ?this.hasCurrent() ?this.getCurrentItem().visible :false :false;
  if (visible) {
  } else {
    var match = this.hasCurrent() ?this.getCurrentItem().match :false;
    if (!match && this.hasVisible()) {
      if (this.currentIndex == -1) {
        this.currentIndex = 0;
      } else {
        this.options[this.currentIndex].unselect(this.currenStyleName);
      }

      for (var i = 0; i < this.options.length; ++i) {
        var num = (this.currentIndex + i) % this.options.length;
        if (this.options[num].visible && this.options[num].match) {
          this.currentIndex = num;
                    break;

        }

      }

      this.options[this.currentIndex].selectAndScroll(this.currenStyleName);
    }

  }

  if (!this.hasVisible()) {
    this.noMatch.optionElement.show();
    if (this.hasCurrent()) {
      this.getCurrentItem().unselect(this.currenStyleName);
    }

    this.currentIndex = -1;
  }

};
Webr.component.MultiDataList.prototype.registerClickHandler = function (clickHandler) {
  var length = this.options.length;
  for (var i = 0; i < length; ++i) {
    this.options[i].registerClickHandler(clickHandler);
  }

};
Webr.component.MultiDataList.prototype.registerCheckHandller = function (checkHandler) {
  var length = this.options.length;
  for (var i = 0; i < length; ++i) {
    this.options[i].registerCheckHandler(checkHandler);
  }

};
Webr.component.MultiDataList.prototype.mouseOver = function (index) {
  if (this.hasCurrent()) {
    this.options[this.currentIndex].unselect(this.currenStyleName);
  }

  this.options[index].select(this.currenStyleName);
  this.currentIndex = index;
};
Webr.component.MultiDataList.prototype.mousOut = function (index) {
  this.unselectCurrent();
  this.currentIndex = -1;
};
Webr.component.MultiDataList.prototype.subscribeMouseOver = function (index) {
  var t = this;
  this.options[index].getOptionElement().mouseover(function () {
    t.mouseOver(index);
  });
  this.options[index].getOptionElement().mouseout(function () {
    t.mousOut(index);
  });
};
Webr.component.CheckListItem = function (option) {
  this.visible = true;
  this.match = false;
  this.option = option;
};
Webr.component.CheckListItem.prototype.toggleCheck = function () {
  if (this.option.id === "nomatch" || this.option.id === "apply" || this.option.id === "newoption") {
  } else {
    this.option.checked = !this.option.checked;
    this.checkBoxElement.toggleClass("checked");
    this.checkBoxElement.toggleClass("unchecked");
  }

};
Webr.component.CheckListItem.prototype.isChecked = function () {
  return this.option.checked;
};
Webr.component.CheckListItem.prototype.selectAndScroll = function (clazz) {
  this.optionElement.addClass(clazz);
  this.optionElement.scrollTo(this.optionElement.parent().get(0));
};
Webr.component.CheckListItem.prototype.select = function (clazz) {
  this.optionElement.addClass(clazz);
};
Webr.component.CheckListItem.prototype.unselect = function (clazz) {
  this.optionElement.removeClass(clazz);
};
Webr.component.CheckListItem.prototype.registerClickHandler = function (clickHandler) {
  var it = this;
  this.optionElement.click(function (event) {
    it.toggleCheck();
    clickHandler.call(this, it.option);
    return false;
  });
};
Webr.component.CheckListItem.prototype.registerCheckHandler = function (checkHandler) {
  var it = this;
  this.checkBoxElement.click(function (event) {
    it.toggleCheck();
    checkHandler.call(this, it.option);
    return false;
  });
};
Webr.component.CheckListItem.prototype.check = function () {
  this.checkBoxElement.click();
};
Webr.component.CheckListItem.prototype.narrow = function (s, hideNotMatched) {
  var p = this.option.name.toLowerCase().indexOf(s);
  if (this.option.id === "nomatch") {
    this.visible = false;
    this.optionElement.hide();
    return false;
  }

  if (this.option.id === "apply") {
    if (this.option.checked) {
      this.optionElement.show();
    } else {
      this.optionElement.hide();
    }

    this.visible = false;
    return false;
  }

  if (this.option.id === "newoption") {
    if (s.length != 0) {
      this.htmlText.html("\"<span class=\"match\">" + this.option.name + "</span>\" (create new)");
      this.optionElement.show();
      this.visible = true;
    } else {
      this.optionElement.hide();
      this.visible = false;
    }

    return this.visible;
  }

  if (s.length == 0 || p == -1) {
    this.htmlText.html(this.option.name);
    if (hideNotMatched && s.length != 0) {
      this.optionElement.hide();
      this.visible = false;
    } else {
      this.optionElement.show();
      this.visible = true;
    }

    if (s.length == 0) {
      this.match = true;
    } else {
      this.match = false;
    }

  } else {
    this.htmlText.html(this.option.name.substring(0, p) + "<span class=\"match\">" + this.option.name.substring(p, p + s.length) + "</span>" + this.option.name.substring(p + s.length));
    this.optionElement.show();
    this.visible = true;
    this.match = true;
  }

  return this.visible;
};
Webr.component.CheckListItem.prototype.getOptionElement = function () {
  if (!(this.checkBoxElement || this.optionElement || this.htmlText)) {
    var li = document.createElement("li");
    if (this.option.id === "nomatch" || this.option.id === "apply" || this.option.id === "newoption") {
    } else {
      var checkBox = document.createElement("span");
      checkBox.innerHTML = "&nbsp";
      if (this.option.checked) {
        checkBox.className = "checkbox checked";
      } else {
        checkBox.className = "checkbox unchecked";
      }

      li.appendChild(checkBox);
      this.checkBoxElement = $(checkBox);
    }

    var label = document.createElement("span");
    label.innerHTML = this.option.name;
    li.appendChild(label);
    this.htmlText = $(label);
    this.optionElement = $(li);
  }

  return this.optionElement;
};
Webr.component.CheckListItem.prototype.collectElement = function (selector) {
  if (!(this.checkBoxElement || this.optionElement || this.htmlText)) {
    var li = $(selector);
    this.optionElement = li;
    this.htmlText = li.children("span:last");
    var name = this.htmlText.html();
    var id = li.attr("_id");
    this.checkBoxElement = li.children("span:first");
    var checked = this.checkBoxElement.hasClass("checked");
    this.option = {id: id, name: name, checked: checked};
  }

  return this;
};
Webr.component.Option = function () {
};
var regmb2 = Webr.component.MultiBox.registerMultibox;
var regmb = Webr.component.MultiBox.registerMultibox;
