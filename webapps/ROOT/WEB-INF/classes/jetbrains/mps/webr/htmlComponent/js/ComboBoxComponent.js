Webr.component.ComboBoxComponent = function (element) {
  this.narrowed = "";
  this.pager = null;
  var input;
  this.maxHeight = element.getAttribute("_maxheight");
  input = $(element).find("input").get(0);
  //Apply extenssions
  cr.applyExtension(input);
  Webr.component.ComboBoxComponent.superclass.constructor.call(this, element, input);
  $(element).data(Webr.component.ComponentRegistry.COMPONENT_INSTANCE, this);
  var it = this;
  //Unregister on unload (delete trash!!!)
  this.refreshListener = {beforeRefresh: function (tP) {
    it.finalize(tP);
  }};
  Webr.event.RefreshCommandProcessor.addListener(this.refreshListener);
  var arrow = $(element).find("a.arrow");
  if (arrow.get(0)) {
    arrow.unbind("click");
    arrow.bind("click", function () {
      it.toggle();
    });
  }

  this.selectionListener = {selectionChanged: function () {
    it.inputElement.setValueNoEvents(it.dataList.getCurrentOption().text);
    it.updateSelection();
  }};
};
{
  var F = new Function();
  F.prototype = Webr.component.ComboComponentBase.prototype;
  Webr.component.ComboBoxComponent.prototype = new F();
  Webr.component.ComboBoxComponent.prototype.constructor = Webr.component.ComboBoxComponent;
  Webr.component.ComboBoxComponent.superclass = Webr.component.ComboComponentBase.prototype;
}

