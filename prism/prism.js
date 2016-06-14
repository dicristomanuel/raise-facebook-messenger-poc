export default {
  create: function(states) {
    states.forEach(this.addState, this);
  },

  next: function(data) {
    this.nextState.forEach(this.findNextState(data), this);
  },

  addState: function(state) {
    if (state.onUpdate)
    this['onUpdate'] = function(data) {
      return new Promise((resolve, reject) => {
        resolve(state.onUpdate(data));
      });
    }
    else {
      let parent = this;
      this[state.to] = {
        on: function(data) {
          return new Promise((resolve, reject) => {
            data ? resolve(state.on(data)) : reject('PRISM: missing data or state');
          });
        },
        off: function(data) {
          return new Promise((resolve, reject) => {
            if (!data.state)
            reject('PRISM: missing data or state');
            else if (state.from === data.state)
            resolve(state.off(data));
            else if (parent.onUpdate)
            resolve(parent['onUpdate'](data)
            .then(parent['callState'](data)));
            else
            resolve(parent['callState'](data));
          });
        },
      }
      this.nextState.push({current: state.from, next: state.to});
    }
  },

  callState: function(data) {
    this[data.state].on(data)
    .then(this[data.state].off)
    .catch(function(error) {
      console.log(`>>>> ${error} <<<<`);
    });
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
