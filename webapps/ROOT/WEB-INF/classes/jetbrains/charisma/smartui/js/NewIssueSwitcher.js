charisma.smartui.NewIssueSwitcher = function (newIssueAnchor) {
  charisma.smartui.NewIssueSwitcher.superclass.constructor.call(this);
  this.key = charisma.smartui.NewIssueSwitcher.NEW_ISSUE_TOKEN;
  this.newIssueVisible = false;
  this.current_state = null;
  this.newInlineIssue = $(newIssueAnchor);
  Webr.util.HistoryDispatcher.getInstance().addListener(this);
  this.current_state = charisma.smartui.NewIssueSwitcher.state_SWITCHED_OFF;
};
{
  var F = new Function();
  F.prototype = Webr.util.HistoryChangeListener.prototype;
  charisma.smartui.NewIssueSwitcher.prototype = new F();
  charisma.smartui.NewIssueSwitcher.prototype.constructor = charisma.smartui.NewIssueSwitcher;
  charisma.smartui.NewIssueSwitcher.superclass = Webr.util.HistoryChangeListener.prototype;
}

charisma.smartui.NewIssueSwitcher.prototype.historyChanged = function (token) {
  this.historyChange(token);
};
charisma.smartui.NewIssueSwitcher.prototype.change = function (on) {
  if (on) {
    Webr.util.PageStateStore.getInstance().put(charisma.smartui.NewIssueSwitcher.NEW_ISSUE_TOKEN, "yes");
    this.switchOn();
  } else {
    Webr.util.PageStateStore.getInstance().removeKey(charisma.smartui.NewIssueSwitcher.NEW_ISSUE_TOKEN);
    this.switchOff();
  }

};
charisma.smartui.NewIssueSwitcher.prototype.newIssueEnvironment = function (visible) {
  if (visible) {
    charisma.smartui.App.APP.searchField.blur();
    charisma.smartui.App.APP.searchField.suggester.blur();
  }

  this.newIssueVisible = visible;
};
charisma.smartui.NewIssueSwitcher.prototype.isVisible = function () {
  return this.newIssueVisible;
};
charisma.smartui.NewIssueSwitcher.prototype.switchOn = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "switchOn", arguments);
};
charisma.smartui.NewIssueSwitcher.prototype.switchOff = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "switchOff", arguments);
};
charisma.smartui.NewIssueSwitcher.prototype.newIssueClick = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "newIssueClick", arguments);
};
charisma.smartui.NewIssueSwitcher.prototype.historyChange = function (token) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "historyChange", arguments);
};
charisma.smartui.NewIssueSwitcher.NEW_ISSUE_TOKEN = "newIssue";
charisma.smartui.NewIssueSwitcher.NEW_ISSUE_PAGE_TITLE = "New Issue";
charisma.smartui.NewIssueSwitcher.state_SWITCHED_OFF = {name: "SWITCHED_OFF", onexit: function () {
  this.newIssueEnvironment(true);
  charisma.smartui.NewIssueSwitcher.changeTitle(true);
}, newIssueClick: function () {
  if (true) {
    this.change(true);
    return ;
  }

  return false;
}, historyChange: function (token) {
  if (token.current == "yes") {
    this.newInlineIssue.click();
    return ;
  }

  return false;
}, switchOn: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, charisma.smartui.NewIssueSwitcher.state_SWITCHED_OFF);
    }

    return charisma.smartui.NewIssueSwitcher.state_SWITCHED_ON;
  }

  return false;
}};
charisma.smartui.NewIssueSwitcher.state_SWITCHED_ON = {name: "SWITCHED_ON", onexit: function () {
  this.newIssueEnvironment(false);
  charisma.smartui.NewIssueSwitcher.changeTitle(false);
}, newIssueClick: function () {
  if (true) {
    this.change(false);
    return ;
  }

  return false;
}, historyChange: function (token) {
  if (token.prev == "yes") {
    this.newInlineIssue.click();
    return ;
  }

  return false;
}, switchOff: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, charisma.smartui.NewIssueSwitcher.state_SWITCHED_ON);
    }

    return charisma.smartui.NewIssueSwitcher.state_SWITCHED_OFF;
  }

  return false;
}};
charisma.smartui.NewIssueSwitcher.init = function (anchor) {
  if (!charisma.smartui.NewIssueSwitcher.instance) {
    charisma.smartui.NewIssueSwitcher.ORIGINAL_PAGE_TITLE = document.title;
    charisma.smartui.NewIssueSwitcher.instance = new charisma.smartui.NewIssueSwitcher(anchor);
    if (Webr.util.PageStateStore.getInstance().get(charisma.smartui.NewIssueSwitcher.NEW_ISSUE_TOKEN) === "yes") {
      $(anchor).click();
      charisma.smartui.NewIssueSwitcher.changeTitle(true);
      charisma.smartui.NewIssueSwitcher.instance.switchOn();
    }

  }

};
charisma.smartui.NewIssueSwitcher.changeTitle = function (newIssueVisible) {
  if (newIssueVisible) {
    document.title = charisma.smartui.NewIssueSwitcher.NEW_ISSUE_PAGE_TITLE;
  } else {
    document.title = charisma.smartui.NewIssueSwitcher.ORIGINAL_PAGE_TITLE;
  }

};
