<template>
  <div class="container-fluid">
    <Steps />
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
    <div v-if="currentModalImg" class="row d-flex justify-content-center mt-5">
      <img :src="currentModalImg" class="img-fluid w-75" :alt="modalColor" />
    </div>
  </div>
</template>

<script>
import Steps from "../UI/Steps.vue";

import { useStore } from "vuex";
import { ref, watch } from "vue";

export default {
  components: {
    Steps,
  },
  setup() {
    const store = useStore();
    const modal = ref("0");
    const modalColor = ref("0");
    const selectedModalColors = ref([]);
    const currentModalImg = ref("");

    const modals = store.getters.allModals;

    watch(modal, () => {
      selectedModalColors.value = store.getters.getSelectedModal[0].colors;
    });

    function selectModal() {
      store.dispatch("selectedModal", modal.value);
    }

    watch(modalColor, () => {
      currentModalImg.value = store.getters.getSelectedModalImage;
    });

    function getModalColor() {
      store.dispatch("selectedModalColor", modalColor.value);
    }

    return {
      modal,
      modalColor,
      modals,
      selectedModalColors,
      currentModalImg,
      selectModal,
      getModalColor,
    };
  },
};
</script>