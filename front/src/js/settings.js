var items = [];

//List all the items template
var SettingsForm = Vue.extend({
  template: '#settings-form',
  data: function () {
    return {
      items: items,
      limit: 0,
      searchQuery: '',
      columnsNames: ['name', 'email', 'createdAt', 'READ', 'EDIT', 'DELETE', 'NONE'],
      searchPermission: '',
    };
  },
  created: function () {
    network.getSettingsItems (this);
  },
  methods : {
     /**
      * updates items info using the JSON object got from the API server
      * 
      * @param itemsO Object , JSON Object got from the API server
    */
    updateItems : function (itemsO) {
      console.log(112);
      console.log(itemsO);
      if (!itemsO || ! itemsO.data){ this.items = {}; return; }
      console.log(113);

      this.items = _.clone(itemsO.data);
      items = this.items;
    },

    /**
      *  Save changes, if there were some
    */
    save: function () {
      console.log('--------------save------------------');
      var save_items = []; 
      for (var i = 0; i < this.items.length; i++ ) {
        save_items[i] = {};
        save_items[i].id = this.items[i] ['id'];
        save_items[i].name = this.items[i] ['name'];
        save_items[i].email = this.items[i] ['email'];
        save_items[i].createdAt = this.items[i] ['createdAt'];
        save_items[i].permissions =  this.items[i] ['permissions'];
      }
      console.log (items);
      network.saveSettingsItems(save_items);
    },
   }
});

// register the grid component
Vue.component('users-grid', {
  template: '#users-table',
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
    filterPermission: 0,
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    /**
    * Returns filtered data (for search filters and sorting)
    **/
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var filterPermission = this.filterPermission;
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      //Filter by filterKey String (Search string)
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            if (_.includes(['name','email', 'createdAt' ], key)){
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            }
            else return false;
          })
        })
      }
      //Filter by permissions
      if ( filterPermission && filterPermission != '' ) {
        data = data.filter(function (row) {
          if (filterPermission == row['permissions'] ) return true;
          return false;
        }) 
      }
      //Sort by of the field
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          if (sortKey == 'READ'){
            a = a['permissions']
            b = b['permissions']
            return (a === b ? 0 : a == 1 ? 1 : -1) * order
          }
          else if (sortKey == 'EDIT'){
            a = a['permissions']
            b = b['permissions']
            return (a === b ? 0 : a == 2 ? 1 : -1) * order
          }
          else if (sortKey == 'DELETE'){
            a = a['permissions']
            b = b['permissions']
            return (a === b ? 0 : a == 3 ? 1 : -1) * order
          }
          else if (sortKey == 'NONE'){
            a = a['permissions']
            b = b['permissions']
            return (a === b ? 0 : a == 0 ? 1 : -1) * order
          }
          else {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          }
        })
      }
      return data
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})
