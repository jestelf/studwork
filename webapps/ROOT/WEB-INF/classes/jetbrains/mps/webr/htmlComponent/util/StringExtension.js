String.prototype.startsWith = function (prefix) {
  return this.toLowerCase().indexOf(prefix.toLowerCase()) == 0;
};
String.prototype.replaceAll = function (source, target) {
  return this.replace(new RegExp(source, "g"), target);
};
