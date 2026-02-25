cr.setTemplateBind("Searches", function (path) {
  cr.ash(path, "sqsb" + "." + "wf" + "." + "toggleSettingsLink", "click", null);
  cr.ash(path, "tsb" + "." + "wf" + "." + "toggleSettingsLink", "click", null);
  regt(path, "countIssuesTicker").addServerSideListener({collectFormElements: false});
  regt(path, "countIssuesTicker", 5000);
});
