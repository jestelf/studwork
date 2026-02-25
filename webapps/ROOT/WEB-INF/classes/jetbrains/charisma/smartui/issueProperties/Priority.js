cr.setTemplateBind("Priority", function (path) {
  cr.ach(path, "issuePriority", "HideOptions", function (event, data) {
    if (charisma.smartui.App.issueListIsAccessible()) {
      //IssueList can catch ENTER if we set focus too early
      window.setTimeout(function () {
        charisma.smartui.App.APP.issuesList.focus();
      }, 250);
    }

  });
  cr.ash(path, "issuePriority", "Submit", null);
  cr.ash(path, "issuePriority", "Load", {collectFormElements: false});
});
