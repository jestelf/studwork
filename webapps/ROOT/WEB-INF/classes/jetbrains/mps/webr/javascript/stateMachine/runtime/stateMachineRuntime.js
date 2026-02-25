Webr.stateMachine.stateMachineRuntime = function () {
};
Webr.stateMachine.stateMachineRuntime.ON_ENTER = "onenter";
Webr.stateMachine.stateMachineRuntime.ON_EXIT = "onexit";
Webr.stateMachine.stateMachineRuntime.PARENT_STATE = "parentState";
Webr.stateMachine.stateMachineRuntime.CURRENT_STATE = "current_state";
Webr.stateMachine.stateMachineRuntime.LOG_FUNCTION = "_log_";
Webr.stateMachine.stateMachineRuntime.handleEvent = function (scope, event, args) {
  var state = scope[Webr.stateMachine.stateMachineRuntime.CURRENT_STATE];
  Webr.stateMachine.stateMachineRuntime.log(scope, "{ on " + event);
  var handler;
  do{
    Webr.stateMachine.stateMachineRuntime.log(scope, "  ?" + Webr.stateMachine.stateMachineRuntime.getName(state));
    handler = state[event];
    if (handler) {
      var targetState = handler.apply(scope, args);
      if (targetState !== false) {
        Webr.stateMachine.stateMachineRuntime.log(scope, "  !");
        if (targetState != null) {
          scope[Webr.stateMachine.stateMachineRuntime.CURRENT_STATE] = targetState;
        }

                break;

      }

    }

    state = state[Webr.stateMachine.stateMachineRuntime.PARENT_STATE];
  } while (state);

  Webr.stateMachine.stateMachineRuntime.log(scope, "}");
};
Webr.stateMachine.stateMachineRuntime.handleOnEnter = function (scope, state) {
  Webr.stateMachine.stateMachineRuntime.log(scope, "  -> " + Webr.stateMachine.stateMachineRuntime.getName(state));
  var handler = state[Webr.stateMachine.stateMachineRuntime.ON_ENTER];
  if (handler) {
    handler.call(scope);
  }

};
Webr.stateMachine.stateMachineRuntime.handleOnExit = function (scope, state) {
  Webr.stateMachine.stateMachineRuntime.log(scope, "  <- " + Webr.stateMachine.stateMachineRuntime.getName(state));
  var handler = state[Webr.stateMachine.stateMachineRuntime.ON_EXIT];
  if (handler) {
    handler.call(scope);
  }

};
Webr.stateMachine.stateMachineRuntime.log = function (scope, message) {
  var logFunction = scope[Webr.stateMachine.stateMachineRuntime.LOG_FUNCTION];
  if (logFunction) {
    logFunction.call(scope, [message]);
  }

};
Webr.stateMachine.stateMachineRuntime.getName = function (state) {
  var name = state.name;
  if (!name) {
    name = "<undef>";
  }

  return name;
};
