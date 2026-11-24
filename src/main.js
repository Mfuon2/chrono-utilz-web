import {createApp} from 'vue';
import {createRouter,createWebHistory} from 'vue-router';
import App from './App.vue';
import routes from './router/routes';
import './assets/css/style.css';
import './assets/css/monokai.css';
import {vHighlight} from './lib/highlight';
createApp(App).directive('highlight',vHighlight).use(createRouter({history:createWebHistory(),routes})).mount('#app');
