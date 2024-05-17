import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
    state: {
        allModals: [],
        selectedModal: [],
        currModalImage: 'https://electrek.co/wp-content/uploads/sites/3/2021/05/Tesla-Logo-Hero.jpg?quality=82&strip=all&w=1024'
    },
    mutations: {
        setAllModals(state, data) {
            state.allModals = data;
        },
        setSelectedModal(state, data) {
            state.selectedModal = data;
        },
        setCurrModalColor(state, color) {
            state.currModalImage = 'https://interstate21.com/tesla-app/images/' + state.selectedModal[0].code + '/' + color + '.jpg';
        }
    },
    actions: {
        async fetchAllModals({ commit }) {
            await axios.get('/modal').then((response) => {
                commit('setAllModals', response.data);
            });
        },
        async selectedModal({ commit, state }, modal) {
            const selData = state.allModals.filter(item => item.code == modal);
            await axios.get('/modal/' + modal).then((response) => {
                const allData = {
                    ...selData[0],
                    ...response.data,
                }
                commit("setSelectedModal", allData);
            });
        },
        selectedModalColor({ commit }, modalColor) {
            commit("setCurrModalColor", modalColor);
        }
    },
    getters: {
        allModals(state) {
            return state.allModals;
        },
        getSelectedModal(state) {
            return state.selectedModal;
        },
        getSelectedModalImage(state) {
            return state.currModalImage;
        }
    }
})

export default store;
