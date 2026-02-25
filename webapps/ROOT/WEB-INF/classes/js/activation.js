function __log(s) {
}

function XSS(id, url, baseUrl, issueId) {
  this.id = id;
  this.url = url + "&noCache=" + (new Date()).getTime();
  this.issueId = issueId;
  this.baseUrl = baseUrl;
}

XSS.prototype.done = function() {
  this.status = this.transport.width;
  this.parent.removeChild(this.transport);
  __log("XSS Done: ="+this.id+" // "+ this.status);
  if (this.oncomplete) this.oncomplete(this.status);
};

XSS.prototype.go = function() {
  __log("XSS.go:" + this.id + " " + this.url);
  this.transport = document.getElementById(this.id);
  this.parent = document.getElementsByTagName("body").item(0);
  if (this.transport) this.parent.removeChild(this.transport);
  this.transport = document.createElement("img");
  this.transport.setAttribute("id", this.id);
  this.transport.setAttribute("src", this.url);

// this.transport.onload = reloadScreen();
//  this.transport.onerror = reloadScreen();
//  this.transport.onabort = reloadScreen();

  var my = this;

  this.transport.onerror = function() {
    window.alert("Screenshot attached to issue: " + my.issueId);
    window.location = my.baseUrl + '/issue/edit_IssueEdit_0_handler?event_source=root.Issue.IssueAttachments&event_=addAttach&issue=' + my.issueId;
  }

  this.parent.appendChild(this.transport);
};

function XSSBroadcast(command, baseUrl, issueId) {
  this.id = Math.random();

  var START_PORT = 1234;
  var END_PORT = START_PORT;
  var HOST = "http://127.0.0.1";

  __log("XSSBroadcast:");
  this.responseCount = 0;
  this.successes = 0;
  this.connects = 0;
  this.resquests = [];
  for (var port = START_PORT; port <= END_PORT; port++) {
    var uri = HOST + ":" + port + "/" + command;
    var xss = new XSS("r_" + this.id + "_" + port, uri, baseUrl, issueId);
    //xss.oncomplete = this.done.bind(this);
    this.resquests.push(xss);
    xss.go();
  }
}

XSSBroadcast.prototype.done = function(status) {
  this.responseCount++;
  if (status==1) {
    this.connects++
  } else if (status==2) {
    this.successes++
  }

  __log("XSSBroadcast Done "+ status +" responseCount:"+this.responseCount + "/" + this.resquests.length);
  if(this.responseCount == this.resquests.length) {
    __log("XSSBroadcast complete: "+this.connects+"-"+this.successes+"/"+this.resquests.length);
    if(this.successes==0)
      if (this.connects==0)
        alert("No IDE responded.\n\nActivation requires IDE with TC plugin"
             +" (which can be downloaded from 'My Settings' page) installed to be running.");
      else
        alert("IDE can't find requested data.");

  }
};

var Activator = {};

Activator.doOpen = function (command, baseUrl, issueId) {
  new XSSBroadcast(command, baseUrl, issueId);
}
