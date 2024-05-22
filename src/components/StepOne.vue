<template>
  <div class="container-fluid">
    <Steps />
    <BaseHeading headingText="Step 1: Choose your model and color" />
    <div class="row">
      <div class="col-md-4">
        <div class="row">
          <div class="col-md-6 g-3 align-items-center">
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
          <div class="col-md-6 g-3 align-items-center">
            <div class="col-auto">
              <label for="modalColor" class="col-form-label">
                Select color
              </label>
            </div>
            <div class="col-auto">
              <select
                class="form-select selectpicker"
                v-model="modalColor"
                id="modalColor"
                @change="getModalColor"
              >
                <option value="0">Select color</option>
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
      </div>
      <div class="col-md-8">
        <BaseImage v-if="currentModalImg" :isLoading="isLoading" :modalImage="currentModalImg" />
      </div>
    </div>
  </div>
</template>

<script>
import Steps from "../UI/Steps.vue";
import BaseHeading from "../UI/BaseHeading.vue";
import BaseImage from "../UI/BaseImage.vue";

import { useStore } from "vuex";
import { ref, watch } from "vue";

export default {
  components: {
    Steps,
    BaseHeading,
    BaseImage,
  },
  setup() {
    const store = useStore();

    const modalDetails = store.getters.getCurrModalDetails;

    const modal = ref(modalDetails.modal);
    const modalColor = ref(modalDetails.color);
    const selectedModalColors = ref(modalDetails.colors);
    const currentModalImg = ref(store.getters.getSelectedModalImage);
    const isLoading = ref(false);

    const modals = store.getters.allModals;

    watch([modal, modalColor], (oldVal, newVal) => {
      if (newVal[1] != oldVal[1]) {
        isLoading.value = true;
      }
      setTimeout(function () {
        selectedModalColors.value = store.getters.getSelectedModal.colors;
        currentModalImg.value = store.getters.getSelectedModalImage;
        isLoading.value = false;
      }, 300);
      if (newVal[0] != oldVal[0]) {
        modalColor.value = 0;
      }
    });

    function selectModal() {
      store.dispatch("selectedModal", modal.value);
    }

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
      isLoading
    };
  },
};
</script>