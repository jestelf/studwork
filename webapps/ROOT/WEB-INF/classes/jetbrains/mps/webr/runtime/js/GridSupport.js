Webr.GridSupport = function (config) {
  var recordType = [];
  for (var i = 0; i < config.columnModelConfig.length; ++i) {
    var cmc = config.columnModelConfig[i];
    recordType.push({name: cmc.dataIndex, mapping: cmc.dataIndex, sortDir: cmc.sortDir});
  }

  var reader = new Ext.data.JsonReader({root: "rows", totalProperty: "totalCount", id: "id"}, recordType);
  this.store = new Ext.data.Store({baseParams: config.baseParams, proxy: new Ext.data.HttpProxy({url: config.handlerUrl}), reader: reader, remoteSort: true, sortInfo: config.sortState});
  var columnModel = new Ext.grid.ColumnModel(config.columnModelConfig);
  var selectionModel = new Ext.grid.RowSelectionModel({singleSelect: config.singleSelect});
  if (config.selectionHandler) {
    selectionModel.on("rowselect", config.selectionHandler);
  }

  if (config.deselectionHandler) {
    selectionModel.on("rowdeselect", function (selectionModel, rowIndex) {
      config.deselectionHandler(selectionModel, rowIndex, this.store.getAt(rowIndex));
    }, this);
  }

  var gridConfig = {ds: this.store, cm: columnModel, selModel: selectionModel, enableColLock: false, loadMask: true};
  if (config.autoExpandColumnId) {
    gridConfig.autoExpandColumn = config.autoExpandColumnId;
    if (config.autoExpandMax) {
      gridConfig.autoExpandMax = config.autoExpandMax;
    }

    if (config.autoExpandMin) {
      gridConfig.autoExpandMin = config.autoExpandMin;
    }

  }

  this.grid = new Ext.grid.Grid(config.container, gridConfig);
  this.grid.getView().getRowClass = function (record, index) {
    var gridResponse = reader.jsonData;
    var rowStyles = gridResponse.rowStyles;
    var style = "";
    if (rowStyles && rowStyles[record.id]) {
      style = rowStyles[record.id];
    }

    return style;
  };
  this.grid.getView().onLoad = function () {
    var view = this;
    var gridResponse = reader.jsonData;
    var selectedRow = gridResponse.selectedRow;
    var rowIndex = -1;
    if (selectedRow) {
      rowIndex = gridConfig.ds.indexOfId(selectedRow);
      if (rowIndex >= 0) {
        selectionModel.selectRow(rowIndex);
        view.focusRow(rowIndex);
      }

    } else {
      if (gridResponse.selectFirst) {
        selectionModel.selectFirstRow();
        view.focusRow(0);
      } else {
        if (gridResponse.selectLast) {
          selectionModel.selectLastRow();
          view.focusRow(gridConfig.ds.getCount() - 1);
        } else {
          if (gridResponse.currentSelectedRowIndex != null) {
            selectionModel.selectRow(gridResponse.currentSelectedRowIndex);
            view.focusRow(gridResponse.currentSelectedRowIndex);
          } else {
            view.scrollToTop();
          }

        }

      }

    }

    if (!selectionModel.hasSelection() && config.autoSelectFirstRow && gridConfig.ds.getCount() > 0) {
      selectionModel.selectFirstRow();
      view.focusRow(0);
    }

  };
  this.store.proxy.on("load", function (proxy, data, args, response) {
    Webr.event.ResponseServerEventListener.processResponse(response, false, "Grid: ");
  });
  this.store.proxy.on("loadexception", function (proxy, response) {
    Webr.event.ResponseServerEventListener.processResponse(response, true, "Grid: ");
  });
  if (config.doubleClickHandler) {
    this.grid.on("rowdblclick", config.doubleClickHandler);
  }

  var stateManager = new Webr.grid.GridStateManager();
  stateManager.init(this.grid, this.store, Ext.state.Manager.getProvider());
  Webr.Component.register(config.id, this);
};
Webr.GridSupport.prototype.createGrid = function (startRow, rowLimit, selectedRow) {
  this.grid.render();
  var params = {};
  if (startRow != null && rowLimit != null) {
    startRow = new Number(startRow).valueOf();
    rowLimit = new Number(rowLimit).valueOf();
    var pagingPanel = this.grid.getView().getFooterPanel(true);
    var paging = new Ext.PagingToolbar(pagingPanel, this.store, {pageSize: rowLimit, displayInfo: true});
    var superGetPageData = paging.getPageData;
    paging.getPageData = function () {
      var start = paging.ds.reader.jsonData.start;
      if (start) {
        paging.cursor = start;
      }

      return superGetPageData.call(this);
    };
    params.start = startRow;
    params.limit = rowLimit;
    this.rowLimit = rowLimit;
    this.pagingToolbar = paging;
  }

  if (selectedRow) {
    params.selectedRow = selectedRow;
  }

  this.store.load({params: params});
  return this.grid;
};
Webr.GridSupport.prototype.reload = function (gotoFirstPage, selectRow) {
  if (this.rowLimit && gotoFirstPage) {
    this.store.load({params: {start: 0, limit: this.rowLimit}});
  } else {
    if (selectRow) {
      this.store.load({params: {start: this.curPageStart(), limit: this.rowLimit, selectedRow: selectRow, currentSelectedRowIndex: this.curSelectedRow()}});
    } else {
      this.store.reload();
    }

  }

};
Webr.GridSupport.prototype.selectNext = function () {
  var count = this.store.getCount();
  if (!this.grid.getSelectionModel().isSelected(count - 1)) {
    this.grid.getSelectionModel().selectNext();
  } else {
    this.store.load({params: {start: this.nextPageStartIfAny(), limit: this.rowLimit, selectFirstRowOnPage: true}});
  }

};
Webr.GridSupport.prototype.selectPrevious = function () {
  if (!this.grid.getSelectionModel().isSelected(0)) {
    this.grid.getSelectionModel().selectPrevious();
  } else {
    this.store.load({params: {start: this.prevPageStartIfAny(), limit: this.rowLimit, selectLastRowOnPage: true}});
  }

};
Webr.GridSupport.prototype.curPageStart = function () {
  var curPageStart = 0;
  if (this.pagingToolbar) {
    curPageStart = this.pagingToolbar.cursor;
  }

  return curPageStart;
};
Webr.GridSupport.prototype.nextPageStartIfAny = function () {
  var nextPageStart = 0;
  if (this.pagingToolbar) {
    var activePage = this.getActivePage();
    var pagesCount = this.getPagesCount();
    var cursor = this.pagingToolbar.cursor;
    if (activePage && pagesCount && activePage < pagesCount) {
      nextPageStart = cursor + this.rowLimit;
    } else {
      nextPageStart = cursor;
    }

  }

  return nextPageStart;
};
Webr.GridSupport.prototype.prevPageStartIfAny = function () {
  var prevPageStart = 0;
  if (this.pagingToolbar) {
    var activePage = this.getActivePage();
    var cursor = this.pagingToolbar.cursor;
    if (activePage && activePage > 1) {
      prevPageStart = cursor - this.rowLimit;
    } else {
      prevPageStart = cursor;
    }

  }

  return prevPageStart;
};
Webr.GridSupport.prototype.getActivePage = function () {
  var activePage = null;
  if (this.pagingToolbar) {
    var pageData = this.pagingToolbar.getPageData();
    activePage = pageData["activePage"];
  }

  return activePage;
};
Webr.GridSupport.prototype.getPagesCount = function () {
  var pagesCount = null;
  if (this.pagingToolbar) {
    var pageData = this.pagingToolbar.getPageData();
    pagesCount = pageData["pages"];
  }

  return pagesCount;
};
Webr.GridSupport.prototype.curSelectedRow = function () {
  var selected = this.grid.getSelectionModel().getSelected();
  return this.store.indexOf(selected);
};
Webr.ParamsConfig = function () {
};
Webr.grid.GridResponse = function () {
};
Webr.GridSupportConfig = function () {
};
