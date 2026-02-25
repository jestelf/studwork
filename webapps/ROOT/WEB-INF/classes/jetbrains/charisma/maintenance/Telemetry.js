cr.setTemplateBind("Telemetry", function (path) {
  regt(path, "ticker").addServerSideListener({collectFormElements: false}, "count");
  regt(path, "ticker", 3000);
});
