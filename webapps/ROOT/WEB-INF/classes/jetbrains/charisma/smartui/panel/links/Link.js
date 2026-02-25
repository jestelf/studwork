cr.setTemplateBind("Link", function (path) {
  cr.ach(path, "tl", "mouseover", function (event, data) {
    cr.findInHandler(event, "" + "." + "pu", []).load(function () {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_showPreview", {});
    }, cr.findInHandler(event, "" + "." + "tl", []));
  });
  cr.ach(path, "pu", "show", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "tl", [])).addClass("hover");
  });
  cr.ach(path, "pu", "hide", function (event, data) {
    $(cr.findInHandler(event, "" + "." + "tl", [])).removeClass("hover");
  });
  cr.ash(path, "delete", "click", null);
  regPC(path, "pu");
});
