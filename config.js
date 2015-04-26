System.config({
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.1.13",
    "babel-runtime": "npm:babel-runtime@5.1.13",
    "backbone": "npm:backbone@1.1.2",
    "backbone.babysitter": "github:marionettejs/backbone.babysitter@0.1.6",
    "backbone.wreqr": "github:marionettejs/backbone.wreqr@1.3.2",
    "components/handlebars.js": "github:components/handlebars.js@3.0.2",
    "core-js": "npm:core-js@0.8.4",
    "handlebars": "github:components/handlebars.js@3.0.2",
    "jquery": "github:components/jquery@2.1.3",
    "marionette": "github:marionettejs/backbone.marionette@2.4.1",
    "marionettejs/backbone.babysitter": "github:marionettejs/backbone.babysitter@0.1.6",
    "marionettejs/backbone.marionette": "github:marionettejs/backbone.marionette@2.4.1",
    "marionettejs/backbone.wreqr": "github:marionettejs/backbone.wreqr@1.3.2",
    "txt": "github:systemjs/plugin-text@0.0.2",
    "underscore": "npm:underscore@1.8.3",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:n-fuse/plugin-ember-hbs@1.11.1": {
      "ember-template-compiler": "github:n-fuse/ember-template-compiler@1.11.3"
    },
    "npm:backbone@1.1.2": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "underscore": "npm:underscore@1.8.3"
    },
    "npm:core-js@0.8.4": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

