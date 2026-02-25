cr.setTemplateBind("Visibility", function (path) {
  cr.ach(path, "issueVisibility", "HideOptions", function (event, data) {
    if (charisma.smartui.App.issueListIsAccessible()) {
      //IssueList can catch ENTER if we set focus too early
      window.setTimeout(function () {
        charisma.smartui.App.APP.issuesList.focus();
      }, 250);
    }

  });
  cr.ash(path, "issueVisibility", "Submit", null);
  cr.ash(path, "issueVisibility", "Load", {collectFormElements: false});
});
