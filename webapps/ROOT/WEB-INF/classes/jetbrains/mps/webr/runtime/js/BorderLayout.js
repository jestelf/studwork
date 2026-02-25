Webr.BorderLayout = function () {
};
Webr.BorderLayout.add = function (layout, region, contentPanels) {
  for (var i = 0; i < contentPanels.length; ++i) {
    layout.add(region, contentPanels[i]);
  }

};
