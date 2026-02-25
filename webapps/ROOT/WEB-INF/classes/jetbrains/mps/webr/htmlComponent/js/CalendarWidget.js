Webr.component.Calendar = function (element, constants, config) {
  this.table = null;
  this.container = null;
  this.parent = $(document.body);
  this.constants = {clearButton: "Clear", todayLabel: "Today", monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], weekDaysShortNames: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], firstDayOfWeek: 0};
  this.config = {dateFormat: "%Y-%m-%d", maxYear: 2100, minYear: 1900, popup: true};
  this.date = new Date();
  this.current_state = null;
  var it = this;
  this.element = element;
  var long = $(element).attr("valueId");
  if (long) {
    this.date.setTime(long);
  }

  if (config) {
    try {
      var config = eval("(" + config + ")");
      this.config = {dateFormat: config.dateFormat || this.config.dateFormat, maxYear: config.maxYear || this.config.maxYear, minYear: config.minYear || this.config.minYear, popup: config.popup && this.config.popup};
    } catch (e) {
    }

  }

  this.mainElement = $(element);
  this.mainElement.data(Webr.component.ComponentRegistry.COMPONENT_INSTANCE, this);
  this.mouseHandler = function (event) {
    it.mup(event);
  };
  this.keyboardHandler = function (e) {
    if (e.isKey(Webr.util.Key.ESC)) {
      it.kesc();
      return false;
    }

  };
  this.current_state = Webr.component.Calendar.state_HIDDEN;
};
Webr.component.Calendar.prototype.createCalendar = function () {
  var it = this;
  //Creating table & title 
  var tableHead = $(document.createElement("thead"));
  var table = $(document.createElement("table"));
  var query = table.addClass("calendar").append(tableHead);
  tableHead.append($(document.createElement("tr")).append($(document.createElement("td")).attr("colSpan", "7").addClass("title")));
  //Creating table header & navigation
  tableHead.append($(document.createElement("tr")).addClass("navigation").append(it.createNavButton(1, "&laquo;", it.prevYear)).append(it.createNavButton(1, "&lsaquo;", it.prevMonth)).append(it.createNavButton(3, it.constants.todayLabel, it.today)).append(it.createNavButton(1, "&rsaquo;", it.nextMonth)).append(it.createNavButton(1, "&raquo;", it.nextYear)));
  var row;
  tableHead.append(row = $(document.createElement("tr")).addClass("daysOfWeek"));
  for (var i = 0; i < 7; ++i) {
    var cell;
    row.append(cell = $(document.createElement("td")).html(it.constants.weekDaysShortNames[(i + it.constants.firstDayOfWeek) % 7]));
  }

  //Creating table days
  var tbody;
  table.append(tbody = $(document.createElement("tbody")));
  for (var i = 0; i < 6; ++i) {
    var row;
    tbody.append(row = $(document.createElement("tr")).addClass("days"));
    for (var j = 0; j < 7; ++j) {
      row.append(document.createElement("td"));
    }

  }

  this.table = table;
  //Wrap with container
  this.container = $(document.createElement("div"));
  this.container.append(table).addClass("calendar-container");
  //Update calendar
  this.update(this.date);
  //Append to Body & Register
  this.parent.append(this.container);
  this.parent.data(Webr.component.Calendar.CALENDAR_CONTAINER, this.container);
};
Webr.component.Calendar.prototype.fixLayout = function () {
  this.layouter.fix(this.container.outerHeight(true));
};
Webr.component.Calendar.prototype.resetLayout = function () {
  this.layouter.reset();
};
Webr.component.Calendar.prototype.collectCalendar = function () {
  this.table = this.container.find("table.calendar");
  //Possible leaks
  this.update(this.date);
};
Webr.component.Calendar.prototype.elementClicked = function (element) {
  var jEl = $(element);
  if (element.navAction !== undefined) {
    element.navAction.call(this);
  } else {
    if (jEl.data("date")) {
      this.changeDate(jEl.data("date"));
    }

  }

};
Webr.component.Calendar.prototype.dateSelected = function (dat) {
  dat.setHours(12, 0, 0, 0);
  this.date = dat;
  var stringDate = this.dateToString(dat);
  if (this.mainElement.is("div")) {
    this.mainElement.html(stringDate);
  } else {
  }

  this.update();
  this.mainElement.attr("valueId", dat.getTime());
  this.onDateSelected(dat);
};
Webr.component.Calendar.prototype.dateToString = function (date) {
  return date ?(date.getDate()) + "." + (date.getMonth() + 1) + "." + date.getFullYear() :"";
};
Webr.component.Calendar.prototype.setValue = function (value) {
  this.element.value = value;
};
Webr.component.Calendar.prototype.update = function (date) {
  if (!date) {
    date = new Date(this.date);
  } else {
    date = new Date(date);
  }

  var calendar = this;
  var month = date.getMonth();
  var year = date.getFullYear();
  var dayOfMonth = date.getDate();
  var now = new Date();
  //Ensure interval
  if (date.getFullYear() < this.config.minYear) {
    date.setFullYear(this.config.minYear);
  }

  if (date.getFullYear() > this.config.maxYear) {
    date.setFullYear(this.config.maxYear);
  }

  date = new Date(date);
  //Days of previous month
  date.setDate(1);
  //Problems with standart method getDay()
  var num = ((date.getDay() + 6) % 7 + 7 - calendar.constants.firstDayOfWeek) % 7;
  date.setDate(-num + 1);
  //Fill the table
  this.table.find("tbody tr").each(function (i, row) {
    var rowHasDays = false;
    $(row).children().each(function (j, cell) {
      var c = $(cell);
      var day = date.getDate();
      var dayOfWeek = (date.getDay() + 6) % 7;
      var currentMonth = date.getMonth() == month;
      //Reset previous classes of cell
      c.removeClass().html(day);
      c.data("date", new Date(date));
      if (!currentMonth) {
        c.addClass("otherDays");
      } else {
        rowHasDays = true;
      }

      if (currentMonth && day == dayOfMonth) {
        calendar.currentDateEl = c.addClass("selected");
      }

      //Today
      if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() == now.getDate()) {
        c.addClass("today");
      }

      //Weekend
      if (jQuery.inArray(dayOfWeek, [5, 6]) !== -1) {
        c.addClass("weekend");
      }

      date.setDate(day + 1);
    });
    rowHasDays ?$(row).show() :$(row).hide();
  });
  this.table.find("td.title").html(this.constants.monthNames[month] + " " + year);
};
Webr.component.Calendar.prototype.handleEvents = function () {
  $(document).bind("mouseup", this.mouseHandler);
  $(document).bind("keydown", this.keyboardHandler);
  this.onCalendarIsShown();
};
Webr.component.Calendar.prototype.unhandleEvents = function () {
  $(document).unbind("mouseup", this.mouseHandler);
  $(document).unbind("keydown", this.keyboardHandler);
  this.onCalendarIsHidden();
};
Webr.component.Calendar.prototype.init = function (parent) {
  this.container = $(document.body).data(Webr.component.Calendar.CALENDAR_CONTAINER);
  if (this.container) {
    this.collectCalendar();
  } else {
    this.createCalendar();
  }

  var it = this;
  var topGetter = function (withHeight) {
    var el = parent ?parent :it.mainElement;
    return $(el).offset().top + (withHeight ?$(el).outerHeight(true) :0);
  };
  var leftGetter = function () {
    var el = parent ?parent :it.mainElement;
    return $(el).offset().left;
  };
  if (this.config.popup) {
    this.container.addClass("popup");
  } else {
    this.container.removeClass("popup");
  }

  this.container.css("left", leftGetter);
  this.layouter = new Webr.component.VerticalLayouter(parent ?parent :this.mainElement, function (toUp, maxHeight) {
    if (toUp) {
      var height = it.container.outerHeight(true);
      it.container.css("top", (topGetter(false) - height));
    } else {
      it.container.css("top", topGetter(true));
    }

  });
};
Webr.component.Calendar.prototype.createNavButton = function (colSpan, text, navAction) {
  var button = document.createElement("td");
  var divElement = document.createElement("div");
  button.colSpan = colSpan;
  button.className = "button";
  divElement.className = "push";
  button.appendChild(divElement);
  divElement.innerHTML = text;
  divElement.navAction = navAction;
  return $(button);
};
Webr.component.Calendar.prototype.show = function (element) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "show", arguments);
};
Webr.component.Calendar.prototype.hide = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "hide", arguments);
};
Webr.component.Calendar.prototype.mup = function (event) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "mup", arguments);
};
Webr.component.Calendar.prototype.nextYear = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "nextYear", arguments);
};
Webr.component.Calendar.prototype.nextMonth = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "nextMonth", arguments);
};
Webr.component.Calendar.prototype.reset = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "reset", arguments);
};
Webr.component.Calendar.prototype.today = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "today", arguments);
};
Webr.component.Calendar.prototype.prevMonth = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "prevMonth", arguments);
};
Webr.component.Calendar.prototype.prevYear = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "prevYear", arguments);
};
Webr.component.Calendar.prototype.changeDate = function (date) {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "changeDate", arguments);
};
Webr.component.Calendar.prototype.kesc = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "kesc", arguments);
};
Webr.component.Calendar.prototype.onDateSelected = function (date) {
  if (date) {
    this.mainElement.trigger("DateSelected", {value: date.getTime()});
  } else {
    this.mainElement.trigger("DateSelected", {value: null});
  }

};
Webr.component.Calendar.prototype.onCalendarIsShown = function () {
  this.mainElement.trigger("CalendarIsShown");
};
Webr.component.Calendar.prototype.onCalendarIsHidden = function () {
  this.mainElement.trigger("CalendarIsHidden");
};
Webr.component.Calendar.CALENDAR_CONTAINER = "_webrCalendar_";
Webr.component.Calendar.state_HIDDEN = {name: "HIDDEN", show: function (element) {
  if (true) {
    this.init(element);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.component.Calendar.state_SHOWN);
    }

    return Webr.component.Calendar.state_SHOWN;
  }

  return false;
}};
Webr.component.Calendar.state_SHOWN = {name: "SHOWN", onenter: function () {
  this.handleEvents();
  this.container.show();
  this.fixLayout();
}, onexit: function () {
  this.unhandleEvents();
  this.container.hide();
  this.resetLayout();
}, kesc: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Calendar.state_SHOWN);
    }

    return Webr.component.Calendar.state_HIDDEN;
  }

  return false;
}, mup: function (event) {
  if (!this.container.ancestorOf(event.target)) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Calendar.state_SHOWN);
    }

    return Webr.component.Calendar.state_HIDDEN;
  }

  if (true) {
    this.elementClicked(event.target);
    return ;
  }

  return false;
}, changeDate: function (date) {
  if (true) {
    this.dateSelected(date);
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.component.Calendar.state_SHOWN);
    }

    return Webr.component.Calendar.state_HIDDEN;
  }

  return false;
}, prevYear: function () {
  if (this.date.getFullYear() > this.config.minYear) {
    this.date.setFullYear(this.date.getFullYear() - 1);
    this.update();
    return ;
  }

  return false;
}, nextYear: function () {
  if (this.date.getFullYear() < this.config.maxYear) {
    this.date.setFullYear(this.date.getFullYear() + 1);
    this.update();
    return ;
  }

  return false;
}, today: function () {
  if (true) {
    this.changeDate(new Date());
    return ;
  }

  return false;
}, reset: function () {
  if (true) {
    this.changeDate(null);
    return ;
  }

  return false;
}, prevMonth: function () {
  if (true) {
    var month = this.date.getMonth();
    if (month > 0) {
      this.date.setMonth(month - 1);
      this.update();
    } else {
      this.date.setMonth(11);
      this.prevYear();
    }

    return ;
  }

  return false;
}, nextMonth: function () {
  if (true) {
    var month = this.date.getMonth();
    if (month < 11) {
      this.date.setMonth(month + 1);
      this.update();
    } else {
      this.date.setMonth(0);
      this.nextYear();
    }

    return ;
  }

  return false;
}};
Webr.component.Calendar.register = function (path, compName) {
  cr.forEach(path, compName, function () {
    var el = $(this);
    var attachTo = document.getElementById(el.attr("bid"));
    var calendar;
    var f = function () {
      if (!calendar) {
        var config = el.attr("config");
        var lang = el.attr("lang");
        calendar = new Webr.component.Calendar(el.get(0), lang, config);
      }

      calendar.show(attachTo);
    };
    var handleOn = attachTo ?attachTo :el.siblings("a").get(0);
    if (handleOn) {
      $(handleOn).click(f);
    } else {
      el.click(f);
    }

  });
};
Webr.component.Calendar.safeSetValue = function (element, value) {
  if (element.setValue) {
    element.setValue(value);
  } else {
    element.value = value;
  }

};
Webr.component.CalendarConstants = function () {
};
Webr.component.CalendarConfig = function () {
  this.minYear = 1900;
  this.maxYear = 2100;
  this.dateFormat = "%Y-%m-%d";
  this.popup = true;
};
Function;
var regC = Webr.component.Calendar.register;
