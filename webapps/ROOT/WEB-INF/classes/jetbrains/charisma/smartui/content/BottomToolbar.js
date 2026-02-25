cr.setTemplateBind("BottomToolbar", function (path) {
  cr.ach(path, "firstPageLink", "click", function (event, data) {
    if (cr.findInHandler(event, "" + "." + "firstPageLink", []).href != "javascript:void(0)") {
      Webr.Event.redirect(cr.findInHandler(event, "" + "." + "firstPageLink", []).href + "&f=" + charisma.smartui.App.APP.issuesList.focused);
    }

    return false;
  });
  cr.ach(path, "prevPageLink", "click", function (event, data) {
    if (cr.findInHandler(event, "" + "." + "prevPageLink", []).href != "javascript:void(0)") {
      Webr.Event.redirect(cr.findInHandler(event, "" + "." + "prevPageLink", []).href + "&f=" + charisma.smartui.App.APP.issuesList.focused);
    }

    return false;
  });
  cr.ach(path, "nextPageLink", "click", function (event, data) {
    if (cr.findInHandler(event, "" + "." + "nextPageLink", []).href != "javascript:void(0)") {
      Webr.Event.redirect(cr.findInHandler(event, "" + "." + "nextPageLink", []).href + "&f=" + charisma.smartui.App.APP.issuesList.focused);
    }

    return false;
  });
  cr.ach(path, "lastPageLink", "click", function (event, data) {
    if (cr.findInHandler(event, "" + "." + "lastPageLink", []).href != "javascript:void(0)") {
      Webr.Event.redirect(cr.findInHandler(event, "" + "." + "lastPageLink", []).href + "&f=" + charisma.smartui.App.APP.issuesList.focused);
    }

    return false;
  });
  cr.ach(path, "pageLink", "click", function (event, data) {
    if (cr.findInHandler(event, "" + "." + "pageLink", [cr.getTarget(event).getAttribute("p0")]).href != "javascript:void(0)") {
      Webr.Event.redirect(cr.findInHandler(event, "" + "." + "pageLink", [cr.getTarget(event).getAttribute("p0")]).href + "&f=" + charisma.smartui.App.APP.issuesList.focused);
    }

    return false;
  });
});
