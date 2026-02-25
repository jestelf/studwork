cr.setTemplateBind("IssueContent", function (path) {
  cr.ach(path, "icr" + "." + "lp" + "." + "showLinksTab", "click", function (event, data) {
    if (cr.findInHandler(event, "" + "." + "it" + "." + "issueTabs", []).activeTabIndex != 2) {
      cr.findInHandler(event, "" + "." + "it" + "." + "issueTabs", []).activateTab(2);
    }

  });
  cr.ash(path, "icr" + "." + "ap" + "." + "ua" + "." + "deleteFile", "click", null);
});
