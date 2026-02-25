cr.setTemplateBind("Sidebars", function (path) {
  regt(path, "filterReadyTicker").addServerSideListener({collectFormElements: false});
  regt(path, "updateCountsTicker").addServerSideListener({collectFormElements: false});
});
