(function () {
var router = new VueRouter({

  routes: [
    {path: '/', component: CommunicationForm},
    //{path:   '/:page', component: LoginForm, name: 'page'},
    //{path: '/item/:item_id', component: Item, name: 'item'},
    //{path: '/add-item', component: AddItem, name: 'add-item'},
    //{path: '/item/:item_id/edit', component: ItemEdit, name: 'edit-item'},
    //{path:   '/item/:item_id/delete', component: ItemDelete, name: 'delete-item'}

  ]

});

new Vue({
  el: '#app',
  router: router,
  template: '<router-view></router-view>'
});

})();