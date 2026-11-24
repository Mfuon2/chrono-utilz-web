import {createApp} from 'vue';
import {createRouter,createWebHistory} from 'vue-router';
import App from './App.vue';
import routes from './router/routes';
import './assets/css/style.css';
createApp(App).use(createRouter({history:createWebHistory(),routes})).mount('#app');
