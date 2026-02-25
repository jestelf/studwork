cr.setTemplateBind("ChangePassword", function (path) {
  cr.ash(path, "saveChangedPassword", "click", null);
});
