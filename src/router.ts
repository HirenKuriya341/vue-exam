import { createRouter, createWebHistory } from "vue-router";
import store from './store.js'

import StepOne from './components/StepOne.vue';
import StepTwo from './components/StepTwo.vue';
import StepThree from './components/StepThree.vue';

const routers = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/step-1' },
        { path: '/step-1', component: StepOne },
        { path: '/step-2', component: StepTwo, meta: { requireData: true }  },
        // { path: '/step-2/:id', component: StepTwo, props: true, meta: { requireData: true } },
        { path: '/step-3/:config', component: StepThree, props: true, meta: { requireData: true } },
    ]
});

routers.beforeEach(function (to, from, next) {
    if (to.meta.requireData) {
        if (store.getters.getSelectedModal.length > 0) {
            next();
        } else {
            next({ path: '/step-1' });
        }
    } else {
        next();
    }
});

export default routers;