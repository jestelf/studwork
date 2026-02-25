charisma.smartui.Pager = function (config) {
  this.first = config.firstPageHref ?$(config.firstPageHref) :null;
  this.prev = config.prevPageHref ?$(config.prevPageHref) :null;
  this.next = config.nextPageHref ?$(config.nextPageHref) :null;
  this.last = config.lastPageHref ?$(config.lastPageHref) :null;
  var t = this;
  $(document).keydown(function (event) {
    if (!event.targetIsInput()) {
      //ctrl-left
      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["PrevPage"])) {
        if (t.prev) {
          t.prev.click();
          return false;
        }

      }

      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["NextPage"])) {
        if (t.next) {
          t.next.click();
          return false;
        }

      }

      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["FirstPage"])) {
        t.first.click();
      }

      if (Webr.util.Key.isApplicable(event, SmartUIShortCuts["LastPage"])) {
        t.last.click();
      }

    }

    return true;
  });
};
charisma.smartui.PagerConfig = function () {
};
