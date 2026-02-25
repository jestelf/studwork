charisma.smartui.FullScreenIssue = function (config) {
  this.editMode = false;
  this.config = config;
  if (this.config) {
    var it = this;
    $(document).keydown(function (event) {
      //global keys
      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["EditIssue"]) && !event.targetIsInput()) {
        if (!it.commentsList.isFocused()) {
          $(it.config.editButton).click();
          return false;
        }

      }

      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["SwitchToCommentsTab"])) {
        it.config.issueTabs.activateTab(0);
        return false;
      }

      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["SwitchToHistoryTab"])) {
        it.config.issueTabs.activateTab(1);
        return false;
      }

      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["SwitchToLinksTab"])) {
        it.config.issueTabs.activateTab(2);
        return false;
      }

      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["GoBack"])) {
        Webr.Event.redirect(it.config.goBackButton.href);
        return false;
      }

      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["SelectIssueIdSummary"])) {
        if (!it.editMode) {
          charisma.smartui.TextSelector.selectText(it.config.issueIdContainer, it.config.issueSummaryContainer);
        }

      }

    });
  }

  charisma.smartui.FullScreenIssue.instance = this;
};
charisma.smartui.FullScreenIssue.prototype.setNewIssueId = function (newIssueId) {
  this.newIssueId = newIssueId;
};
charisma.smartui.FullScreenIssue.prototype.setCommentsList = function (list) {
  if (this.commentsList) {
    this.commentsList.unhandleKeys();
    this.commentsList = null;
    delete this.commentsList;
  }

  this.commentsList = list;
};
charisma.smartui.FullScreenIssue.instance = null;
charisma.smartui.FullScreenIssue.getIssueId = function () {
  return charisma.smartui.FullScreenIssue.instance.newIssueId ?charisma.smartui.FullScreenIssue.instance.newIssueId :charisma.smartui.FullScreenIssue.instance.config.issueId;
};
charisma.smartui.FullScreenIssue.toggleEditMode = function (edit) {
  charisma.smartui.FullScreenIssue.instance.editMode = edit;
  charisma.smartui.TextSelector.clearTextSelection();
};
charisma.smartui.FullScreenIssueConfig = function () {
};
