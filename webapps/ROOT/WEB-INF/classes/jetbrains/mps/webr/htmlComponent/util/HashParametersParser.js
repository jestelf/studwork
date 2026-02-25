Webr.util.HashParametersParser = function (s, listener) {
  this.current = 0;
  this.keyStart = 0;
  this.keyEnd = 0;
  this.valueStart = 0;
  this.current_state = null;
  this.inputString = s;
  this.listener = listener;
  this.current_state = Webr.util.HashParametersParser.state_START;
};
Webr.util.HashParametersParser.prototype.parse = function () {
  if (this.inputString && this.inputString.length > 0) {
    while (this.current < this.inputString.length) {
      switch (this.inputString.charAt(this.current)) {
      case "#":
                break;

      case " ":
                break;

      case "=":
        this.equals();
                break;

      case "&":
        this.and();
                break;

      default:
        this.character();
      }

      ++(this.current);
    }

  }

  this.eol();
};
Webr.util.HashParametersParser.prototype.pushKey = function (key) {
  this.listener.parameter(key, null);
};
Webr.util.HashParametersParser.prototype.pushParameter = function (key, value) {
  this.listener.parameter(key, value);
};
Webr.util.HashParametersParser.prototype.setInputString = function (s) {
  this.inputString = s;
  this.reset();
};
Webr.util.HashParametersParser.prototype.equals = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "equals", arguments);
};
Webr.util.HashParametersParser.prototype.character = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "character", arguments);
};
Webr.util.HashParametersParser.prototype.and = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "and", arguments);
};
Webr.util.HashParametersParser.prototype.eol = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "eol", arguments);
};
Webr.util.HashParametersParser.prototype.reset = function () {
  Webr.stateMachine.stateMachineRuntime.handleEvent(this, "reset", arguments);
};
Webr.util.HashParametersParser.state_START = {name: "START", character: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.util.HashParametersParser.state_READ_KEY);
    }

    return Webr.util.HashParametersParser.state_READ_KEY;
  }

  return false;
}, equals: function () {
  if (true) {
    this.keyStart = this.keyEnd;
        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.util.HashParametersParser.state_READ_VALUE);
    }

    return Webr.util.HashParametersParser.state_READ_VALUE;
  }

  return false;
}, eol: function () {
  if (true) {
    return Webr.util.HashParametersParser.state_FINAL;
  }

  return false;
}};
Webr.util.HashParametersParser.state_READ_KEY = {name: "READ_KEY", onenter: function () {
  this.keyStart = this.current;
}, onexit: function () {
  this.keyEnd = this.current;
}, equals: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.util.HashParametersParser.state_READ_KEY);
    }

        {
      Webr.stateMachine.stateMachineRuntime.handleOnEnter(this, Webr.util.HashParametersParser.state_READ_VALUE);
    }

    return Webr.util.HashParametersParser.state_READ_VALUE;
  }

  return false;
}, and: function () {
  if (true) {
    this.pushKey(this.inputString.substring(this.keyStart, this.current));
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.util.HashParametersParser.state_READ_KEY);
    }

    return Webr.util.HashParametersParser.state_START;
  }

  return false;
}, eol: function () {
  if (true) {
    this.pushKey(this.inputString.substring(this.keyStart, this.current));
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.util.HashParametersParser.state_READ_KEY);
    }

    return Webr.util.HashParametersParser.state_FINAL;
  }

  return false;
}};
Webr.util.HashParametersParser.state_READ_VALUE = {name: "READ_VALUE", onenter: function () {
  this.valueStart = this.current + 1;
}, onexit: function () {
  if (this.keyStart != this.keyEnd) {
    this.pushParameter(this.inputString.substring(this.keyStart, this.keyEnd), this.inputString.substring(this.valueStart, this.current));
  } else {
    this.pushParameter("", this.inputString.substring(this.valueStart, this.current));
  }

}, and: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.util.HashParametersParser.state_READ_VALUE);
    }

    return Webr.util.HashParametersParser.state_START;
  }

  return false;
}, eol: function () {
  if (true) {
        {
      Webr.stateMachine.stateMachineRuntime.handleOnExit(this, Webr.util.HashParametersParser.state_READ_VALUE);
    }

    return Webr.util.HashParametersParser.state_FINAL;
  }

  return false;
}};
Webr.util.HashParametersParser.state_FINAL = {name: "FINAL", reset: function () {
  if (true) {
    this.current = 0;
    this.keyStart = 0;
    this.keyEnd = 0;
    this.valueStart = 0;
    return Webr.util.HashParametersParser.state_START;
  }

  return false;
}};
Webr.util.HashParameterListener = function () {
};
Webr.util.HashParameterListener.prototype.parameter = function (key, value) {
};
