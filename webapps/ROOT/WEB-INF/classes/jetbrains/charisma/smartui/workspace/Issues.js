cr.setTemplateBind("Issues", function (path) {
  cr.ash(path, "c" + "." + "tb" + "." + "viewSettings", "click", null);
  cr.ash(path, "sp" + "." + "sl" + "." + "sortByLink", "click", null);
  cr.ash(path, "c" + "." + "tb" + "." + "printIssues", "click", null);
  cr.ash(path, "sp" + "." + "sl" + "." + "saveReportLink", "click", null);
  cr.ash(path, "sp" + "." + "sl" + "." + "saveSearchLink", "click", null);
});
