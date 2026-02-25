charisma.smartui.entityBrowser.Control = function (bodyId) {
  var t = this;
  t.body = $("#" + bodyId);
  t.controls = [];
  t.tables = [];
  t.indices = [];
  t.body.children("tr").each(function () {
    t.addRow(this);
  });
  if (true == false) {
    window.alert("Controls: " + t.controls.length + ", tables: " + t.tables.length);
    window.alert("Indices[DatePeriod]: " + t.indices["DatePeriod"]);
  }

};
charisma.smartui.entityBrowser.Control.prototype.selectCurrentControl = function () {
  var currentControl = $(this.controls[this.currentIndex]);
  currentControl.toggleClass("selected");
  currentControl.scrollTo();
  currentControl.focus();
};
charisma.smartui.entityBrowser.Control.prototype.unSelectCurrentControl = function () {
  $(this.controls[this.currentIndex]).toggleClass("selected");
};
charisma.smartui.entityBrowser.Control.prototype.navigateTo = function (entityType) {
  var i = this.checkEntityType(entityType);
  this.unSelectCurrentControl();
  this.currentIndex = i;
  this.selectCurrentControl();
};
charisma.smartui.entityBrowser.Control.prototype.tableLoaded = function (entityType) {
  var table = this.getTable(entityType);
  return $(table).children("td").length > 0;
};
charisma.smartui.entityBrowser.Control.prototype.tableDisplayed = function (entityType) {
  var table = this.getTable(entityType);
  return !($(table).hasClass("hidden"));
};
charisma.smartui.entityBrowser.Control.prototype.toggle = function (entityType) {
  var control = $(this.getControl(entityType));
  control.children("td:first").children("a:first").click();
};
charisma.smartui.entityBrowser.Control.prototype.addRow = function (selector) {
  var r = $(selector);
  if (!r) {
    throw "Can't find tr for selector [" + selector + "]";
  } else {
    var row = r.get(0);
    var id = row.id;
    var firstLetter = id.charAt(0);
    if (firstLetter == "c") {
      this.controls.push(row);
      //parse index from id
      this.indices[this.parseEntityType(id)] = this.controls.length - 1;
    } else {
      if (firstLetter == "e") {
        this.tables.push(row);
      } else {
        throw "Unexpected row id [" + id + "]";
      }

    }

  }

};
charisma.smartui.entityBrowser.Control.prototype.parseEntityType = function (id) {
  var indexOfUnderscore = id.indexOf("_");
  if (indexOfUnderscore < 0) {
    throw "No underscore in row id [" + id + "]";
  }

  return id.substring(indexOfUnderscore + 1);
};
charisma.smartui.entityBrowser.Control.prototype.checkEntityType = function (entityType) {
  var i = this.indices[entityType];
  if ((i != 0) && (!i)) {
    throw "Unknown entity type: " + entityType;
  } else {
    return i;
  }

};
charisma.smartui.entityBrowser.Control.prototype.getControl = function (entityType) {
  var control = this.controls[this.checkEntityType(entityType)];
  if (!control) {
    throw "Control not found for entity type: " + entityType;
  } else {
    return control;
  }

};
charisma.smartui.entityBrowser.Control.prototype.getTable = function (entityType) {
  var table = this.tables[this.checkEntityType(entityType)];
  if (!table) {
    throw "Table not found for entity type: " + entityType;
  } else {
    return table;
  }

};
charisma.smartui.entityBrowser.Control.prototype.updateRow = function (id) {
  var i = this.checkEntityType(this.parseEntityType(id));
  var firstLetter = id.charAt(0);
  var query = "#" + id;
  var item = $(query);
  if (!item) {
    throw "Can't find tr for selector [" + id + "]";
  }

  var row = item.get(0);
  if (firstLetter == "c") {
    this.controls[i] = row;
  } else {
    if (firstLetter = "e") {
      this.tables[i] = row;
    } else {
      throw "Unexpected row id [" + id + "]";
    }

  }

};
