var items = [];

//List all the items template
var SettingsForm = Vue.extend({
  template: '#settings-form',
  data: function () {
    return {
      items: items,
      limit: 0,
      searchQuery: '',
      columnsNames: ['name', 'email', 'createdAt', 'READ', 'EDIT', 'DELETE'],
      searchREAD: 0,
      searchEDIT: 0,
      searchDELETE: 0,
    };
  },
  created: function () {
    network.getSettingsItems (this);
  },
  watch: {
    $route : function () {
      console.log('---List-watch');
      //If we changed a page
     /*
      if (this.$route && this.$route.params && this.$route.params.page){
          this.getItemsFromAPI (this.$route.params.page);
      }
      */
    }
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
        save_items[i].READ = this.items[i] ['READ'] ? 1 : 0;
        save_items[i].EDIT = this.items[i] ['EDIT'] ? 1 : 0;
        save_items[i].DELETE = this.items[i] ['DELETE'] ? 1 : 0;

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
    filterRead: 0,
    filterEdit: 0,
    filterDelete: 0,
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
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var filterRead = this.filterRead;
      var filterEdit = this.filterEdit;
      var filterDelete = this.filterDelete;
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
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
      if (filterRead && filterRead != 0) {
        data = data.filter(function (row) {
          if (row['READ'] && filterRead == 1) return true;
          if (!row['READ'] && filterRead == 2) return true;
          return false;
        }) 
      }
      if (filterEdit && filterEdit != 0) {
        data = data.filter(function (row) {
          if (row['EDIT'] && filterEdit == 1) return true;
          if (!row['EDIT'] && filterEdit == 2) return true;
          return false;
        }) 
      }
      if (filterDelete && filterDelete != 0) {
        data = data.filter(function (row) {
          if (row['DELETE'] && filterDelete == 1) return true;
          if (!row['DELETE'] && filterDelete == 2) return true;
          return false;
        }) 
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})
