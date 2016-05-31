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
      return state.onUpdate(data);
    }
    else {
      let parent = this;
      this[state.to] = {
        on: function(data) {
          return state.on(data)
        },
        off: function(data) {
          if (!data || !data.state)
          return 'PRISM: missing data or state';
          else if (state.from === data.state)
          return state.off(data);
          else if (parent.onUpdate)
          return parent['onUpdate'](data)
          .then(parent['callState'](data));
          else
          return parent['callState'](data);
        },
      }
      this.nextState.push({current: state.from, next: state.to});
    }
  },

  callState: function(data) {
    this[data.state].on(data)
    .then(this[data.state].off)
    .catch(function(error) {
      console.log(error);
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
