Webr.Component = function () {
};
Webr.Component.getIdToComponent = function () {
  if (Webr.Component.idToComponent == null) {
    Webr.Component.idToComponent = {};
  }

  return Webr.Component.idToComponent;
};
Webr.Component.register = function (componentId, c) {
  Webr.Component.getIdToComponent()[componentId] = c;
};
Webr.Component.unregister = function (componentId) {
  delete Webr.Component.getIdToComponent()[componentId];
};
Webr.Component.get = function (componentId) {
  return Webr.Component.getIdToComponent()[componentId];
};
