cr.setTemplateBind("Subsystem", function (path) {
  cr.ach(path, "issueSubsystem", "HideOptions", function (event, data) {
    if (charisma.smartui.App.issueListIsAccessible()) {
      //IssueList can catch ENTER if we set focus too early
      window.setTimeout(function () {
        charisma.smartui.App.APP.issuesList.focus();
      }, 250);
    }

  });
  cr.ash(path, "issueSubsystem", "Submit", null);
  cr.ash(path, "issueSubsystem", "Load", {collectFormElements: false});
});
