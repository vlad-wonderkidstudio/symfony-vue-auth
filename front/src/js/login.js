//Login Form template
var LoginForm = Vue.extend({
  template: '#login-form',
  data: function () {
    return {
        // We need to initialize the component with any
        // properties that will be used in it
        credentials: {
          username: '',
          password: ''
        },
        error: ''
    };
  },
  methods : {
    submit: function () {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      network.login(this, credentials)
    }
  }
});
