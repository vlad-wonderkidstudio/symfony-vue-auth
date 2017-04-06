
<template id ="login-form">

  <div class="panel panel-default form-group form-center">
    <div class="panel-heading" >Log In</div>
    <div class="panel-body">
      <p>Please enter your login and password (e.g. admin/123)</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <label for="usernameInput">Email address</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter your username"
          v-model="credentials.username"
          id = "usernameInput"
          @keyup.enter="submit()"
        >
      </div>
      <div class="form-group">
        <label for="passwordInput">Password address</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="credentials.password"
          id = "passwordInput"
          @keyup.enter="submit()"
        >
      </div>
      <button class="btn btn-primary" @click="submit()">Login</button>
    </div>
  </div>
</template>