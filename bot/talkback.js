export default {

  create: function(config, options) {
    config.contexts.forEach(function(context) {
      this.allContexts.push(context);
    }, this);
    options ? this.options = {...options} : null;
  },

  saying: function(text) {
    return this.tryContext(text)
  },

  tryContext: function(text) {
    for (var index in this.allContexts) {
      const context = this.allContexts[index];
      const regex = new RegExp(`\\b(${context.words})(.?|y|i)(es\\b|\\b)`, 'ig');
      let match = text.match(regex);
      if (match) {
        let answer = context.rules({text, match: match, options: this.options});
        if (answer)
        return answer;
      }
    };
    // return this.defaultCase
  },

  allContexts: [],
  options: {},

}
