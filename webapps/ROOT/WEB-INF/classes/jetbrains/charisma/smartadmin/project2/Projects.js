cr.setTemplateBind("Projects", function (path) {
  cr.ash(path, "createNewProject1", "click", null);
  cr.ash(path, "createNewProject2", "click", null);
});
