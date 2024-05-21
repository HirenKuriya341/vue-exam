import { createApp } from 'vue'

import { setupWorker } from 'msw/browser'
import { handlers } from './mocks/handlers'
export const worker = setupWorker(...handlers)
await worker.start()

import App from './App.vue'
import router from './router';
import store from './store.js'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import BaseImage from './UI/BaseImage.vue';
import BaseHeading from './UI/BaseHeading.vue';

const app = createApp(App)
app.use(router)
app.component('base-image', BaseImage);
app.component('base-heading', BaseHeading);

store.dispatch('fetchAllModals').then(() => {
    app.use(store)
    app.mount('#app')
});