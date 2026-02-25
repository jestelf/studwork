cr.setTemplateBind("WelcomeSearches", function (path) {
  regt(path, "countIssuesTicker").addServerSideListener(null);
  regt(path, "countIssuesTicker", 5000);
});
