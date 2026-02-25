cr.setTemplateBind("Error", function (path) {
  cr.ach(path, "backLink", "click", function (event, data) {
    window.history.back();
  });
});
