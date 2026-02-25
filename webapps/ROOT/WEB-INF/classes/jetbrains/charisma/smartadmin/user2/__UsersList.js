cr.setTemplateBind("__UsersList", function (path) {
  cr.ach(path, "dd", "mouseover", function (event, data) {
    var anchor = cr.findInHandler(event, "" + "." + "dd", [cr.getTarget(event).getAttribute("p0"), cr.getTarget(event).getAttribute("p1")]);
    cr.findInHandler(event, "" + "." + "dp", [cr.getTarget(event).getAttribute("p0"), cr.getTarget(event).getAttribute("p1")]).show(true, anchor);
  });
  cr.ash(path, "mergeUser", "click", null);
  cr.ash(path, "banUser", "click", null);
  regPC(path, "dp");
});
