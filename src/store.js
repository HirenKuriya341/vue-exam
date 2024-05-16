import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
    state: {
        allModals: [],
        selectedModal: []
    },
    mutations: {
        setAllModals(state, data) {
            state.allModals = data;
        },
        setSelectedModal(state, data) {
            state.selectedModal = data;
        }
    },
    actions: {
        async fetchAllModals({ commit }) {
            await axios.get('/modal').then((response) => {
                commit('setAllModals', response.data);
            });
        },
        selectedModal({ commit, state }, modal) {
            const selData = state.allModals.filter(item => item.code == modal);
            commit("setSelectedModal", selData);
        }
    },
    getters: {
        allModals(state) {
            return state.allModals;
        },
        getSelectedModal(state) {
            return state.selectedModal;
        }
    }
})

export default store;
