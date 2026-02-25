cr.setTemplateBind("Entities", function (path) {
  cr.ach(path, "go", "click", function (event, data) {
    var c = charisma.smartui.entityBrowser.Control.CONTROL;
    if (c.tableLoaded(cr.getTarget(event).getAttribute("p3")) && c.tableDisplayed(cr.getTarget(event).getAttribute("p3"))) {
      c.navigateTo(cr.getTarget(event).getAttribute("p3"));
    } else {
      c.toggle(cr.getTarget(event).getAttribute("p3"));
    }

  });
});
