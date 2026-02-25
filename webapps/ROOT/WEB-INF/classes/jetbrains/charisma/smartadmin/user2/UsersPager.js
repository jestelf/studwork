cr.setTemplateBind("UsersPager", function (path) {
  cr.ach(path, "firstPageLink", "click", function (event, data) {
    Webr.Event.redirect(cr.findInHandler(event, "" + "." + "firstPageLink", []).href);
    return false;
  });
  cr.ach(path, "prevPageLink", "click", function (event, data) {
    Webr.Event.redirect(cr.findInHandler(event, "" + "." + "prevPageLink", []).href);
    return false;
  });
  cr.ach(path, "nextPageLink", "click", function (event, data) {
    Webr.Event.redirect(cr.findInHandler(event, "" + "." + "nextPageLink", []).href);
    return false;
  });
  cr.ach(path, "lastPageLink", "click", function (event, data) {
    Webr.Event.redirect(cr.findInHandler(event, "" + "." + "lastPageLink", []).href);
    return false;
  });
});
