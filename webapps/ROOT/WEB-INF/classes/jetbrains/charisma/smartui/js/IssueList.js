charisma.smartui.IssueList = function (config) {
  charisma.smartui.IssueList.superclass.constructor.call(this);
  this.focused = false;
  this.items = [];
  this.divToItem = {};
  this.selected = -1;
  this.ch = true;
  this.current_state = null;
  var t = this;
  $(document).keydown(function (e) {
    if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["SelectAll"]) && !e.targetIsInput() && t.focused) {
      charisma.smartui.SelectionActions.triggCheckAllCheckbox();
      return false;
    }

  });
  this.createHandlers();
  var id = Webr.util.PageStateStore.getInstance().get("issueid");
  this.init(config, id);
  this.current_state = charisma.smartui.IssueList.state_NOT_SHIFTED;
};
{
  var F = new Function();
  F.prototype = Webr.component.Component.prototype;
  charisma.smartui.IssueList.prototype = new F();
  charisma.smartui.IssueList.prototype.constructor = charisma.smartui.IssueList;
  charisma.smartui.IssueList.superclass = Webr.component.Component.prototype;
}

charisma.smartui.IssueList.prototype.init = function (config, focusOnId) {
  this.unhandleKeys();
  this.config = config;
  var t = this;
  this.content = $(document.getElementById(config.content));
  var content = this.content;
  this.refresh(focusOnId);
  content.mousedown(function (event) {
    if (content.ancestorOf(event.target) && !t.focused) {
      t.handleKeys();
    }

  });
  if (this.config.focusOnLoad === true) {
    this.focus();
  }

};
charisma.smartui.IssueList.prototype.createHandlers = function () {
  var t = this;
  this.handler = function (event) {
    if (event.isKey(Webr.util.Key.ESC) && t.getSelected() && t.getSelected().editMode) {
      return false;
    }

    if (event.isKey(Webr.util.Key.ESC)) {
      t.unhandleKeys();
    }

    return t.keyhandler(event);
  };
  this.mouseHandler = function (event) {
    if (!t.content.ancestorOf(event.target)) {
      t.unhandleKeys();
    }

  };
  this.keyDownWatcher = function (event) {
    if ((event.isKey(16) || event.isShift(16)) && t.getSelected() && t.getSelected().checkbox) {
      t.shiftDown();
    }

    if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["EditIssue"]) && !event.targetIsInput()) {
      t.edit();
      return false;
    }

  };
  this.keyUpWatcher = function (event) {
    if ((event.isKey(16) || event.isShift(16)) && t.getSelected() && t.getSelected().checkbox) {
      t.shiftUp();
    }

  };
};
charisma.smartui.IssueList.prototype.refresh = function (id) {
  var self = this;
  this.items = [];
  this.content.children("." + "issueContainer").each(function () {
    self.items.push(self.addOrUpdateItem(this, id));
  });
  //Collect all chacked issues
  this.updateCheckedIssuesParam();
};
charisma.smartui.IssueList.prototype.handleKeys = function () {
  if (!this.focused) {
    this.focused = true;
    var it = this;
    var doc = $(Webr.util.Util.isIE ?document.body :document);
    doc.bind("mousedown", it.mouseHandler);
    Webr.util.Util.addKeyHandler($(doc), it.handler);
    $(doc).keydown(it.keyDownWatcher);
    $(doc).keyup(it.keyUpWatcher);
  }

};
charisma.smartui.IssueList.prototype.unhandleKeys = function () {
  if (this.focused) {
    this.focused = false;
    var it = this;
    var doc = $(Webr.util.Util.isIE ?document.body :document);
    doc.unbind("mousedown", it.mouseHandler);
    Webr.util.Util.removeKeyHandler($(doc), it.handler);
    $(doc).unbind("keydown", it.keyDownWatcher);
    $(doc).unbind("keyup", it.keyUpWatcher);
  }

};
charisma.smartui.IssueList.prototype.keyhandler = function (e) {
  if (e.targetIsInput()) {
    return true;
  }

  if (e.isKey(Webr.util.Key.ENTER)) {
    if (this.getSelected() && !e.targetIsInput()) {
      this.getSelected().enter();
      return false;
    }

  }

  if (e.isKey(Webr.util.Key.UP)) {
    var r = this.prev();
    charisma.smartui.TextSelector.clearTextSelection();
    if (!r) {
      return false;
    }

  }

  //Is made for purpose when shift is met from unknow event, i.e. switch to another application
  if (e.isShift(Webr.util.Key.UP)) {
    this.kup();
    this.prev();
    return false;
  }

  if (e.isKey(Webr.util.Key.DOWN)) {
    this.next();
    charisma.smartui.TextSelector.clearTextSelection();
    return false;
  }

  if (e.isShift(Webr.util.Key.DOWN)) {
    this.kdown();
    this.next();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["CollapseIssue"])) {
    this.collapse();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["ExpandIssue"])) {
    this.expand();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["SelectIssue"])) {
    this.check();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["GoToFirst"])) {
    this.first();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["GoToLast"])) {
    this.last();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["SelectIssueIdSummary"])) {
    charisma.smartui.TextSelector.selectText(this.getSelected().issueKeyAnchor, this.getSelected().issueSummaryAnchor);
  }

  return this.fireKeyPressed(e);
};
charisma.smartui.IssueList.prototype.keyDown = function (source, e) {
  if (source instanceof charisma.smartui.CommentsList) {
    if (e.isKey(Webr.util.Key.UP)) {
      this.focus();
      return false;
    }

    if (e.isKey(Webr.util.Key.DOWN)) {
      this.focus();
      this.next();
      return false;
    }

    if (e.isKey(Webr.util.Key.LEFT, Webr.util.Key.ESC)) {
      this.focus();
      this.collapse();
      return false;
    }

  }

  var propagate = this.keyhandler(e);
  if (!propagate) {
    this.focus();
  }

  return propagate;
};
charisma.smartui.IssueList.prototype.addOrUpdateItem = function (selector, issueId) {
  var d = $(selector);
  if (!d) {
    throw "Can't find div for selector [" + selector + "]";
  }

  var i = this.divToItem[d.get(0).id];
  if (i == null) {
    i = new charisma.smartui.IssueListItem(this, d, this.config.toggleEditMode);
    this.divToItem[d.get(0).id] = i;
    if (i.visibleId == issueId) {
      this.selected = this.items.length;
      this.config.focusOnLoad = true;
    }

  } else {
    var checked = i.getChecked();
    i.collectElements(d);
    //restore checked state
    i.setChecked(checked);
    if (this.getSelected() === i) {
      i.addSelectedOrFocusedClass();
      if (this.focused) {
        i.focus();
      }

    }

  }

  return i;
};
charisma.smartui.IssueList.prototype.empty = function () {
  return this.items.length <= 0;
};
charisma.smartui.IssueList.prototype.size = function () {
  return this.items.length;
};
charisma.smartui.IssueList.prototype.focus = function () {
  this.select();
  try {
    this.getSelected().focus();
  } catch (e) {
    return ;
  }

  this.handleKeys();
};
charisma.smartui.IssueList.prototype.select = function () {
  trace("IssueList.select start");
  if (this.getSelected()) {
    this.getSelected().select();
  } else {
    if (!this.getSelected() && !this.empty()) {
      this.selected = 0;
      this.getSelected().select();
    }

  }

  trace("IssueList.select done");
};
charisma.smartui.IssueList.prototype.outline = function () {
  if (this.getSelected()) {
    this.getSelected().outline();
  }

};
charisma.smartui.IssueList.prototype.clearSelection = function () {
  if (this.getSelected()) {
    this.getSelected().unselect();
    if (this.getSelected().commentsList) {
      if (this.getSelected().commentsList.focused) {
        this.getSelected().commentsList.unhandleKeys();
      }

    }

    this.selected = -1;
  }

};
charisma.smartui.IssueList.prototype.mousedown = function (item) {
  if (this.getSelected() === item) {
    this.getSelected().select(false);
  } else {
    this.clearSelection();
    this.selected = jQuery.inArray(item, this.items);
    item.select(false);
  }

  if (item.commentsList) {
    if (item.commentsList.focused) {
      this.unhandleKeys();
      return false;
    }

  }

  return true;
};
charisma.smartui.IssueList.prototype.check = function () {
  if (this.getSelected()) {
    this.getSelected().check();
  }

};
charisma.smartui.IssueList.prototype.next = function () {
  if (this.getSelected() && this.selected < this.size() - 1) {
    this.getSelected().unselect();
    this.selected += 1;
    this.getSelected().select(true);
  } else {
    $(window).scrollTop($(document).height());
  }

};
charisma.smartui.IssueList.prototype.prev = function () {
  if (this.getSelected() && this.selected >= 1) {
    this.getSelected().unselect();
    this.selected -= 1;
    this.getSelected().select(true);
    return false;
  } else {
    $(window).scrollTop(0);
    return true;
  }

};
charisma.smartui.IssueList.prototype.first = function () {
  if (this.getSelected() && this.selected >= 1) {
    this.getSelected().unselect();
    this.selected = 0;
    this.getSelected().select(true);
  } else {
    $(window).scrollTop(0);
  }

};
charisma.smartui.IssueList.prototype.last = function () {
  if (this.getSelected() && this.selected < this.size() - 1) {
    this.getSelected().unselect();
    this.selected = this.size() - 1;
    this.getSelected().select(true);
  } else {
    $(window).scrollTop($(document).height());
  }

};
charisma.smartui.IssueList.prototype.expand = function () {
  if (this.getSelected()) {
    this.getSelected().expand();
  }

};
charisma.smartui.IssueList.prototype.collapse = function () {
  if (this.getSelected()) {
    this.getSelected().collapse();
  }

};
charisma.smartui.IssueList.prototype.edit = function () {
  if (this.getSelected()) {
    this.getSelected().edit();
  }

};
charisma.smartui.IssueList.prototype.getSelected = function () {
  if (this.empty() || this.selected == -1) {
    return null;
  }

  return this.items[this.selected];
};
charisma.smartui.IssueList.prototype.setCheckedAll = function (check) {
  jQuery.each(this.items, function () {
    this.setChecked(check);
  });
  //focus to issues list
  this.focus();
};
charisma.smartui.IssueList.prototype.checkAll = function () {
  jQuery.each(this.items, function () {
    this.setChecked(true);
  });
};
charisma.smartui.IssueList.prototype.uncheckAll = function () {
  jQuery.each(this.items, function () {
    this.setChecked(false);
  });
};
charisma.smartui.IssueList.prototype.updateCheckedIssuesParam = function () {
  this.createCheckedIssuesInput();
  var res = "";
  var first = true;
  jQuery.each(this.items, function () {
    if (this.getChecked()) {
      if (first) {
        first = false;
      } else {
        res += ",";
      }

      res += this.getIssueId();
    }

  });
  this.checkedIssuesInput.value = res;
};
charisma.smartui.IssueList.prototype.createCheckedIssuesInput = function () {
  if (!this.checkedIssuesInput) {
    this.checkedIssuesInput = document.createElement("input");
    this.checkedIssuesInput.type = "hidden";
    this.checkedIssuesInput.name = "hiddenCheckedIssue";
    document.body.appendChild(this.checkedIssuesInput);
  }

};
charisma.smartui.IssueList.prototype.multipleChecked = function () {
  var oneFound = false;
  var res = false;
  jQuery.each(this.items, function () {
    if (this.getChecked()) {
      if (oneFound) {
        res = true;
        return false;
      } else {
        oneFound = true;
      }

    }

  });
  return res;
};
charisma.smartui.IssueList.prototype.thereAreChecked = function () {
  var found = false;
  jQuery.each(this.items, function () {
    if (this.getChecked()) {
      found = true;
      return false;
    }

  });
  return found;
};
charisma.smartui.IssueList.prototype.shiftDown = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "shiftDown", arguments);
};
charisma.smartui.IssueList.prototype.shiftUp = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "shiftUp", arguments);
};
charisma.smartui.IssueList.prototype.kdown = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "kdown", arguments);
};
charisma.smartui.IssueList.prototype.kup = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "kup", arguments);
};
charisma.smartui.IssueList.state_NOT_SHIFTED = {name: "NOT_SHIFTED", onexit: function () {
  this.ch = !(this.getSelected().checkbox.checked);
}, shiftDown: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, charisma.smartui.IssueList.state_NOT_SHIFTED);
    }

    return charisma.smartui.IssueList.state_INITIAL;
  }

  return false;
}};
charisma.smartui.IssueList.state_SHIFTED = {name: "SHIFTED"};
charisma.smartui.IssueList.state_INITIAL = {name: "INITIAL", parentState: charisma.smartui.IssueList.state_SHIFTED, kdown: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, charisma.smartui.IssueList.state_MOVE_DOWN);
    }

    return charisma.smartui.IssueList.state_MOVE_DOWN;
  }

  return false;
}, kup: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, charisma.smartui.IssueList.state_MOVE_UP);
    }

    return charisma.smartui.IssueList.state_MOVE_UP;
  }

  return false;
}, shiftUp: function () {
  if (true) {
    return charisma.smartui.IssueList.state_NOT_SHIFTED;
  }

  return false;
}};
charisma.smartui.IssueList.state_MOVE_DOWN = {name: "MOVE_DOWN", parentState: charisma.smartui.IssueList.state_SHIFTED, onenter: function () {
  this.getSelected().setChecked(this.ch);
}, kdown: function () {
  if (true) {
    this.getSelected().setChecked(this.ch);
    return ;
  }

  return false;
}, kup: function () {
  if (true) {
    this.ch = !this.ch;
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, charisma.smartui.IssueList.state_MOVE_UP);
    }

    return charisma.smartui.IssueList.state_MOVE_UP;
  }

  return false;
}, shiftUp: function () {
  if (true) {
    return charisma.smartui.IssueList.state_NOT_SHIFTED;
  }

  return false;
}};
charisma.smartui.IssueList.state_MOVE_UP = {name: "MOVE_UP", parentState: charisma.smartui.IssueList.state_SHIFTED, onenter: function () {
  this.getSelected().setChecked(this.ch);
}, kup: function () {
  if (true) {
    this.getSelected().setChecked(this.ch);
    return ;
  }

  return false;
}, kdown: function () {
  if (true) {
    this.ch = !this.ch;
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, charisma.smartui.IssueList.state_MOVE_DOWN);
    }

    return charisma.smartui.IssueList.state_MOVE_DOWN;
  }

  return false;
}, shiftUp: function () {
  if (true) {
    return charisma.smartui.IssueList.state_NOT_SHIFTED;
  }

  return false;
}};
charisma.smartui.IssueListConfig = function () {
};
charisma.smartui.IssueListConfig.prototype.toggleEditMode = function (issueId) {
};
charisma.smartui.IssueListItem = function (list, item, toggleEditMode) {
  this.editMode = false;
  this.current_state = null;
  this.list = list;
  this.collectElements(item);
  this.state = charisma.smartui.IssueListItem.UNSELECTED;
  this.descriptionExpanded = false;
  this.commentsExpanded = false;
  this.toggleEditMode = toggleEditMode;
  this.current_state = charisma.smartui.IssueListItem.state_SELECT_NONE;
};
charisma.smartui.IssueListItem.prototype.collectElements = function (item) {
    

  time("collectElements");
    

  this.item = item;
  var t = this;
  var tableFirst = t.item;
  t.issueKeyAnchor = tableFirst.find("." + "issueIdAnchor").get(0);
  $(t.issueKeyAnchor).bind("mousedown", function (event) {
    t.mouseIdDown(event);
  });
  $(t.issueKeyAnchor).bind("mousemove", function (event) {
    t.mouseIdMove(event);
  });
  $(t.issueKeyAnchor).bind("mouseup", function (event) {
    t.mouseIdUp(event);
  });
  t.issueSummaryAnchor = tableFirst.find("." + "issue-summary" + " > a").get(0);
  $(t.issueSummaryAnchor).bind("mousedown", function (event) {
    t.mouseSummaryDown(event);
  });
  $(t.issueSummaryAnchor).bind("mousemove", function (event) {
    t.mouseSummaryMove(event);
  });
  $(t.issueSummaryAnchor).bind("mouseup", function (event) {
    t.mouseSummaryUp(event);
  });
  var tdNum = tableFirst.find("." + "issueId");
  t.issueId = tdNum.attr("iid");
  if (t.issueKeyAnchor) {
    t.visibleId = t.issueKeyAnchor.innerHTML;
  } else {
    t.visibleId = tdNum.children("h2").text();
  }

    

  t.descriptionToggleAnchor = tableFirst.find("." + "toggleDescrAnchor").get(0);
  t.commentsToggleAnchor = item.find("." + "toggleCommentsAnchor").get(0);
  var _checkbox = tableFirst.find("." + "issue-checkbox" + " > input");
    

  timeEnd("collectElements");
    

  if (_checkbox.length > 0) {
    t.checkbox = _checkbox.get(0);
    $(t.checkbox).click(function () {
      if (t.getChecked()) {
        t.ac(t.list.config.checkedItemClass);
      } else {
        t.removeCheckedClass();
        if (charisma.smartui.SelectionActions.checkAllCheckbox.checked) {
          charisma.smartui.SelectionActions.triggCheckAllCheckbox(true);
        }

      }

      t.list.updateCheckedIssuesParam();
    });
    $(t.checkbox).focus(function () {
      //next piece of code was on focus
      if (t.list.getSelected() !== t) {
        t.list.mousedown(t);
      }

      t.focus();
      //end of on focus code
    });
  }

  //Double click has been removed from here!
  this.item.click(function (e) {
    if (!(Webr.util.Util.targetIsInput(e) || Webr.util.Util.targetIs(e, ["A", "IMG"]))) {
      return t.list.mousedown(t);
    }

    if (t.getComments()) {
      if (t.getComments().focused) {
        t.list.unhandleKeys();
      }

    }

  });
};
charisma.smartui.IssueListItem.prototype.ac = function (cls) {
  this.item.addClass(cls);
};
charisma.smartui.IssueListItem.prototype.rc = function (cls) {
  this.item.removeClass(cls);
};
charisma.smartui.IssueListItem.prototype.focus = function () {
  this.item.scrollTo();
  if (this.issueKeyAnchor) {
    this.issueKeyAnchor.focus();
  }

};
charisma.smartui.IssueListItem.prototype.enter = function () {
  if (this.issueKeyAnchor) {
    Webr.Event.redirect(this.issueKeyAnchor.href);
  }

};
charisma.smartui.IssueListItem.prototype.selectItem = function (descriptionExpanded, commentsExpanded, editMode, focus) {
  var it = this;
  this.commentsExpanded = commentsExpanded;
  this.descriptionExpanded = descriptionExpanded;
  this.editMode = editMode;
  if (focus) {
    this.list.mousedown(it);
    this.focus();
  }

};
charisma.smartui.IssueListItem.prototype.getIssueId = function () {
  return this.issueId;
};
charisma.smartui.IssueListItem.prototype.check = function () {
  if (this.checkbox) {
    this.checkbox.click();
  }

};
charisma.smartui.IssueListItem.prototype.setChecked = function (checked) {
  if (!this.checkbox) {
    return ;
  }

  if (this.checkbox.checked != checked) {
    this.checkbox.click();
  } else {
    if (!checked && this.item.hasClass(this.list.config.checkedItemClass)) {
      this.removeCheckedClass();
    }

  }

};
charisma.smartui.IssueListItem.prototype.removeCheckedClass = function () {
  this.rc(this.list.config.checkedItemClass);
  if (!this.list.thereAreChecked() && this.item.hasClass(this.list.config.focusedItemClass)) {
    this.rc(this.list.config.focusedItemClass);
    this.ac(this.list.config.selectedItemClass);
  }

};
charisma.smartui.IssueListItem.prototype.getChecked = function () {
  if (!this.checkbox) {
    return false;
  } else {
    return this.checkbox.checked;
  }

};
charisma.smartui.IssueListItem.prototype.getComments = function () {
  return this.commentsList;
};
charisma.smartui.IssueListItem.prototype.setComments = function (comments) {
  if (this.commentsList) {
    this.commentsList.removeListener(this.list);
    this.commentsList.unhandleKeys();
    this.commentsList = null;
  }

  this.commentsList = comments;
  comments.addListener(this.list);
};
charisma.smartui.IssueListItem.prototype.isCommentsFocused = function () {
  if (this.commentsList) {
    return this.commentsList.isFocused();
  }

  return false;
};
charisma.smartui.IssueListItem.prototype.expand = function () {
  if (!this.descriptionExpanded) {
    this.descriptionExpanded = true;
    $(this.descriptionToggleAnchor).click();
    return false;
  }

  if (this.commentsToggleAnchor) {
    if (!this.commentsExpanded) {
      this.commentsExpanded = true;
      $(this.commentsToggleAnchor).click();
      return false;
    }

    this.list.unhandleKeys();
    try {
      this.commentsList.focus();
    } catch (err) {
    }

  }

};
charisma.smartui.IssueListItem.prototype.collapse = function () {
  if (this.commentsExpanded) {
    try {
      this.commentsList.unfocus();
    } catch (err) {
    }

    this.commentsExpanded = false;
    $(this.commentsToggleAnchor).click();
    return false;
  }

  if (this.descriptionExpanded) {
    this.descriptionExpanded = false;
    $(this.descriptionToggleAnchor).click();
    return false;
  }

};
charisma.smartui.IssueListItem.prototype.edit = function () {
  this.toggleEditMode(this.issueId);
};
charisma.smartui.IssueListItem.prototype.addSelectedOrFocusedClass = function () {
  if (this.list.thereAreChecked()) {
    this.ac(this.list.config.focusedItemClass);
  } else {
    this.ac(this.list.config.selectedItemClass);
  }

};
charisma.smartui.IssueListItem.prototype.select = function (focus) {
  switch (this.state) {
  case charisma.smartui.IssueListItem.UNSELECTED:
    this.addSelectedOrFocusedClass();
    this.state = charisma.smartui.IssueListItem.SELECTED;
        break;

  case charisma.smartui.IssueListItem.SELECTED:
        break;

  }

  if (focus == true) {
    this.focus();
  }

};
charisma.smartui.IssueListItem.prototype.outline = function () {
  this.ac(this.list.config.outlineItemClass);
  var t = this;
  //do not remove class for new issue
};
charisma.smartui.IssueListItem.prototype.unselect = function () {
  switch (this.state) {
  case charisma.smartui.IssueListItem.SELECTED:
    this.rc(this.list.config.selectedItemClass);
    this.rc(this.list.config.focusedItemClass);
    this.state = charisma.smartui.IssueListItem.UNSELECTED;
        break;

  }

};
charisma.smartui.IssueListItem.prototype.mouseIdMove = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseIdMove", arguments);
};
charisma.smartui.IssueListItem.prototype.mouseIdUp = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseIdUp", arguments);
};
charisma.smartui.IssueListItem.prototype.mouseIdDown = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseIdDown", arguments);
};
charisma.smartui.IssueListItem.prototype.mouseSummaryMove = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseSummaryMove", arguments);
};
charisma.smartui.IssueListItem.prototype.mouseSummaryUp = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseSummaryUp", arguments);
};
charisma.smartui.IssueListItem.prototype.mouseSummaryDown = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mouseSummaryDown", arguments);
};
charisma.smartui.IssueListItem.UNSELECTED = 1;
charisma.smartui.IssueListItem.SELECTED = 2;
charisma.smartui.IssueListItem.state_SELECT_NONE = {name: "SELECT_NONE", mouseIdDown: function (event) {
  if (true) {
    charisma.smartui.TextSelector.clearTextSelection();
    return charisma.smartui.IssueListItem.state_SELECT_ITEM;
  }

  return false;
}, mouseSummaryDown: function (event) {
  if (true) {
    charisma.smartui.TextSelector.clearTextSelection();
    return charisma.smartui.IssueListItem.state_SELECT_ITEM;
  }

  return false;
}};
charisma.smartui.IssueListItem.state_SELECT_ITEM = {name: "SELECT_ITEM", mouseIdUp: function (event) {
  if (true) {
    return charisma.smartui.IssueListItem.state_SELECT_NONE;
  }

  return false;
}, mouseSummaryUp: function (event) {
  if (true) {
    return charisma.smartui.IssueListItem.state_SELECT_NONE;
  }

  return false;
}, mouseIdMove: function (event) {
  if (true) {
    this.list.mousedown(this);
    charisma.smartui.TextSelector.selectText(this.issueKeyAnchor, undefined);
    charisma.smartui.TextSelector.state = charisma.smartui.TextSelector.SELECTED_FIRST;
    return charisma.smartui.IssueListItem.state_SELECT_NONE;
  }

  return false;
}, mouseSummaryMove: function (event) {
  if (true) {
    this.list.mousedown(this);
    charisma.smartui.TextSelector.selectText(this.issueKeyAnchor, undefined);
    charisma.smartui.TextSelector.state = charisma.smartui.TextSelector.SELECTED_FIRST;
    charisma.smartui.TextSelector.selectText(undefined, this.issueSummaryAnchor);
    charisma.smartui.TextSelector.state = charisma.smartui.TextSelector.SELECTED_NOTHIG;
    return charisma.smartui.IssueListItem.state_SELECT_NONE;
  }

  return false;
}};
