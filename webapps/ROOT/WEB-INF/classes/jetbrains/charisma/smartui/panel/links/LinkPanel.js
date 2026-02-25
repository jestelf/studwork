cr.setTemplateBind("LinkPanel", function (path) {
  cr.ach(path, "showMore", "click", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "loading", [cr.getTarget(event).getAttribute("p0"), cr.getTarget(event).getAttribute("p1"), cr.getTarget(event).getAttribute("p2")])).show();
  });
  cr.ach(path, "showMore2", "click", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "loading2", [cr.getTarget(event).getAttribute("p0"), cr.getTarget(event).getAttribute("p1"), cr.getTarget(event).getAttribute("p2")])).show();
  });
  cr.ash(path, "showMore", "click", null);
  cr.ash(path, "showMore2", "click", null);
});
