<template>
   <div class="random grid">
      <h1 class="random__title">
         {{ title }}
      </h1>
   </div>

   <div class="random__image-container grid">
      <img :src="image" class="random__profile">
   </div>

   <div class="random__name-container grid">
      <h2 class="random__name">
         {{ name }}
      </h2>
   </div>
      
   <div class="random__button-container grid">
      <button @click="fetchApi" class="random__button">
         Get New User
      </button>

   </div>
      
</template>

<script>
export default {
   data() {
      return {
         title: 'Random Users',
         image: '',
         name: '',
      };
   },

   created() {
      this.fetchApi();
   },

   methods: {
      async fetchApi() {
         const url = 'https://randomuser.me/api';
         const res = await fetch(url);
         const { results } = await res.json();
         this.name = `${results[0].name.first} ${results[0].name.last}`;
         this.image = results[0].picture.large
      }
   }
}
</script>

<style scoped>
.random__title {
   grid-column: 6;
   width: 350px;
   margin-top: 10px;
   font-size: 56px;
}

.random__profile {
   grid-column: 6;
   width: 300px;
   height: 300px;
   border-radius: 100px;
}

.random__name {
   grid-column: 6;
   font-size: 56px;
}

.random__button {
   grid-column: 6;
}
</style>