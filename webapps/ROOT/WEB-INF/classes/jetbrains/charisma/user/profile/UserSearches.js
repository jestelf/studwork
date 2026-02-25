cr.setTemplateBind("UserSearches", function (path) {
  cr.ach(path, "mSideBarTitleDiv", "click", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "mainSideBar", [])).toggleClass("active");
  });
  cr.ach(path, "pSideBarTitleDiv", "click", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "projectsSideBar", [])).toggleClass("active");
  });
  cr.ach(path, "gSideBarTitleDiv", "click", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "groupsSideBar", [])).toggleClass("active");
  });
  cr.ash(path, "tsb" + "." + "wf" + "." + "toggleSettingsLink", "click", null);
  cr.ash(path, "sqsb" + "." + "wf" + "." + "toggleSettingsLink", "click", null);
  regt(path, "countIssuesTicker").addServerSideListener({collectFormElements: false});
  regt(path, "countIssuesTicker", 5000);
});