Webr.component.ComboBoxComponent.prototype.finalize = function (templatePath) {
  if (this.componentName.indexOf(templatePath) == 0) {
    this.hide();
    this.deinit();
    this.mainElement.remove();
    Webr.event.RefreshCommandProcessor.removeListener(this.refreshListener);
    this.refreshListener = null;
    delete this.refreshListener;
  }

};
Webr.component.ComboBoxComponent.prototype.makeVisible = function () {
  this.showOptions();
};
Webr.component.ComboBoxComponent.prototype.setVisible = function (visible) {
  if (visible) {
    this.mainElement.show();
  } else {
    this.mainElement.hide();
  }

};
Webr.component.ComboBoxComponent.prototype.inputValueChanged = function (value) {
  this.dataList.narrow(value);
  this.narrowed = value;
};
Webr.component.ComboBoxComponent.prototype.fireKeyDown = function (e) {
  if (e.isKey(Webr.util.Key.ENTER)) {
    this.onEnter();
  }

  if (e.isKey(Webr.util.Key.ESC)) {
    this.onEsc();
  }

  var it = this;
  return this.fire(function (l) {
    if (l.keyDown) {
      return l.keyDown(it, e);
    } else {
      return true;
    }

  });
};
Webr.component.ComboBoxComponent.prototype.makeHidden = function () {
  this.setCurrent(this.currentOption, false);
  var option = this.dataList.getCurrentOption();
  if (option != null && option.empty) {
    this.jQinputElement.addClass("empty");
  } else if (option == null && this.inputElement.value === "") {
    this.jQinputElement.addClass("empty");
  }

  this.hideOptions();
};
Webr.component.ComboBoxComponent.prototype.hideOptions = function () {
  this.listWrapper.hide();
  this.positionWatcher.reset();
  this.onHideOptions();
};
Webr.component.ComboBoxComponent.prototype.showOptions = function () {
  this.listWrapper.show();
  this.jQinputElement.removeClass("empty");
  this.positionWatcher.top = this.countPosition().top;
  this.positionWatcher.fix();
  this.setFocusNoEvents();
  this.onShowOptions();
};
Webr.component.ComboBoxComponent.prototype.updateSelection = function () {
  var text = this.inputElement.value;
  if (text.indexOf(this.narrowed) === 0) {
    this.inputElement.setSelectionRange(this.narrowed.length, text.length);
  } else {
    this.inputElement.select();
  }

};
Webr.component.ComboBoxComponent.prototype.reset = function () {
  this.setCurrent(this.defaultOption, true);
  this.blur();
  this.drop();
};
Webr.component.ComboBoxComponent.prototype.update = function (options, size, from, to, hidePaganation) {
  var it = this;
  //get current 
  var currentId = this.jQinputElement.attr("valueId");
  //If it has size, so we should render list remotely
  this.defaultOption = null;
  this.currentOption = null;
  if (size !== undefined) {
    this.dataList = new Webr.component.RemoteDataList(this);
    if (hidePaganation) {
      if (this.pager) {
        this.pager.hide();
      }

    } else {
      this.from = from;
      this.to = to;
      this.size = size;
      //add fake option, representing, that combobox has more or less elements
      this.updatePager({text: from + "-" + to + " of " + size, id: "summary", empty: false});
      this.pager.show();
    }

  } else {
    this.dataList = new Webr.component.MemoryDataList();
    var noMatch = {text: "<no matches>", id: "nomatch", empty: false, styleClass: "nomatch"};
    this.dataList.addNoMatchOption(new Webr.component.ComboBoxListItem(noMatch));
  }

  //Collect options
  if (options.length == 0) {
    this.dataList.noMatchOption.show();
  } else {
    for (var i = 0; i < options.length; i += 1) {
      var option = options[i];
      var listItem = new Webr.component.ComboBoxListItem(option);
      if (currentId == option.id) {
        this.defaultOption = option;
        this.currentOption = option;
        this.dataList.addDataListItem(listItem, true);
      } else {
        this.dataList.addDataListItem(listItem);
      }

    }

  }

  if (size !== undefined && !(this.dataList.hasCurrent() && !this.dataList.getCurrentOption().empty)) {
    if (options[1] && options[0].empty) {
      this.dataList.setCurrentOption(options[1]);
    } else {
      this.dataList.setCurrentOption(options[0]);
    }

  }

  this.dataList.addListener(this.selectionListener);
  this.dataList.registerClickHandler(function (option) {
    it.submit(option);
  });
  //Render list
  this.renderList();
  if (this.maxHeight > 0 && !this.dataList.isEmpty()) {
    var maxCellHeight = this.dataList.options[0].getElement().outerHeight(true);
    this.jQlist.css("max-height", this.maxHeight * maxCellHeight);
  }

  //Call event after loading
  this.loaded();
};
Webr.component.ComboBoxComponent.prototype.setCurrent = function (o, updateInput) {
  this.inputValueChanged("");
  this.inputElement.setValueNoEvents(o != null ?o.text :"");
  this.currentOption = o;
  this.dataList.setCurrentOption(o);
  if (updateInput) {
    this.updateInputValue(o != null ?o.id :"");
  }

};
Webr.component.ComboBoxComponent.prototype.updateInputValue = function (value) {
  this.inputElement.setAttribute("valueId", value);
};
Webr.component.ComboBoxComponent.prototype.renderList = function () {
  var it = this;
  if (this.listWrapper) {
    this.jQlist.children().remove();
  } else {
    this.createListWrapper();
    this.extraContentWrapper = $(document.createElement("div")).addClass("extraContent").css("width", this.mainElement.width());
    this.jQlist = $(document.createElement("ul")).addClass("comboboxList");
    this.listWrapper.append(it.jQlist);
    this.listWrapper.attr("_cn_", this.mainElement.get(0).id);
    if (this.pager) {
      this.extraContentWrapper.append(this.pager);
      this.listWrapper.append(this.extraContentWrapper);
    }

    if (this.getPositionWatcher() == null) {
      this.setPositionWatcher(new Webr.component.PositionWatcher(this.listWrapper, this.mainElement, this.mainElement));
    }

  }

  this.dataList.forEach(function (item) {
    it.jQlist.append(item.getElement());
  });
};
Webr.component.ComboBoxComponent.prototype.createListWrapper = function () {
  var position = this.countPosition();
  this.listWrapper = $(document.createElement("div")).addClass("contentWrapper").addClass(this.getCustomCssClass()).css("top", position.top).css("left", position.left).css("width", this.mainElement.width()).hide();
  this.root.append(this.listWrapper);
};
Webr.component.ComboBoxComponent.prototype.countPosition = function () {
  var pos = {top: this.mainElement.offset().top - this.root.offset().top, left: this.mainElement.offset().left - this.root.offset().left};
  var position = {top: pos.top + this.mainElement.outerHeight(true), left: pos.left - (this.root.outerWidth(true) - this.root.innerWidth()) / 2};
  return position;
};
Webr.component.ComboBoxComponent.prototype.getCustomCssClass = function () {
  var c = this.mainElement.attr("customClass");
  return c ?c :"";
};
Webr.component.ComboBoxComponent.prototype.submit = function (option) {
  //Check that narrowed is current
  if (this.narrowed !== this.inputElement.value) {
    this.valueChange();
  }

  //if current text doesn't match any option - trigg special event, else submit option
  if (option) {
    this.setCurrent(option, true);
    this.onSubmit();
  } else {
    this.submitInputValue();
  }

  this.fire(function (l) {
    l.submitted(option);
  });
  this.hide();
};
Webr.component.ComboBoxComponent.prototype.submitInputValue = function () {
  this.onSubmitAbsentOption(this.inputElement.value);
};
Webr.component.ComboBoxComponent.prototype.lessClicked = function () {
  this.onLoad(this.narrowed, Math.max(0, 2 * this.from - this.to));
};
Webr.component.ComboBoxComponent.prototype.moreClicked = function () {
  this.onLoad(this.narrowed, this.to);
};
Webr.component.ComboBoxComponent.prototype.callLoading = function (prefix) {
  this.onLoad(prefix);
};
Webr.component.ComboBoxComponent.prototype.updatePager = function (comboOption) {
  var it = this;
  if (this.pager) {
    this.pager.children().remove();
  } else {
    this.pager = $(document.createElement("div")).addClass("pager");
  }

  if (this.from > 0) {
    var prev = $(document.createElement("a")).html("&laquo; prev").attr("href", "javascript:void(0)");
    this.pager.append(prev);
    prev.click(function () {
      it.lessClicked();
    });
  }

  this.pager.append("<span>" + comboOption.text + "</span>");
  if (this.to < this.size) {
    var next = $(document.createElement("a")).html("next &raquo;").attr("href", "javascript:void(0)");
    this.pager.append(next);
    next.click(function () {
      it.moreClicked();
    });
  }

};
Webr.component.ComboBoxComponent.prototype.onLoad = function (prefix, skip) {
  this.mainElement.trigger("Load", {prefix: prefix, skip: skip});
};
Webr.component.ComboBoxComponent.prototype.onSubmit = function () {
  this.mainElement.trigger("Submit");
};
Webr.component.ComboBoxComponent.prototype.onEnter = function () {
};
Webr.component.ComboBoxComponent.prototype.onEsc = function () {
};
Webr.component.ComboBoxComponent.prototype.onSubmitAbsentOption = function (value) {
  this.mainElement.trigger("SubmitAbsentOption", {value: value});
};
Webr.component.ComboBoxComponent.prototype.onShowOptions = function () {
  this.mainElement.trigger("ShowOptions");
};
Webr.component.ComboBoxComponent.prototype.onHideOptions = function () {
  this.mainElement.trigger("HideOptions");
};
Webr.component.ComboBoxComponent.CB_COMPONENT_DATA = "_combo_component_data_";
Webr.component.ComboBoxComponent.register = function (path, comboboxSuffixName) {
  cr.forEach(path, comboboxSuffixName, function () {
    var e = $(this);
    var bindToId = e.attr("bid");
    var ff = function () {
      if (bindToId) {
        return new Webr.component.ComboBoxComponentBind(e.get(0), document.getElementById(bindToId));
      }

      return new Webr.component.ComboBoxComponent(e.get(0));
    };
    if (bindToId) {
      var bindTo = $(document.getElementById(bindToId));
      var _f = function (e) {
        //ignore click to links & images
        if (e.targetIs(["A", "IMG"]) && e.target != bindTo.get(0)) {
          bindTo.one("click", _f);
        } else {
          ff().toggle();
          return false;
        }

      };
      bindTo.one("click", _f);
    } else {
      var div = e.children("div");
      var input = div.children("input");
      var a = div.siblings("a");
      //e is input 
      input.one("focus", function () {
        ff().focus();
      });
      //downarrow near input
      a.one("click", function () {
        //if combobox inited - focus and show options
        ff().toggle();
      });
    }

  });
};
Webr.component.ComboBoxComponent.register2 = function (element, e) {
  //Used hack if click is called from jQuery in Chrome it can not contain any events
  var evt = e || window.event || {};
  if (!evt) {
    throw "Can't get event!";
  }

  var target = $(evt.srcElement ?evt.srcElement :evt.target);
  if (target && target.matches(["A", "IMG"]) && !(target.equals($(element).children()))) {
    return true;
  }

  var div = $(element).data(Webr.component.ComboBoxComponent.CB_COMPONENT_DATA) || $(element).next("div");
  var combo = $(div).data(Webr.component.ComponentRegistry.COMPONENT_INSTANCE);
  if (!combo) {
    $(element).data(Webr.component.ComboBoxComponent.CB_COMPONENT_DATA, div.get(0));
    combo = new Webr.component.ComboBoxContentComponentBind(div.get(0), $(element).children().get(0));
    div.bind("ShowOptions", function () {
      $(element).children().addClass("active");
    }).bind("HideOptions", function () {
      $(element).children().removeClass("active");
    });
    $(element).unbind("click");
  }

  combo.toggle();
  return false;
};
Webr.component.ComboBoxComponent.safeFocus = function (combo) {
  var c;
  if (combo.inputElement) {
    c = combo.jQinputElement;
  } else {
    c = $(combo).find("input");
  }

  c.focus();
  c.select();
};
Webr.component.ComboBoxListItem = function (option) {
  Webr.component.ComboBoxListItem.superclass.constructor.call(this, option);
  this.createElement();
};
{
  var F = new Function();
  F.prototype = Webr.component.DataListItem.prototype;
  Webr.component.ComboBoxListItem.prototype = new F();
  Webr.component.ComboBoxListItem.prototype.constructor = Webr.component.ComboBoxListItem;
  Webr.component.ComboBoxListItem.superclass = Webr.component.DataListItem.prototype;
}

Webr.component.ComboBoxListItem.prototype.createElement = function () {
  var t = this;
  var li = $(document.createElement("li"));
  this.el = li;
  li.addClass(this.option.styleClass);
  if ("nomatch" == this.option.id) {
    li.text(this.option.text);
    this.hide();
  } else {
    li.text(this.option.text);
    li.attr("title", this.option.text);
  }

  return li;
};
Webr.component.ComboBoxListItem.prototype.scroll = function () {
  this.el.scrollTo(this.el.parent().get(0));
};
Webr.component.ComboBoxListItem.prototype.registerClickHandler = function (handler) {
  var it = this;
  this.el.click(function (event) {
    handler.call(it, it.option);
    return false;
  });
};
var regCC = Webr.component.ComboBoxComponent.register;
var regCC2 = Webr.component.ComboBoxComponent.register2;
