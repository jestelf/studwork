Webr.component.Debug = function () {
};
Webr.component.Debug.div = null;
Webr.component.Debug.ta = null;
Webr.component.Debug.info = function (s) {
  Webr.component.Debug.consoleLog(function () {
    console.log(Webr.component.Debug.getTime() + ": " + s);
  });
};
Webr.component.Debug.trace = function (s) {
  Webr.component.Debug.consoleLog(function () {
    console.log(Webr.component.Debug.getTime() + ": " + s);
  });
};
Webr.component.Debug.getTime = function () {
  var d = new Date();
  return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
};
Webr.component.Debug.time = function (name) {
  Webr.component.Debug.firebugMethod("time", name);
};
Webr.component.Debug.timeEnd = function (name) {
  Webr.component.Debug.firebugMethod("timeEnd", name);
};
Webr.component.Debug.profile = function (title) {
  Webr.component.Debug.firebugMethod("profile", title);
};
Webr.component.Debug.profileEnd = function () {
  Webr.component.Debug.firebugMethod("profileEnd");
};
Webr.component.Debug.group = function (message) {
  Webr.component.Debug.firebugMethod("group", message);
};
Webr.component.Debug.groupEnd = function () {
  Webr.component.Debug.firebugMethod("groupEnd");
};
Webr.component.Debug.dumpStackTrace = function () {
  Webr.component.Debug.group("Stack trace");
  var f = arguments.callee;
  if (f) {
    f = f.caller;
    while (f) {
      Webr.component.Debug.info(f.toString());
      f = f.caller;
    }

  }

  Webr.component.Debug.groupEnd();
};
Webr.component.Debug.firebugMethod = function (m, param) {
  if (Webr.util.Util.isGecko && window["console"] && window["console"][m]) {
    window["console"][m](param);
  }

};
Webr.component.Debug.consoleLog = function (f) {
  if (window["console"] && window["console"].log) {
    f();
  }

};
var info = Webr.component.Debug.info;
var trace = Webr.component.Debug.trace;
var time = Webr.component.Debug.time;
var timeEnd = Webr.component.Debug.timeEnd;
var profile = Webr.component.Debug.profile;
var profileEnd = Webr.component.Debug.profileEnd;
