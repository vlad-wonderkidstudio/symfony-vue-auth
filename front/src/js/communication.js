var CommunicationForm = Vue.extend({
  template: '#communication-form',
  data: function () {
    return {
      items: {
        name: {},
        email: {},
        createdAt: {},
      },

      styleName: {
        top: '0px',
        left: '0px',
      },
      styleEmail: {
        top: '0px',
        left: '0px',
      },
      styleCreatedAt: {
        top: '0px',
        left: '0px',
      },
      draggedItem: '',
      draggedItemCoords: {},
    };
  },
  created: function () {
    network.getCommunicationItems (this);
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
      this.refreshItems();
    },

    refreshItems: function (){
      if (this.items.name.isPlaced){
        this.styleName.top = this.items.name.top + 'px';
        this.styleName.left = this.items.name.left + 'px';
      }
      if (this.items.email.isPlaced){
        this.styleEmail.top = this.items.email.top + 'px';
        this.styleEmail.left = this.items.email.left + 'px';
      }
      if (this.items.createdAt.isPlaced){
        this.styleCreatedAt.top = this.items.createdAt.top + 'px';
        this.styleCreatedAt.left = this.items.createdAt.left + 'px';
      }
    },
    /**
    * Occures, when the drag'n'drop finises under the drop arae
    */
    drop: function(e) {
      console.log('Looks like you dropped something!');
      console.log(e);
      coords = getOffset(e);
      console.log (coords.x);
      console.log (coords.y);
      coords.x -= this.draggedItemCoords.x;
      coords.y -= this.draggedItemCoords.y;
      switch (this.draggedItem) {
        case 'nameBadge':
            this.items.name.isPlaced = 1;
            this.items.name.top = coords.y;
            this.items.name.left = coords.x;
          break;
        case 'emailBadge':
            this.items.email.isPlaced = 1;
            this.items.email.top = coords.y;
            this.items.email.left = coords.x;
          break;
        case 'createdBadge':
            this.items.createdAt.isPlaced = 1;
            this.items.createdAt.top = coords.y;
            this.items.createdAt.left = coords.x;
          break;
        default:
          break;
      }
      this.refreshItems();

    },
    /**
    * Occures, when we start to drag a tag
    */
    dragStart: function (e) {
      console.log('=========drag start');
      coords = getOffset(e);
      this.draggedItemCoords = coords;
      console.log (coords);
      this.draggedItem = e.target.id;
      e.dataTransfer.setData('Text', this.id);
    },

    /**
      *  Save changes, if there were some
    */
    save: function () {
      console.log('--------------save------------------');
      console.log (this.items);
      network.saveCommunicationItems(this.items);
    },

    /**
      *   Delete whole content and remove item from db.
    */
    deleteItem: function () {
      console.log('--------------delete------------------');
      network.deleteCommunicationItems();
      this.items = {
        name: {},
        email: {},
        createdAt: {},
      };
    },


   }
});

function getOffset(evt) {
  var el = evt.target,
      x = 0,
      y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - el.scrollLeft;
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }

  x = evt.clientX - x;
  y = evt.clientY - y;

  return { x: x, y: y };
}