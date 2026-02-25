cr.setTemplateBind("OpenIdSettings", function (path) {
  cr.ash(path, "enableOpenIdIntegration", "click", null);
});
