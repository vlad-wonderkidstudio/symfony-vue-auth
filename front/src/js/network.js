var network = {

  // URL and endpoint constants
  //Change it to the path to PHP that cheks, if logged in or not.
  LOGIN_URL : '/back/index.php?act=login',
  LOGOUT_URL : '/back/index.php?act=logout',
  SETTINGS_ITEMS_GET : '/back/index.php?act=getsettingsitems',
  SETTINGS_ITEMS_SAVE : '/back/index.php?act=savesettingsitems',

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login: function (context, params) {
    var self = this;
    axios.post(self.LOGIN_URL, params)
      .then(function (response) {
        console.log(response);
        //save to browser's local storage
        localStorage.setItem('id_token', response.data.id_token)
        self.user.authenticated = true
        window.location = 'main.php';
      })
      .catch(function (err) {
        if (err && err.response && err.response.statusText) {
          context.error = err.response.statusText;
        }
      });
  },

  // To log out, we just need to remove the token
  logout: function () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false

    axios.post(this.LOGOUT_URL)
      .then(function (response) {
        window.location = 'login.php';
      })
      .catch(function (err) {
        alert('Error while logging out');
      });
  },

  checkAuth: function () {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader: function () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  },

  /**
    * get the items from the API server
    * 
    * @param context Object - a Vue object inside which it was launched
  */
  getSettingsItems : function (context){
    var url = this.SETTINGS_ITEMS_GET;
    
    axios.get(url)
      .then(function (response) {
        console.log(response);
        context.updateItems (response.data);  
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  },

  /**
    * Save items to API server
  */
  saveSettingsItems: function (params) {
    var url = this.SETTINGS_ITEMS_SAVE;
    //var params = {};
    axios.post(url, params)
      .then(function (response) {
        console.log(response);
        alert('saved');
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }
};