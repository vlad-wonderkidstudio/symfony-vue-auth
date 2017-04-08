<template id="communication-form">
  <section>
  
  <div class="div-table-col1  panel panel-default ">
    <div class="panel-heading">Tag Box</div>
    <div class="panel-body">
        <div class="form-group tag-box" >
            <span id="nameBadge" class="badge badge-pill badge-default" v-bind:draggable="(items.EDIT || items.DELETE)?true:false" :class="(items.EDIT || items.DELETE)?'hand':''" v-if="!items.name.isPlaced" @dragstart="dragStart"> Name </span>
            <span id="emailBadge" class="badge badge-pill badge-default" v-bind:draggable="(items.EDIT || items.DELETE)?true:false" :class="(items.EDIT || items.DELETE)?'hand':''"  v-if = "!items.email.isPlaced" @dragstart="dragStart"> EMail </span>
            <span id="createdBadge" class="badge badge-pill badge-default" v-bind:draggable="(items.EDIT || items.DELETE)?true:false" :class="(items.EDIT || items.DELETE)?'hand':''"  v-if = "!items.createdAt.isPlaced" @dragstart="dragStart"> Created </span>
       </div>
    </div>
  </div>

  <div @dragover.prevent @drop="drop" class="drag-area" >Drop here...
    <span class="badge badge-pill badge-default" v-if = "items.name.isPlaced" v-bind:style="styleName"> {{items['name'].value}} </span>
    <span class="badge badge-pill badge-default" v-if = "items.email.isPlaced" v-bind:style="styleEmail"> {{items['email'].value}} </span>
    <span class="badge badge-pill badge-default" v-if = "items.createdAt.isPlaced" v-bind:style="styleCreatedAt"> {{items['createdAt'].value}} </span>
  </div>

  <div class="footer">
    <button type="Button" class="btn btn-danger  float-right btn-lg"  v-if="items.DELETE" @click="deleteItem()" >Delete</button>

    <button type="Button" class="btn btn-primary  float-right btn-lg" v-if="items.EDIT || items.DELETE" @click="save()" >Save changes</button>
  </div>
  

  </section>
</template>