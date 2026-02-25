cr.setTemplateBind("TextIndexRefreshable", function (path) {
  cr.ash(path, "resume", "click", null);
  cr.ash(path, "suspend", "click", null);
  regt(path, "ticker").addServerSideListener({collectFormElements: false}, "count");
  regt(path, "ticker", 1000);
});
