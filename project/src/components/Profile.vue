<template>
   <div class="random grid">
      <h1 class="random__title">
         {{ title }}
      </h1>
   </div>

   <div class="random__image-container grid">
      <img :src="image" :alt="image" class="random__profile">
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

   <p v-if="error" class="errors">
      {{ error }}
   </p>
      
</template>

<script>
export default {
   data() {
      return {
         title: 'Random Users',
         image: '',
         name: '',
         error: '',
      };
   },

   created() {
      this.fetchApi();
   },

   methods: {
      /* funksjon som fetcher data */
      async fetchApi() {
         const url = 'https://randomuser.me/apis';
         const response = await fetch(url);
         try {
            await this.handleResponse(response);
         } catch (error) {
            this.error = error.message;
         }
      },

      /* her så sjekker vi response statusen som blir mottatt av url og tar response som argument */
      async handleResponse(response) {
         console.log(response);
         if(response.status >= 200 && response.status < 300) {
            console.log('ok');
            const { results } = await response.json();
            this.name = `${results[0].name.first} ${results[0].name.last}`;
            this.image = results[0].picture.large;
         } else {
            if(response.status === 404) {
               throw new Error('Feil med fetching av url!');
            }
            if(response.status === 401) {
               throw new Error('Ikke authorisert!');
            }
            if(response.status > 500) {
               throw new Error('Server ikke funnet');
            }
            throw new Error('Generetisk feil!');
         }
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
   grid-column: 5 / 9;
   margin: 20px 0 0 40px;
   font-size: 56px;
}

.random__button {
   grid-column: 5 / 8;
   margin-top: 50px;
   font-size: 40px;
   color: blue;
}

.random__button:hover {
   color: red;
   background-color: antiquewhite;
}

.errors {
   position: absolute;
   top: 0;
   width: 100vw;
   height: 100vh;
   background-color: red;
   color: white;
   padding: 250px;
   margin: 1rem;
   font-size: 90px;
}
</style>