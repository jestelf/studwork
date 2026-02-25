cr.setTemplateBind("IconProperties", function (path) {
  cr.ash(path, "f" + "." + "favorite", "click", null);
  cr.ash(path, "v" + "." + "vote", "click", null);
  cr.ash(path, "w" + "." + "watch", "click", null);
});
