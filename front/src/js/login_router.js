
(function () {
var router = new VueRouter({
  routes: [
    {path: '/', component: LoginForm},
  ]
});

new Vue({
  el: '#app',
  router: router,
  template: '<router-view></router-view>'
});

})();
