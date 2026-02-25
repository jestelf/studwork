charisma.Idea = function (command) {
  this.sequential = Webr.util.Util.isWebkit;
  this.id = "id_" + Math.random();
  this.responseCount = 0;
  this.successes = 0;
  this.connects = 0;
  this.requests = [];
  this.index = 0;
  var t = this;
  var oncomplete = function (status) {
    t.done(status);
  };
  for (var port = charisma.Idea.START_PORT; port <= charisma.Idea.END_PORT; ++port) {
    var uri = charisma.Idea.HOST + ":" + port + "/" + command;
    var xss = new charisma.XSS("r_" + this.id + "_" + port, uri);
    xss.oncomplete = oncomplete;
    this.requests[port - charisma.Idea.START_PORT] = xss;
    if (!this.sequential) {
      xss.go();
    }

  }

  if (this.sequential) {
    this.go();
  }

};
charisma.Idea.prototype.go = function () {
  var i = this.index;
  this.index = i + 1;
  this.requests[i].go();
};
charisma.Idea.prototype.done = function (status) {
  this._processingResponse = true;
  if (this._timeout) {
    //clear timeout?
    window.clearTimeout(this._timeout);
  }

  this.responseCount += 1;
  if (status >= 0) {
    this.connects += 1;
  }

  if (status >= 1) {
    this.successes += 1;
  }

  if (this.responseCount >= this.requests.length) {
    var t = this;
    this._timeout = window.setTimeout(function () {
      t.notify();
    }, 2000);
  }

  this._processingResponse = false;
  if (this.sequential && (this.index < this.requests.length)) {
    this.go();
  }

};
charisma.Idea.prototype.notify = function () {
  if (this._processingResponse) {
    return ;
  }

  if (this.successes == 0) {
    var text = this.connects == 0 ?"No IDE responded" :"Can't find requested file";
    Webr.event.PopupMessage.SYSTEM.show(text);
  }

};
charisma.Idea.START_PORT = 63330;
charisma.Idea.END_PORT = charisma.Idea.START_PORT + 9;
charisma.Idea.HOST = "http://127.0.0.1";
charisma.Idea.openFile = function (file, line) {
  if (true == false) {
    if (!charisma.Idea.image_) {
      charisma.Idea.image_ = document.createElement("img");
    }

    //url sample: http://127.0.0.1:63330/file?file=j/m/b/structure/VariableDeclaration.java&line=40
    for (var port = charisma.Idea.START_PORT; port <= charisma.Idea.END_PORT; ++port) {
      var url = charisma.Idea.HOST + ":" + port + "/file?file=" + file;
      if (line) {
        url += "&line=" + line;
      }

      charisma.Idea.image_.src = url;
    }

  }

  var command = "file?file=" + file;
  if (line) {
    command += "&line=" + line;
  }

  new charisma.Idea(command);
};
charisma.Idea.layoutWikiLinks = function () {
  $(".dsLink").each(function () {
    var link = $(this);
    link.removeClass("dsLink");
    var file = link.attr("txt");
    var line = link.attr("lne");
    link.click(function () {
      charisma.Idea.openFile(file, line);
    });
    link.addClass("dsLinkEnabled");
    link.attr("title", "Open in IDE");
  });
};
charisma.XSS = function (id, url) {
  this.id = id;
  this.url = url + "&noCache=" + (new Date()).getTime();
};
charisma.XSS.prototype.done = function () {
  if (this.oncomplete) {
    this.oncomplete(this.status);
  }

};
charisma.XSS.prototype.doneR = function () {
  var r = this.transport.readyState;
  if (Webr.util.Util.isOpera || r == "loaded" || r == "complete") {
    this.status = 1;
    this.doneL();
  }

};
charisma.XSS.prototype.doneL = function () {
  var w = this.transport.width;
  if (w == 2) {
    this.status = 1;
  } else {
    this.status = 0;
  }

  this.done();
};
charisma.XSS.prototype.doneE = function () {
  this.status = -1;
  this.done();
};
charisma.XSS.prototype.go = function () {
  this.transport = $("#" + this.id).get(0);
  if (this.transport) {
    this.dispose();
  }

  this.transport = new Image();
  var transport = $(this.transport);
  transport.attr("id", this.id);
  var t = this;
  if (Webr.util.Util.isOpera || Webr.util.Util.isIE) {
    transport.bind("readystatechange", function () {
      t.doneR();
    });
  } else {
    transport.bind("load", function () {
      t.doneL();
    });
  }

  transport.bind("error", function () {
    t.doneE();
  });
  transport.bind("abort", function () {
    t.doneE();
  });
  transport.css("display: none");
  this.transport.src = this.url;
};
charisma.XSS.prototype.dispose = function () {
  var t = $(this.transport);
  if (Webr.util.Util.isOpera || Webr.util.Util.isIE) {
    t.bind("readystatechange", function () {
    });
  } else {
    t.bind("load", function () {
    });
  }

  t.bind("error", function () {
  });
  t.bind("abort", function () {
  });
};
