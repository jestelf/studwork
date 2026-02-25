cr.setTemplateBind("FixBuild", function (path) {
  cr.ach(path, "issueBuild", "HideOptions", function (event, data) {
    if (charisma.smartui.App.issueListIsAccessible()) {
      //IssueList can catch ENTER if we set focus too early
      window.setTimeout(function () {
        charisma.smartui.App.APP.issuesList.focus();
      }, 250);
    }

  });
  cr.ash(path, "issueBuild", "Submit", null);
  cr.ash(path, "issueBuild", "Load", {collectFormElements: false});
});
