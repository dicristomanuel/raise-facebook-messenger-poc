export default {

  create: function(config, options, defaultAnswer) {
    config.contexts.forEach(function(context) {
      this.allContexts.push(context);
    }, this);
    options ? this.options = {...options} : null;
    defaultAnswer ? this.defaultAnswer = defaultAnswer : null;
    this.addPrototypes();
  },

  // greetingRules(): function {
  //   const props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  //
  //
  //
  // },

  addPrototypes: function() {
    String.prototype.herLength = function(max) {
      if (this.length <= max)
        return true;
      else
        return false;
    };

    String.prototype.herSubstring = function(min, max, word) {
      if (this.substring(min, max).includes(word))
        return true;
      else
        return false;
    };
  },

  saying: function(text) {
    const answer = this.tryContext(text);
    return answer ? answer : { answer: this.defaultAnswer };
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
  },

  allContexts: [],
  options: {},
  evolve: {},
}

// keep average of greetings lengths for example - evolve: true
// learn from user ? how do I write/read your DB?
// user's mood

// her.greetingRules = this.defaultRulesFunction
