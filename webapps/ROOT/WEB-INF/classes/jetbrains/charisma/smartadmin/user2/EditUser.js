cr.setTemplateBind("EditUser", function (path) {
  cr.ash(path, "editUserPanel", "tabactivate", null);
  cr.ash(path, "ban", "click", null);
  regtab(path, "editUserPanel");
});
