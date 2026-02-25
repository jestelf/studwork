cr.setTemplateBind("Type", function (path) {
  cr.ach(path, "issueType", "HideOptions", function (event, data) {
    if (charisma.smartui.App.issueListIsAccessible()) {
      //IssueList can catch ENTER if we set focus too early
      window.setTimeout(function () {
        charisma.smartui.App.APP.issuesList.focus();
      }, 250);
    }

  });
  cr.ash(path, "issueType", "Submit", null);
  cr.ash(path, "issueType", "Load", {collectFormElements: false});
});
