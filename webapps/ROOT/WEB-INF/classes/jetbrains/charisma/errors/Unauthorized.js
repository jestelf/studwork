cr.setTemplateBind("Unauthorized", function (path) {
  cr.ach(path, "back", "click", function (event, data) {
    window.history.back();
  });
  cr.ash(path, "relogin", "click", null);
});
