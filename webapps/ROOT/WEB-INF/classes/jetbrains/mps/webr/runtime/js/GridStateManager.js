Webr.grid.GridStateManager = function () {
  this.state = {states: {}};
};
Webr.grid.GridStateManager.prototype.init = function (grid, store, provider) {
  this.provider = provider;
  var state = provider.get(grid.id + Webr.grid.GridStateManager.NAME_SUFFIX);
  if (state) {
    var cm = grid.getColumnModel();
    for ( var columnId in state.states) {
      var columnState = state.states[columnId];
      var columnIndex = cm.getIndexById(columnId);
      var currentColumn = cm.getColumnById(columnId);
      if (columnState && currentColumn && columnIndex >= 0) {
        //Column position
        if (columnState.index != null && columnState.index != columnIndex) {
          //Swap columns
          var configArray = cm.config;
          var bufferConfig = configArray[columnIndex];
          configArray[columnIndex] = configArray[columnState.index];
          configArray[columnState.index] = bufferConfig;
          cm.dataMap = null;
          cm.fireEvent("columnmoved", cm, columnIndex, columnState.index);
          columnIndex = columnState.index;
        }

        //Column width
        if (columnState.width != undefined && currentColumn.width != columnState.width) {
          cm.setColumnWidth(columnIndex, columnState.width);
        }

        //Hide column
        if (columnState.hidden != undefined && currentColumn.hidden != columnState.hidden) {
          cm.setHidden(columnIndex, columnState.hidden);
        }

      } else {
        delete state.states[columnId];
      }

    }

    if (state.sortState) {
      store.setDefaultSort(state.sortState.field, state.sortState.direction);
    }

    this.state = state;
  }

  this.grid = grid;
  grid.on("columnmove", this.onColumnMove, this);
  grid.on("columnresize", this.onColumnResize, this);
  grid.getColumnModel().on("hiddenchange", this.onHiddenChange, this);
  store.on("datachanged", this.onSort, this);
};
Webr.grid.GridStateManager.prototype.storeState = function () {
  this.provider.set(this.grid.id + Webr.grid.GridStateManager.NAME_SUFFIX, this.state);
};
Webr.grid.GridStateManager.prototype.onColumnMove = function (oldIndex, newIndex) {
  var columnCount = this.grid.getColumnModel().getColumnCount();
  for (var columnIndex = 0; columnIndex < columnCount; ++columnIndex) {
    var columnId = this.grid.getColumnModel().getColumnId(columnIndex);
    this.getColumnStateById(columnId).index = columnIndex;
  }

  this.storeState();
};
Webr.grid.GridStateManager.prototype.onColumnResize = function (columnIndex, newSize) {
  this.getColumnState(columnIndex).width = newSize;
  this.storeState();
};
Webr.grid.GridStateManager.prototype.onHiddenChange = function (columnModel, columnIndex, hidden) {
  var columnState = this.getColumnState(columnIndex);
  if (columnState.hidden != hidden) {
    columnState.hidden = hidden;
    this.storeState();
  }

};
Webr.grid.GridStateManager.prototype.onSort = function (store) {
  var newSortState = store.getSortState();
  if (newSortState) {
    if (!this.state.sortState) {
      this.state.sortState = {};
    }

    var sortState = this.state.sortState;
    if (newSortState.field != sortState.field || newSortState.direction != sortState.direction) {
      sortState.field = newSortState.field;
      sortState.direction = newSortState.direction;
      this.storeState();
    }

  } else {
    this.state.sortState = null;
  }

};
Webr.grid.GridStateManager.prototype.getColumnState = function (columnIndex) {
  var columnId = this.grid.getColumnModel().getColumnId(columnIndex);
  return this.getColumnStateById(columnId);
};
Webr.grid.GridStateManager.prototype.getColumnStateById = function (columnId) {
  var columnState = this.state.states[columnId];
  if (!columnState) {
    columnState = {id: columnId};
    this.state.states[columnId] = columnState;
  }

  return columnState;
};
Webr.grid.GridStateManager.NAME_SUFFIX = "-grid-state";
Webr.grid.GridColumnState = function () {
};
Webr.grid.GridState = function () {
};
