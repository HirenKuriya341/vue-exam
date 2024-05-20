import { createStore } from "vuex";
import axios from 'axios'

const store = createStore({
    state: {
        modalColor: 0,
        modal: 0,
        currConfigs: 0,
        allModals: [],
        selectedModal: [],
        currModalImage: 'https://electrek.co/wp-content/uploads/sites/3/2021/05/Tesla-Logo-Hero.jpg?quality=82&strip=all&w=1024',
        currModalDetails: []
    },
    mutations: {
        setAllModals(state, data) {
            state.allModals = data;
        },
        setSelectedModal(state, data) {
            state.selectedModal = data;
        },
        setCurrModalColor(state, colorImg) {
            state.currModalImage = colorImg;
        },
        setConfigs(state, configs) {
            state.currConfigs = configs
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
            const modalDetails = await axios.get('/modal/' + modal).then((response) => {
                return response.data;
            });
            const allDetails = {
                ...selData[0],
                ...modalDetails
            }
            state.modal = modal;
            commit("setSelectedModal", allDetails);
        },
        selectedModalColor({ commit, state }, color) {
            state.modalColor = color;
            var colorImg = 'https://electrek.co/wp-content/uploads/sites/3/2021/05/Tesla-Logo-Hero.jpg?quality=82&strip=all&w=1024';
            if (color) {
                colorImg = 'https://interstate21.com/tesla-app/images/' + state.selectedModal.code + '/' + color + '.jpg';
            }
            commit("setCurrModalColor", colorImg);
        },
        setConfigs({ commit, state }, configData) {
            const details = state.selectedModal.configs.filter(item => item.id == configData.configID)
            const allConfigs = {
                ...configData,
                ...details[0]
            }
            commit("setConfigs", allConfigs);
        }
    },
    getters: {
        allModals(state) {
            return state.allModals;
        },
        getSelectedModal(state) {
            return state.selectedModal;
        },
        getCurrModalColors(state) {
            return state.selectedModal.colors;
        },
        getSelectedModalImage(state) {
            return state.currModalImage;
        },
        getModalConfigs(state) {
            return state.currConfigs;
        },
        getCurrModalDetails(state) {
            return state.currModalDetails = {
                modal: state.modal,
                color: state.modalColor,
                configID: state.currConfigs.configID ?? 0,
                colors: state.selectedModal.colors ?? [],
                towHitch: state.currConfigs.towHitch ?? state.selectedModal.towHitch,
                yoke: state.currConfigs.yoke ?? state.selectedModal.yoke,
            }
        }
    }
})

export default store;
