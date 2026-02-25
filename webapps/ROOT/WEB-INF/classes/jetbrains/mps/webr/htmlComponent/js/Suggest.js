Webr.component.Suggest = function (input, config) {
  Webr.component.Suggest.superclass.constructor.call(this);
  this.suggestDivPosition = "absolute";
  this.selectedIndex = -1;
  this.current_state = null;
  this.input = input;
  this.config = config || {baseSuggestOffset: -5};
  this.initHandlers();
  this.current_state = Webr.component.Suggest.state_UNFOCUSED;
};
{
  var F = new Function();
  F.prototype = Webr.component.Component.prototype;
  Webr.component.Suggest.prototype = new F();
  Webr.component.Suggest.prototype.constructor = Webr.component.Suggest;
  Webr.component.Suggest.superclass = Webr.component.Component.prototype;
}

Webr.component.Suggest.prototype.initHandlers = function () {
  var t = this;
  var textInputQuery = $(this.input);
    

  //Handle blur
  var d = $(Webr.util.Util.isIE ?document.body :document);
  d.mousedown(function (event) {
    if (t.suggestDiv != null) {
      if (!$(t.suggestDiv).ancestorOf(event.target, true) && !textInputQuery.ancestorOf(event.target, true)) {
        t.blur();
      }

    }

  });
    

  //Handle focus
  textInputQuery.focus(function (event) {
    t.focus();
  });
    

  //Handle keyboard
  textInputQuery.keyrepeatable(function (e) {
    t.keyPressed(e);
    if (!e.isPropagationStopped()) {
      return t.fireKeyDown(e);
    } else {
      return false;
    }

  });
};
Webr.component.Suggest.prototype.show = function (empty) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "show", arguments);
};
Webr.component.Suggest.prototype.focus = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "focus", arguments);
};
Webr.component.Suggest.prototype.blur = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "blur", arguments);
};
Webr.component.Suggest.prototype.keyPressed = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "keyPressed", arguments);
};
Webr.component.Suggest.prototype.mouseMove = function (event, itemIndex) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseMove", arguments);
};
Webr.component.Suggest.prototype.mouseClicked = function (event, itemIndex) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseClicked", arguments);
};
Webr.component.Suggest.prototype.getSelectedItem = function () {
  var i = this.selectedIndex;
  if (this.isEmpty() || i < 0 || i >= this.data.items.length) {
    return null;
  }

  return this.data.items[i];
};
Webr.component.Suggest.prototype.isEmpty = function () {
  return this.data == null || this.data.items.length <= 0;
};
Webr.component.Suggest.prototype.select = function (index, mouseSelect) {
  Webr.component.SuggestItem.select(this.getSelectedItem(), Webr.component.SuggestItem.SELECT_NONE);
  this.selectedIndex = index;
  var selectedItem = this.getSelectedItem();
  this.selectedOption = selectedItem != null ?selectedItem.o :null;
  Webr.component.SuggestItem.select(selectedItem, mouseSelect ?Webr.component.SuggestItem.SELECT_IMPLICIT :Webr.component.SuggestItem.SELECT_EXPLCIT);
};
Webr.component.Suggest.prototype.hide = function () {
  this.setVisible(false);
};
Webr.component.Suggest.prototype.setVisible = function (visible) {
  if (this.suggestDiv != null) {
    this.suggestDiv.style.display = visible ?"block" :"none";
  }

};
Webr.component.Suggest.prototype.findSelectedOption = function () {
  var selectedIndex = -1;
  if (this.selectedOption != null) {
    var dlen = this.data.items.length;
    for (var i = 0; i < dlen; ++i) {
      if (this.data.items[i].o == this.selectedOption) {
        selectedIndex = i;
                break;

      }

    }

  }

  return selectedIndex;
};
Webr.component.Suggest.prototype.getPrevious = function () {
  return this.selectedIndex > 0 ?this.selectedIndex - 1 :this.data.items.length - 1;
};
Webr.component.Suggest.prototype.getNext = function () {
  return this.selectedIndex + 1 < this.data.items.length ?this.selectedIndex + 1 :0;
};
Webr.component.Suggest.prototype.suggest = function (data) {
  this.data = data;
  var items = [];
    

  if (this.suggestDiv == null) {
    this.suggestDiv = document.createElement("div");
    this.suggestDiv.className = "suggest";
    if (this.suggestDivPosition) {
      this.suggestDiv.style.position = this.suggestDivPosition;
    }

        

    this.commentDiv = document.createElement("div");
    this.commentDiv.className = "comment";
    this.implicitCompleteComment = document.createTextNode("Use " + (Webr.util.Util.isMac ?"\u21E5" :"Tab") + " to complete first item");
    this.explicitCompleteComment = document.createTextNode("Use " + (Webr.util.Util.isMac ?"\u23CE" :"Enter") + " to complete selected item");
    this.commentDiv.appendChild(this.implicitCompleteComment);
    this.suggestDiv.appendChild(this.commentDiv);
        

    document.body.appendChild(this.suggestDiv);
  }

    

  var df = document.createDocumentFragment();
  var ul = document.createElement("ul");
  df.appendChild(ul);
  var index = 0;
  for (var i = 0; i < data.items.length; i += 1) {
    var li;
    if (!(data.items[i].sep)) {
      var optionClassName = "option";
      if (this.selectedIndex == -1 && index == 0) {
        optionClassName += " " + "defaultCurrent";
      }

      if (this.selectedIndex == index) {
        optionClassName += " " + "current";
      }

      li = Webr.component.SuggestItem.createLi(data.items[i], optionClassName);
      $(li).bind("mousemove", {suggest: this, optionIndex: index}, Webr.component.Suggest.optionMouseMove);
      $(li).bind("click", {suggest: this, optionIndex: index}, Webr.component.Suggest.optionClick);
      items.push(data.items[i]);
      ++index;
    } else {
      li = Webr.component.SuggestItem.createSeparator(data.items[i]);
    }

    ul.appendChild(li);
  }

  this.data.items = items;
    

  var oldUl = this.suggestDiv.getElementsByTagName("ul").item(0);
  if (oldUl == null) {
    this.suggestDiv.insertBefore(df, this.commentDiv);
  } else {
    $(oldUl).replaceWith(df);
  }

    

  if (!this.isEmpty()) {
    var baseItem = data.items[0];
    var position = baseItem.cs;
    var value = this.input.value;
    var meterText = position >= 0 ?value.substring(0, position) :"";
    var textWidth = Webr.component.FontMetrics.stringWidth(this.input, meterText) + this.config.baseSuggestOffset;
    var offset = this.getInputPosition();
        

    this.suggestDiv.style.left = -5000 + "px";
    var suggestWidth = $(this.suggestDiv).width();
    var maxSuggestOffset = offset.left + this.input.offsetWidth;
    var preferedLeft = (offset.left + textWidth);
    var left = Math.min(preferedLeft, Math.max(maxSuggestOffset - suggestWidth, offset.left));
        

    this.suggestDiv.style.top = (offset.top + this.input.offsetHeight) + "px";
    this.suggestDiv.style.left = left + "px";
    this.suggestDiv.style.maxWidth = this.input.offsetWidth + "px";
  }

    

  this.show(this.data.items.length <= 0);
};
Webr.component.Suggest.prototype.getInputPosition = function () {
  return $(this.input).offset();
};
Webr.component.Suggest.prototype.setImplicitCompleteComment = function () {
  var currentText = this.commentDiv.childNodes.item(0);
  if (currentText != this.implicitCompleteComment) {
    this.commentDiv.replaceChild(this.implicitCompleteComment, currentText);
  }

};
Webr.component.Suggest.prototype.setExplicitCompleteComment = function () {
  var currentText = this.commentDiv.childNodes.item(0);
  if (currentText != this.explicitCompleteComment) {
    this.commentDiv.replaceChild(this.explicitCompleteComment, currentText);
  }

};
Webr.component.Suggest.prototype.complete = function (itemIndex, substitute) {
  var item = this.data.items[itemIndex];
  var curValue = this.data.query;
  var pre = curValue.substring(0, item.cs);
  if (item.pre != null) {
    pre = pre + item.pre;
  }

  var post = curValue.substring(substitute ?item.ce :this.data.caret);
  if (item.suf != null) {
    post = item.suf + post;
  }

  var toAdd = item.o;
  var newValue = pre + toAdd + post;
  this.input.value = newValue;
  var newCaretPosition;
  if (item.cp != null) {
    newCaretPosition = item.cp;
  } else {
    newCaretPosition = newValue.length - post.length;
  }

  this.input.setCaretPosition(newCaretPosition);
};
Webr.component.Suggest.state_UNFOCUSED = {name: "UNFOCUSED", focus: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_HIDDEN);
    }

    return Webr.component.Suggest.state_HIDDEN;
  }

  return false;
}};
Webr.component.Suggest.state_HIDDEN = {name: "HIDDEN", onenter: function () {
  this.select(-1, false);
}, blur: function () {
  if (true) {
    return Webr.component.Suggest.state_UNFOCUSED;
  }

  return false;
}, show: function (empty) {
  if (empty == false) {
    this.setVisible(true);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_NOTHING_SELECTED);
    }

    return Webr.component.Suggest.state_NOTHING_SELECTED;
  }

  return false;
}};
Webr.component.Suggest.state_VISIBLE = {name: "VISIBLE", show: function (empty) {
  if (empty == true) {
    this.setVisible(false);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_HIDDEN);
    }

    return Webr.component.Suggest.state_HIDDEN;
  }

  return false;
}, blur: function () {
  if (true) {
    this.setVisible(false);
    return Webr.component.Suggest.state_UNFOCUSED;
  }

  return false;
}, keyPressed: function (event) {
  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["Close"])) {
    this.setVisible(false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_HIDDEN);
    }

    return Webr.component.Suggest.state_HIDDEN;
  }

  return false;
}, mouseClicked: function (event, itemIndex) {
  if (true) {
    $(this.input).focus();
    this.complete(itemIndex, false);
    this.setVisible(false);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_HIDDEN);
    }

    return Webr.component.Suggest.state_HIDDEN;
  }

  return false;
}};
Webr.component.Suggest.state_NOTHING_SELECTED = {name: "NOTHING_SELECTED", parentState: Webr.component.Suggest.state_VISIBLE, onenter: function () {
  this.setImplicitCompleteComment();
}, keyPressed: function (event) {
  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["ImplicitComplete"])) {
    this.complete(0, true);
    this.setVisible(false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_HIDDEN);
    }

    return Webr.component.Suggest.state_HIDDEN;
  }

  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["ImplicitComplete"])) {
    event.stopPropagation();
    return ;
  }

  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["PreviousItem"])) {
    this.select(this.data.items.length - 1, false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_SELECTED_WITH_KEYBOARD);
    }

    return Webr.component.Suggest.state_SELECTED_WITH_KEYBOARD;
  }

  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["NextItem"])) {
    this.select(0, false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_SELECTED_WITH_KEYBOARD);
    }

    return Webr.component.Suggest.state_SELECTED_WITH_KEYBOARD;
  }

  return false;
}, show: function (empty) {
  if (empty == false) {
    this.setVisible(true);
    return ;
  }

  return false;
}, mouseMove: function (event, itemIndex) {
  if (true) {
    this.select(itemIndex, true);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_SELECTED_WITH_MOUSE);
    }

    return Webr.component.Suggest.state_SELECTED_WITH_MOUSE;
  }

  return false;
}};
Webr.component.Suggest.state_ITEM_SELECTED = {name: "ITEM_SELECTED", parentState: Webr.component.Suggest.state_VISIBLE, keyPressed: function (event) {
  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["PreviousItem"])) {
    this.select(this.getPrevious(), false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_SELECTED_WITH_KEYBOARD);
    }

    return Webr.component.Suggest.state_SELECTED_WITH_KEYBOARD;
  }

  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["NextItem"])) {
    this.select(this.getNext(), false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_SELECTED_WITH_KEYBOARD);
    }

    return Webr.component.Suggest.state_SELECTED_WITH_KEYBOARD;
  }

  return false;
}};
Webr.component.Suggest.state_SELECTED_WITH_MOUSE = {name: "SELECTED_WITH_MOUSE", parentState: Webr.component.Suggest.state_ITEM_SELECTED, onenter: function () {
  this.setImplicitCompleteComment();
}, keyPressed: function (event) {
  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["ImplicitComplete"])) {
    this.complete(0, true);
    this.setVisible(false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_HIDDEN);
    }

    return Webr.component.Suggest.state_HIDDEN;
  }

  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["ImplicitComplete"])) {
    event.stopPropagation();
    return ;
  }

  return false;
}, show: function (empty) {
  if (empty == false) {
    this.select(-1, false);
    this.setVisible(true);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_NOTHING_SELECTED);
    }

    return Webr.component.Suggest.state_NOTHING_SELECTED;
  }

  return false;
}, mouseMove: function (event, itemIndex) {
  if (itemIndex != this.selectedIndex) {
    this.select(itemIndex, true);
    return ;
  }

  return false;
}};
Webr.component.Suggest.state_SELECTED_WITH_KEYBOARD = {name: "SELECTED_WITH_KEYBOARD", parentState: Webr.component.Suggest.state_ITEM_SELECTED, onenter: function () {
  this.setExplicitCompleteComment();
}, keyPressed: function (event) {
  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["ExplicitComplete"])) {
    this.complete(this.selectedIndex, false);
    this.setVisible(false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_HIDDEN);
    }

    return Webr.component.Suggest.state_HIDDEN;
  }

  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["SpaceComplete"])) {
    this.complete(this.selectedIndex, false);
    this.setVisible(false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_HIDDEN);
    }

    return Webr.component.Suggest.state_HIDDEN;
  }

  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["ImplicitComplete"])) {
    this.complete(this.selectedIndex, true);
    this.setVisible(false);
    event.stopPropagation();
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_HIDDEN);
    }

    return Webr.component.Suggest.state_HIDDEN;
  }

  if (Webr.util.Key.isApplicable(event, SuggestKeyStrokes["ExplicitComplete"]) || Webr.util.Key.isApplicable(event, SuggestKeyStrokes["SpaceComplete"]) || Webr.util.Key.isApplicable(event, SuggestKeyStrokes["ImplicitComplete"])) {
    event.stopPropagation();
    return ;
  }

  return false;
}, show: function (empty) {
  if ((empty == false) && empty == false && this.findSelectedOption() == -1) {
    this.select(-1, false);
    this.setVisible(true);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Suggest.state_NOTHING_SELECTED);
    }

    return Webr.component.Suggest.state_NOTHING_SELECTED;
  }

  if ((empty == false) && empty == false && this.findSelectedOption() != -1) {
    this.select(this.findSelectedOption(), false);
    this.setVisible(true);
    return ;
  }

  return false;
}, mouseMove: function (event, itemIndex) {
  if (itemIndex != this.selectedIndex) {
    this.select(itemIndex, false);
    return ;
  }

  return false;
}};
Webr.component.Suggest.optionMouseOver = function (event) {
  var index = event.data.optionIndex;
  var suggest = event.data.suggest;
};
Webr.component.Suggest.optionMouseMove = function (event) {
  var index = event.data.optionIndex;
  var suggest = event.data.suggest;
  suggest.mouseMove(event, index);
};
Webr.component.Suggest.optionClick = function (event) {
  var index = event.data.optionIndex;
  var suggest = event.data.suggest;
  suggest.mouseClicked(event, index);
};
Webr.component.SuggestConfig = function () {
};
Webr.component.SuggestData = function () {
};
Webr.component.SuggestItem = function () {
};
Webr.component.SuggestItem.SELECT_NONE = 0;
Webr.component.SuggestItem.SELECT_EXPLCIT = 1;
Webr.component.SuggestItem.SELECT_IMPLICIT = 2;
Webr.component.SuggestItem.select = function (suggestItem, selectType) {
  if (suggestItem != null && suggestItem.li != null) {
    if (selectType == Webr.component.SuggestItem.SELECT_NONE) {
      $(suggestItem.li).removeClass("current");
    }

    if (selectType == Webr.component.SuggestItem.SELECT_IMPLICIT) {
      $(suggestItem.li).addClass("current");
    }

    if (selectType == Webr.component.SuggestItem.SELECT_EXPLCIT) {
      $(suggestItem.li).addClass("current");
    }

  }

};
Webr.component.SuggestItem.createLi = function (item, optionClassName) {
  var liElement = document.createElement("li");
  liElement.className = optionClassName;
    

  //Option
  var optionSpan = document.createElement("span");
  optionSpan.className = "option" + " optionType" + item.t;
    

  //Prefix
  if (item.pre != null && item.pre.length > 0) {
    var prefixElement = document.createElement("span");
    prefixElement.className = "prefix";
    prefixElement.appendChild(document.createTextNode(item.pre));
    optionSpan.appendChild(prefixElement);
  }

    

  //Matching
  var matchIndex = 0 <= item.ms && item.ms < item.o.length ?item.ms :-1;
  if (matchIndex >= 0) {
    if (matchIndex > 0) {
      optionSpan.appendChild(document.createTextNode(item.o.substring(0, matchIndex)));
    }

        {
      var matchedSpan = document.createElement("span");
      matchedSpan.className = "match";
      matchedSpan.appendChild(document.createTextNode(item.o.substring(matchIndex, item.me)));
      optionSpan.appendChild(matchedSpan);
    }

    if (item.me < item.o.length) {
      optionSpan.appendChild(document.createTextNode(item.o.substring(item.me)));
    }

  } else {
    optionSpan.appendChild(document.createTextNode(item.o));
  }

  liElement.appendChild(optionSpan);
    

  //Suffix
  if (item.suf != null && item.suf.length > 0) {
    var prefixElement = document.createElement("span");
    prefixElement.className = "suffix";
    prefixElement.appendChild(document.createTextNode(item.suf));
    optionSpan.appendChild(prefixElement);
  }

    

  //Description
  var descriptionSpan = document.createElement("span");
  descriptionSpan.className = "description";
  matchIndex = item.ms >= item.o.length ?item.ms - item.o.length :-1;
  if (matchIndex >= 0) {
    if (matchIndex > 0) {
      descriptionSpan.appendChild(document.createTextNode(item.d.substring(0, matchIndex)));
    }

        {
      var matchedSpan = document.createElement("span");
      matchedSpan.className = "match";
      matchedSpan.appendChild(document.createTextNode(item.d.substring(matchIndex, item.me - item.o.length)));
      descriptionSpan.appendChild(matchedSpan);
    }

    if (item.me - item.o.length < item.d.length) {
      descriptionSpan.appendChild(document.createTextNode(item.d.substring(item.me - item.o.length)));
    }

  } else if (item.hd) {
    descriptionSpan.innerHTML = item.d;
  } else {
    descriptionSpan.appendChild(document.createTextNode(item.d));
  }

  liElement.appendChild(descriptionSpan);
    

  item.li = liElement;
  return liElement;
};
Webr.component.SuggestItem.createSeparator = function (item) {
  var liElement = document.createElement("li");
  liElement.className = "separator";
    

  //Description
  var descriptionSpan = document.createElement("span");
  descriptionSpan.className = "description";
  descriptionSpan.appendChild(document.createTextNode(item.d));
    

  liElement.appendChild(descriptionSpan);
  return liElement;
};
