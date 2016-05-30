export default {
  create: function(states) {
    states.forEach(this.addState, this);
  },
  addState: function(state) {
    this[state.to] = {
      on: (data) => {},
      switch: (newState, data) => { this.callState(newState, data) },
      off: (data) => {},
    }
    this.nextState.push({current: state.from, next: state.to});
  },
  callState: function(state, data) {
    this[state].on(data)
    .then(function(data) {
      debugger;
      this[state][data.next](data);
    });
  },
  next: function(currentState, data) {
    this.nextState.forEach(this.findNextState(currentState, data), this);
  },
  findNextState: function(currentState, data) {
    return function(state) {
      if (currentState === state.current)
      return this.callState(state.next, data)
    }
  },
  nextState: [],
}
