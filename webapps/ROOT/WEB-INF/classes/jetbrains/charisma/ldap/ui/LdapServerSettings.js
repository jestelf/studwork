cr.setTemplateBind("LdapServerSettings", function (path) {
  cr.ash(path, "saveLdapSettings", "click", null);
  cr.ash(path, "testLdapSettings", "click", null);
  cr.ash(path, "showAdvanced", "click", null);
  cr.ash(path, "enableLDAPIntegration", "click", null);
});
