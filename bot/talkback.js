export default {

  create: function(config) {
    config.contexts.forEach(this.addContexts, this);
    config.rules.forEach(this.addRules, this);
  },

  addContexts: function(context) {
    this.allContexts.push(context);
  },

  AddRules: function(rule) {
    this.allRules.push(rule);
  },

  saying: function(text) {
    this.currentText = text;
    this.tryContext()
  },

  tryContext: function() {
    this.allContexts.forEach(this.filterContext, this)
  },

  filterContext: function(context) {
    const regex = new RegExp(`\\b(${context.data})(.?|y|i)(es\\b|\\b)`, 'ig');
    if (this.currentText.match(regex))
    this.currentContext = context.name
    this.initRules();
  },

  initRules: function() {
    this.allRules.forEach(this.checkRule, this)
  },

  checkRule: function(rule) {
    rule.data // then check rules
  }

  allContexts: [],
  allRules: [],
  currentText: undefined,
  currentContext: undefined,

}
