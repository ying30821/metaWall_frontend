import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Notifications from 'notiwind';
import './style.css';

const app = createApp(App);
app.use(router).use(store).use(Notifications).mount('#app');
