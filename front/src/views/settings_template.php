<template id="settings-form">
  <section>
  
  <div class="div-table-col1  panel panel-default ">

    <div class="panel-heading">Search filters</div>

    <div class="col-sm-31 panel-body">
        <div class="form-group">
          <label for="searchQueryInput">Search</label>
          <input id="searchQueryInput" name="query" v-model="searchQuery" placeholder="Search for...">
        </div>
        
        <div class="form-group">
            <span class="badge badge-pill badge-default badge-perm"> - Search by permissions - </span>

          
        </div>
        <div class="form-group">
          <label for="search-read"> Read</label>
          <select  id="search-read" v-model="searchREAD">
            <option value = '0' >-</option>
            <option value = '1'>Yes</option>
            <option value = '2'>No</option>
          </select>

          <label for="search-edit"> Edit</label>
          <select  id="search-edit" v-model="searchEDIT">
            <option value = '0' >-</option>
            <option value = '1'>Yes</option>
            <option value = '2'>No</option>
          </select>

          <label for="search-delete"> Delete </label>
          <select  id="search-delete" v-model="searchDELETE">
            <option value = '0' >-</option>
            <option value = '1'>Yes</option>
            <option value = '2'>No</option>
          </select>
        </div>

          

    </div>
  </div>

  

  <users-grid
    :data="items"
    :columns="columnsNames"
    :filter-key="searchQuery"
    :filter-read="searchREAD"
    :filter-edit="searchEDIT"
    :filter-delete="searchDELETE"
    >
  </users-grid>
  <div class="footer">
    <button type="Button" class="btn btn-primary  float-right btn-lg"  @click="save()" >Save changes</button>
  </div>
  

  </section>
</template>

<template id="users-table">
  <table  class="table table-striped">
    <thead>
      <tr>
        <th  @click="sortBy('name')" class="hand" :class="{ active: sortKey == 'name' }">
          Name
          <span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
        <th  @click="sortBy('email')" class="hand" :class="{ active: sortKey == 'email' }">
          Email
          <span class="arrow" :class="sortOrders['email'] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
        <th  @click="sortBy('createdAt')" class="hand" :class="{ active: sortKey == 'createdAt' }">
          Created
          <span class="arrow" :class="sortOrders['createdAt'] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
        <th  @click="sortBy('READ')" class="hand" :class="{ active: sortKey == 'READ' }">
          READ
          <span class="arrow" :class="sortOrders['READ'] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
        <th  @click="sortBy('EDIT')" class="hand" :class="{ active: sortKey == 'EDIT' }">
          EDIT
          <span class="arrow" :class="sortOrders['EDIT'] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
        <th  @click="sortBy('DELETE')" class="hand" :class="{ active: sortKey == 'DELETE' }">
          DELETE
          <span class="arrow" :class="sortOrders['DELETE'] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filteredData">
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.createdAt }}</td>
        <td>
          <input type="checkbox" value="1" v-model="item.READ">
        </td>
        <td>
          <input type="checkbox" value="1" v-model="item.EDIT">
        </td>
        <td>
          <input type="checkbox" value="1" v-model="item.DELETE">
        </td>
      </tr>
    </tbody>
  </table>

</template>