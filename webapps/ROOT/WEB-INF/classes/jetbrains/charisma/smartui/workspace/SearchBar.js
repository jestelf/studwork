cr.setTemplateBind("SearchBar", function (path) {
  cr.ach(path, "searchSubmit", "click", function (event, data) {
    charisma.smartui.App.APP.doSearchRequest();
  });
  cr.ach(path, "searchField", "valuechange", function (event, data) {
    var value = data.value;
    if (value != null && value.length > 0) {
      $(cr.findInHandler(event, "" + "." + "clearSearchLink", [])).removeClass("hidden");
    } else {
      $(cr.findInHandler(event, "" + "." + "clearSearchLink", [])).addClass("hidden");
    }

    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_underlineAndSuggest", {__param__query: value, __param__caretPos: data.caretPos}, {processRecentOnly: true, hideLoadingPopup: true});
  });
  cr.ach(path, "searchField", "caretmove", function (event, data) {
    cr.serverMethodCallInHandler(event, "" + "." + "methodCall_suggest", {__param__query: data.value, __param__caretPos: data.caretPos}, {processRecentOnly: true, hideLoadingPopup: true});
  });
  cr.ach(path, "clearSearchLink", "click", function (event, data) {
    cr.findInHandler(event, "" + "." + "searchField", []).focus();
    cr.findInHandler(event, "" + "." + "searchField", []).value = "";
    if (Webr.util.Util.isIE) {
      cr.serverMethodCallInHandler(event, "" + "." + "methodCall_underlineAndSuggest", {__param__query: "", __param__caretPos: 0}, {processRecentOnly: true, hideLoadingPopup: true});
    }

  });
  cr.ash(path, "filterProject", "Submit", null);
  cr.ash(path, "filterProject", "Load", {collectFormElements: false, hideLoadingPopup: true, processRecentOnly: true});
  regCC(path, "filterProject");
  cr.forEach(path, "searchField", function () {
    this.attachWatcher(false);
  });
  cr.forEach(path, "searchField", function () {
    this.attachWatcher(false);
  });
});
