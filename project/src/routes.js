import Home from './views/Home.vue';
import Users from './views/Users.vue';

export default [
      { name: 'user', path: '/users', component: Users },
      { name: 'home', path: '/', component:  Home},
]