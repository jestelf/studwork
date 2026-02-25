cr.setTemplateBind("IssueTabs", function (path) {
  cr.ash(path, "issueTabs", "tabactivate", null);
  regtab(path, "issueTabs");
});
