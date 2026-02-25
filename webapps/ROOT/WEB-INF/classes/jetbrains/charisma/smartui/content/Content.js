cr.setTemplateBind("Content", function (path) {
  cr.ach(path, "tb" + "." + "editIssueLink", "click", function (event, data) {
    if (charisma.smartui.App.getSelectedIssueId() != null) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_toggleEditMode", {__param__issue: charisma.smartui.App.getSelectedIssueId()});
    } else {
      Webr.event.PopupMessage.ERROR.show("No selected issue", 2000);
    }

  });
  cr.ach(path, "tb" + "." + "selectAllCheckbox", "click", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_onSelectAll", {__param__issuesOnPageCount: charisma.smartui.App.APP.issuesList.items.length});
  });
  cr.ash(path, "tb" + "." + "detailLevelLink", "click", null);
  cr.ash(path, "bb" + "." + "issuesPerPage", "change", null);
});
