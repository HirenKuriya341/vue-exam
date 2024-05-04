import { createRouter, createWebHistory } from "vue-router";

import StepOne from './components/StepOne.vue';
import StepTwo from './components/StepTwo.vue';
import StepThree from './components/StepThree.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/step-1', component: StepOne },
        { path: '/step-2/:id', component: StepTwo, props: true },
        { path: '/step-3/:config', component: StepThree, props: true },
    ]
});