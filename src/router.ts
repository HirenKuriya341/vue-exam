import { createRouter, createWebHistory } from "vue-router";

import StepOne from './components/StepOne.vue';
import StepTwo from './components/StepTwo.vue';
import StepThree from './components/StepThree.vue';

const routers = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/step-1' },
        { path: '/step-1', component: StepOne },
        { path: '/step-2/:id', component: StepTwo, props: true, meta: { requireData: true } },
        { path: '/step-3/:config', component: StepThree, props: true, meta: { requireData: true } },
    ]
});

routers.beforeEach(function (to, from, next) {
    if (to.meta.requireData) {
        if (to.params.id || to.params.config) {
            next();
        }
    } else {
        next();
    }
});

export default routers;