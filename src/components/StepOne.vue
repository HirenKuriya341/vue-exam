<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark"
      >
        <h2><router-link to="/step-1">Step 1</router-link></h2>
      </div>
      <div
        class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark"
      >
        <h2>
          <router-link
            :class="this.modal && this.modalColor ? '' : 'disable-link'"
            :to="stepTwoURL"
            >Step 2</router-link
          >
        </h2>
      </div>
      <div
        class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark"
      >
        <h2><router-link to="">Step 3</router-link></h2>
      </div>
    </div>
    <h3>Step 1: Choose your model and color</h3>
    <div class="row">
      <div class="col-md-4 g-3 align-items-center">
        <div class="col-auto">
          <label for="model" class="col-form-label">Select modal</label>
        </div>
        <div class="col-auto">
          <select
            class="form-select"
            v-model="modal"
            id="model"
            @change="selectModal"
          >
            <option value="0">Select modal</option>
            <option
              v-for="(modal, key) in modals"
              :key="key"
              :value="modal.code"
            >
              {{ modal.description }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-4 g-3 align-items-center">
        <div class="col-auto">
          <label for="modalColor" class="col-form-label">Select color</label>
        </div>
        <div class="col-auto">
          <select
            class="form-select"
            v-model="modalColor"
            id="modalColor"
            @change="getModalColor"
          >
            <option value="0">Select modal color</option>
            <option
              v-for="(modal, key) in selectedModalColors"
              :key="key"
              :value="modal.code"
            >
              {{ modal.description }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <img :src="currentModalImg" class="img-fluid" :alt="modalColor" />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { watch, ref, toRef, isRef } from "vue";

export default {
  setup() {
    const store = useStore();
    const modal = ref("0");
    const modalColor = ref("0");
    const selectedModalColors = ref([]);

    const modals = store.getters.allModals;

    watch(modal, () => {
      selectedModalColors.value = store.getters.getSelectedModal[0].colors;
    });

    function selectModal() {
      store.dispatch("selectedModal", modal.value);
    }

    return {
      modal,
      modalColor,
      modals,
      selectedModalColors,
      selectModal,
    };
  },
};
</script>