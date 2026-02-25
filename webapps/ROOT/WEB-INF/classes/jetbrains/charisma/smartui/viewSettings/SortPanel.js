cr.setTemplateBind("SortPanel", function (path) {
  cr.ash(path, "unsortedLink", "click", null);
  cr.ash(path, "sortedLink", "click", null);
  cr.ash(path, "add", "click", null);
  cr.ash(path, "remove", "click", null);
});
