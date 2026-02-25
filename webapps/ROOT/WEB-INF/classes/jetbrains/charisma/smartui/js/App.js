charisma.smartui.App = function (fullScreenIssue) {
  charisma.smartui.App.superclass.constructor.call(this);
  this.newIssueIsActive = false;
  this.disableHistory = true;
  this.fullIssueScreen = fullScreenIssue || false;
  var t = this;
  var d = $(document);
  d.keydown(function (e) {
    if (t.newCommandDialog && t.newCommandDialog.isVisible()) {
      return true;
    }

    if (!e.targetIsInput() && Webr.util.Key.isApplicable(e, SmartUIShortCuts["ToggleSearchField"]) && (!charisma.smartui.App.APP.issuesList || !charisma.smartui.App.APP.issuesList.focused)) {
      t.searchField.focus();
      return false;
    }

    if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["NewIssue"])) {
      t.newInlineIssue.click();
      return false;
    }

    //This hot keys works only on keyDown, workaround for strange behaviour in FF
    if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["IncreaseIssueVisibility"])) {
      t.changeDetailLevel(true);
      return false;
    }

    if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["DecreaseIssueVisibility"])) {
      t.changeDetailLevel(false);
      return false;
    }

  });
  trace("App created");
};
{
  var F = new Function();
  F.prototype = Webr.component.ComponentListener.prototype;
  charisma.smartui.App.prototype = new F();
  charisma.smartui.App.prototype.constructor = charisma.smartui.App;
  charisma.smartui.App.superclass = Webr.component.ComponentListener.prototype;
}

charisma.smartui.App.prototype.setNewInlineIssue = function (newIssue) {
  this.newInlineIssue = $(newIssue);
  //Magic timeout (don't know why, but it helps)
  //if timeout smaller than 250 
  window.setTimeout(function () {
    charisma.smartui.NewIssueSwitcher.init(newIssue);
  }, 300);
};
charisma.smartui.App.prototype.setSearchField = function (searchField, forceComplete) {
  this.searchField = searchField;
  this.setComponent("searchSuggest", searchField.getSuggest());
  this.forceComplete = forceComplete;
};
charisma.smartui.App.prototype.setSearchQuery = function (query) {
  this.searchField.focus();
  this.searchField.value = query;
};
charisma.smartui.App.prototype.setNewIssueActive = function (active) {
  this.newIssueIsActive = active;
  charisma.smartui.NewIssueSwitcher.instance.change(active);
};
charisma.smartui.App.prototype.setSearchUrl = function (url) {
  this.searchUrl = url;
};
charisma.smartui.App.prototype.setDetailLevelLinks = function (detailLevelLinks) {
  delete this.detailLevelLinks;
  this.detailLevelLinks = detailLevelLinks;
};
charisma.smartui.App.prototype.changeDetailLevel = function (increase) {
  var length = this.detailLevelLinks.length;
  for (var i = 0; i < length; ++i) {
    var link = $(this.detailLevelLinks[i]);
    if (link.hasClass("active")) {
      var n = increase ?1 :-1;
      var inc = (length + (i + n)) % length;
      $(this.detailLevelLinks[inc]).click();
      return ;
    }

  }

};
charisma.smartui.App.prototype.setNewCommand = function (commandsDialog) {
  this.setComponent("newCommandDialog", commandsDialog);
};
charisma.smartui.App.prototype.updateIssueList = function (config) {
  if (config) {
    var list = this.issuesList;
    if (!list) {
      list = new charisma.smartui.IssueList(config);
      this.setComponent("issuesList", list);
      list.select();
    } else {
      list.init(config);
    }

  }

};
charisma.smartui.App.prototype.setRecentSearches = function (recentSearchesList) {
  this.recentSearchesList = recentSearchesList;
};
charisma.smartui.App.prototype.setComponent = function (name, component) {
  if (this[name]) {
    this[name].removeListener(this);
  }

  this[name] = component;
  component.addListener(this);
};
charisma.smartui.App.prototype.keyPressed = function (source, e) {
  switch (source) {
  case this.searchSuggest:
    return this.searchSuggestKeyEvent(e);
  case this.issuesList:
    return this.issueListKeyPressed(e);
  }

  return true;
};
charisma.smartui.App.prototype.keyDown = function (source, e) {
  switch (source) {
  case this.searchSuggest:
    return this.searchSuggestKeyEvent(e);
  }

  return true;
};
charisma.smartui.App.prototype.commandsHide = function (source) {
  if (this.issuesList) {
    this.issuesList.focus();
  }

};
charisma.smartui.App.prototype.searchSuggestKeyEvent = function (e) {
  if (e.isKey(Webr.util.Key.TAB)) {
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["SubmitSearchField"])) {
    this.doSearchRequest();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["ToggleSearchField"]) && this.issuesList) {
    this.issuesList.focus();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["MoveToIssueListFromSearchField"]) && this.issuesList) {
    this.issuesList.focus();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["ForceComplete"])) {
    this.forceComplete();
    return false;
  }

    

  return true;
};
charisma.smartui.App.prototype.issueListKeyPressed = function (e) {
  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["ToggleSearchField"])) {
    if (this.issuesList.thereAreChecked()) {
      if (charisma.smartui.SelectionActions.checkAllCheckbox.checked) {
        charisma.smartui.SelectionActions.triggCheckAllCheckbox();
      }

      this.issuesList.setCheckedAll(false);
      return false;
    }

    this.searchField.focus();
    return false;
  }

  if (Webr.util.Key.isApplicable(e, SmartUIShortCuts["MoveToSearchFieldFromIssueList"])) {
    this.searchField.focus();
  }

  var comments = this.issuesList.getSelected().getComments();
  if (comments) {
    if (comments.newCommentTextAreaFocused) {
      return true;
    }

  }

  return true;
};
charisma.smartui.App.prototype.getQuery = function () {
  return this.searchField.value;
};
charisma.smartui.App.prototype.doSearchRequest = function () {
  var loc = this.searchUrl;
  if (this.getQuery() && this.getQuery().length > 0) {
    var encoded = encodeURIComponent(this.getQuery());
    encoded = encoded.replaceAll("%20", "+");
    encoded = encoded.replaceAll("{", "%7B");
    encoded = encoded.replaceAll("}", "%7D");
    loc += "?q=" + encoded;
  }

  Webr.Event.redirect(loc);
};
charisma.smartui.App.getSelectedIssueId = function () {
  if (charisma.smartui.App.newIssueId) {
    return charisma.smartui.App.newIssueId;
  }

  if (charisma.smartui.App.APP.issuesList != null && charisma.smartui.App.APP.issuesList.getSelected() != null) {
    return charisma.smartui.App.APP.issuesList.getSelected().getIssueId();
  }

  return null;
};
charisma.smartui.App.setNewIssueId = function (newIssueId) {
  charisma.smartui.App.newIssueId = newIssueId;
};
charisma.smartui.App.issueListIsAccessible = function () {
  return charisma.smartui.App.APP && charisma.smartui.App.APP.issuesList && !charisma.smartui.App.APP.newIssueIsActive;
};
charisma.smartui.App.setFocusToSearchField = function () {
  try {
    charisma.smartui.App.APP.searchField.focus();
  } catch (e) {
  }

};
