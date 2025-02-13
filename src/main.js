import { createApp } from 'vue';
import App from './App.vue';
import Router from './Router.js';
import Store from './Store.js';

const app = createApp(App);
app.use(Router);
app.use(Store);
app.mount('#app');