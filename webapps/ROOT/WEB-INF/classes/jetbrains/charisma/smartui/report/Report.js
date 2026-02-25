cr.setTemplateBind("Report", function (path) {
  cr.ach(path, "collapsed" + "." + "delete", "click", function (event, data) {
    if (window.confirm("Delete this report?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {});
    }

  });
  cr.ach(path, "toobig" + "." + "delete", "click", function (event, data) {
    if (window.confirm("Delete this report?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {});
    }

  });
  cr.ach(path, "calculating" + "." + "delete", "click", function (event, data) {
    if (window.confirm("Delete this report?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {});
    }

  });
  cr.ach(path, "ready" + "." + "delete", "click", function (event, data) {
    if (window.confirm("Delete this report?")) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_delete", {});
    }

  });
  cr.ash(path, "ready" + "." + "collapse", "click", null);
  cr.ash(path, "ready" + "." + "edit", "click", null);
  cr.ash(path, "collapsed" + "." + "edit", "click", null);
  cr.ash(path, "collapsed" + "." + "expand", "click", null);
  cr.ash(path, "toobig" + "." + "edit", "click", null);
});
