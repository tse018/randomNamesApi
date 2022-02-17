<template>
   <div class="grid">
      <h1>
         {{ title }}
      </h1>
   </div>

   <div class="grid">
      <input type="text" v-model="nameValue">
   </div>

   <div class="grid">
      <h2> 
         {{ nameValue }}
      </h2>
   </div>

   <div class="grid">
      <h2>
         {{ personEmail}}
      </h2>
   </div>

   <div class="grid">
      <button @click="fetchUsers">
         Click here
      </button>
   </div>
</template>

<script>
export default {
   data() {
      return {
         title: 'Users Data',
         users: [],
         nameValue: '',
         personEmail: '',
      };
   },

   methods: {
      async fetchUsers() {
         const url = 'https://randomuser.me/api/?page=2&results=20';
         const response = await fetch(url);
         const { results, info } = await response.json();

         this.users = results;
      }
   }
}
</script>

<style>


</style>