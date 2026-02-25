Webr.component.panel.TabPanel = function (panel) {
  Webr.component.panel.TabPanel.superclass.constructor.call(this, panel);
};
{
  var F = new Function();
  F.prototype = Webr.component.panel.AbstractPanel.prototype;
  Webr.component.panel.TabPanel.prototype = new F();
  Webr.component.panel.TabPanel.prototype.constructor = Webr.component.panel.TabPanel;
  Webr.component.panel.TabPanel.superclass = Webr.component.panel.AbstractPanel.prototype;
}

Webr.component.panel.TabPanel.prototype.init = function () {
  this.tabTitles = this.panel.find("." + "jt-tabpanel-item");
  this.tabPanels = this.panel.find("." + "jt-tabpanel-content" + " > div");
  this.watchState = this.panel.attr("watchstate");
  //active tab
  this.activeTabIndex = parseInt(this.panel.attr("activeTab"));
  if (!this.activeTabIndex) {
    this.activeTabIndex = 0;
  }

  this.activeTitle = this.tabTitles.eq(this.activeTabIndex);
  // active panel
  this.activePanel = this.tabPanels.eq(this.activeTabIndex);
  //active from window.location
  var tabIndex = parseInt(Webr.util.PageStateStore.getInstance().get(this.watchState ?this.watchState :""));
  tabIndex = tabIndex < this.tabTitles.length && tabIndex >= 0 ?tabIndex :this.activeTabIndex;
  //active attr
  if (tabIndex !== this.activeTabIndex) {
    this.activateTab(tabIndex);
  } else {
    this.activateCurrent();
  }

  var it = this;
  this.tabTitles.click(function () {
    var index = it.tabTitles.index(this);
    it.activateTab(index);
    it.updateHash(index);
    return false;
  });
};
Webr.component.panel.TabPanel.prototype.activateTab = function (index) {
  if (index > this.tabTitles.length) {
    throw "Index is out of bounds";
  }

  if (this.activeTabIndex != index) {
    this.activeTitle.removeClass("jt-panel-active");
    this.activePanel.removeClass("jt-panel-active").addClass("jt-panel-inactive");
    this.tabdeactivate(this.activeTabIndex);
    this.activeTabIndex = index;
  }

  this.activeTitle = this.tabTitles.eq(index).addClass("jt-panel-active");
  this.activePanel = this.tabPanels.eq(index).removeClass("jt-panel-inactive").addClass("jt-panel-active");
  this.tabactivate(index);
};
Webr.component.panel.TabPanel.prototype.activateCurrent = function () {
  this.activeTitle.addClass("jt-panel-active");
  this.activePanel.removeClass("jt-panel-inactive").addClass("jt-panel-active");
};
Webr.component.panel.TabPanel.prototype.historyChanged = function (token) {
  if (token) {
    var tabIndex = parseInt(token.current);
    if (tabIndex !== this.activeTabIndex && tabIndex < this.tabTitles.length && tabIndex >= 0) {
      this.activateTab(tabIndex);
    }

    if (isNaN(tabIndex)) {
      tabIndex = parseInt(this.panel.attr("activeTab"));
      this.activateTab(isNaN(tabIndex) ?0 :tabIndex);
    }

  }

};
Webr.component.panel.TabPanel.prototype.updateHash = function (index) {
  if (this.watchState) {
    Webr.util.PageStateStore.getInstance().put(this.watchState, index);
  }

};
Webr.component.panel.TabPanel.prototype.tabactivate = function (index) {
  this.panel.trigger("tabactivate", {index: index});
};
Webr.component.panel.TabPanel.prototype.tabdeactivate = function (index) {
  this.panel.trigger("tabdeactivate", {index: index});
};
Webr.component.panel.TabPanel.registerTabPanel = function (path, name) {
  cr.forEach(path, name, function () {
    new Webr.component.panel.TabPanel($(this));
  });
};
var regtab = Webr.component.panel.TabPanel.registerTabPanel;
