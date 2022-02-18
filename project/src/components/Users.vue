<template>
   <div class="user grid">
      <h1 class="user__title grid__item">
         {{ title }}
      </h1>
   </div>

   <div class="user__input-container grid">
      <div class="user__input-border grid__item">
         <input type="text" v-model="nameValue" class="user__input" />
      </div>

      <div class="user__email grid__item">
         {{ personEmail }}
      </div>
   </div>

   <main class="user__content grid">
      <div class="user__buttons-container">
         <button @click="fetchUsers" class="user__button grid__item">
            Get New List
         </button>

         <button @click="findPerson" class="user__button grid__item">
            Get email
         </button>

         <button @click="onlyMale" class="user__button grid__item">
            Find Male
         </button>

         <button @click="sortAlpha" class="user__button grid__item">
            Sorting
         </button>
      </div>

      <ul class="user__elements">
         <li v-for="user in users" :key="user.id.value" class="user__element">
            {{ user.name.first }} {{ user.name.last }}
         </li>
      </ul>
   </main>
</template>

<script>
export default {
   data() {
      return {
         title: "Users Data",
         users: [],
         nameValue: "Write User first name",
         personEmail: "User email address",
      };
   },

   created() {
      this.fetchUsers();
      this.sumThis();
   },

   methods: {
      async fetchUsers() {
         const url = "https://randomuser.me/api/?page=2&results=20";
         const response = await fetch(url);
         const { results, info } = await response.json();

         this.users = results;
         this.data = info;
      },

      findPerson() {
         const person = this.users.find(user => {
            return user.name.first === this.nameValue;
         });
         this.personEmail = person.email;
      },

      onlyMale() {
         const genderList = this.users.filter((user) => {
            return user.gender === "male";
         });
         this.users = genderList;
      },

      sortAlpha() {
         const sortedData = this.users.sort((a, b) => {
            if (a.name.last > b.name.last) return 1;
            if (a.name.last < b.name.last) return -1;
            return 0;
         });
         this.users = sortedData;
      },

      sumThis() {
         const numbers = [1, 4, 6, 9];
         const sum = numbers.reduce((result, numb) => {
            return numb + result;
         }, 10);
         console.log(sum);
      },
   },
};
</script>

<style scoped>
.user__title {
   grid-column: 5 / 8;
   font-size: 56px;
   background: none;
}

.user__input-border {
   grid-column: 5 / 8;
   background: none;
}

.user__email {
   grid-column: 8 / 10;
   background: none;
   font-style: italic;
   font-size: 24px;
}

.user__buttons-container {
   grid-column: 4 / 6;
   background: none;
}

.user__button {
   background: none;
   font-size: 24px;
}

.user__button:hover {
   color: red;
}

.user__elements {
   grid-column: 6/8;
   background: none;
}
</style>
