export default {
  create: function(states) {
    states.forEach(this.addState, this);
  },
  addState: function(state) {
    if (state.onUpdate) {
      this['onUpdate'] = function(data) {
        return new Promise(function(resolve, reject) {
          resolve(state.onUpdate(data));
        });
      };
    } else {
      let parent = this;
      this[state.to] = {
        on: function(data) {
          return new Promise(function(resolve, reject) {
            debugger;
            resolve(state.on(data));
          });
        },
        off: function(data) {
          return new Promise(function(resolve, reject) {
            if (state.from === data.state)
            resolve(state.off(data));
            else if (parent.onUpdate)
            resolve(parent['onUpdate'](data)
            .then(parent['callState']));
            else
            resolve(data);
          });
        },
      }
      this.nextState.push({current: state.from, next: state.to});
    }
  },
  callState: function(data) {
    this[data.state].on(data)
    .then(this[data.state].off(data));
    // .then(200)
    // .catch(500);
  },
  next: function(data) {
    this.nextState.forEach(this.findNextState(data), this);
  },
  findNextState: function(data) {
    return function(state) {
      if (data.state === state.current) {
        if (this.onUpdate)
        this.onUpdate({ ...data, state: state.next });
        return this.callState({ ...data, state: state.next });
      }
    }
  },
  nextState: [],
}
