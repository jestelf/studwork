cr.setTemplateBind("IconProperties2", function (path) {
  cr.ash(path, "f" + "." + "favorite", "click", null);
  cr.ash(path, "v" + "." + "vote", "click", null);
});
