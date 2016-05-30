export default {
  create: function(states) {
    states.forEach(this.addState, this);
  },
  addState: function(state) {
    this[state.to] = {
      on: state.on,
      switch: (data) => {
        return new Promise((resolve, reject) => {
          data.switch.execute ? reject(this.callState(data.switch.newState, data)) : resolve(data);
        });
      },
      off: state.off,
    }
    this.nextState.push({current: state.from, next: state.to});
  },
  callState: function(state, data) {
    this[state].on(data)
    .then(this[state].switch(data))
    .then(this[state].off(data));
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
