cr.setTemplateBind("IssueReports", function (path) {
  regt(path, "calculateReports").addServerSideListener(null, "ticks");
});
