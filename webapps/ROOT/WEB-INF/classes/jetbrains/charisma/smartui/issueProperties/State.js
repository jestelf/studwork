cr.setTemplateBind("State", function (path) {
  cr.ach(path, "issueState", "HideOptions", function (event, data) {
    if (charisma.smartui.App.issueListIsAccessible()) {
      //IssueList can catch ENTER if we set focus too early
      window.setTimeout(function () {
        charisma.smartui.App.APP.issuesList.focus();
      }, 250);
    }

  });
  cr.ash(path, "issueState", "Submit", null);
  cr.ash(path, "issueState", "Load", {collectFormElements: false});
});
