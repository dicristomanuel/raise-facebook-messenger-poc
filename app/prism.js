export default {
  create: function(states) {
    this.states = states;
    states.forEach(this.addState, this);
  },
  // states: {},
  addState: function(state) {
    this[state.to] = {
      on: (data) => {},
      switch: (newState) => { this.callState(newState) },
      off: (data) => {},
    }
  },
  callState: function(state) {
    this[state]();
  },
}
