cr.setTemplateBind("AdminMenu", function (path) {
  regt(path, "adminMenuTicker").addServerSideListener(null, "count");
  regt(path, "adminMenuTicker", 5000);
});
