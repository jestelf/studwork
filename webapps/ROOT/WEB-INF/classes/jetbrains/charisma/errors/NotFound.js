cr.setTemplateBind("NotFound", function (path) {
  cr.ach(path, "back", "click", function (event, data) {
    window.history.back();
  });
  cr.ash(path, "login", "click", null);
  cr.ash(path, "issues", "click", null);
});
