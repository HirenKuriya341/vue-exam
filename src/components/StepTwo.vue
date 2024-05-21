<template>
  <div class="container-fluid">
    <Steps />
    <BaseHeading headingText="Step 2: Select your config and options" />
    <div class="row">
      <div class="col-md-4">
        <div class="col-auto">
          <label for="model" class="col-form-label">Select Configuration</label>
        </div>
        <div class="col-auto">
          <select
            class="form-select"
            v-model="configSelect"
            @change="setSelectedConfigs"
          >
            <option value="0">Select modal configuration</option>
            <option
              v-for="(modal, key) in modalConfigs"
              :key="key"
              :value="modal.id"
            >
              {{ modal.description }}
            </option>
          </select>
        </div>
        <div class="row col-md-6 mt-5">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic checkbox toggle button group"
          >
            <input
              type="checkbox"
              class="btn-check"
              id="includeTow"
              v-model="includeTow"
              :checked="includeTow"
              @change="setSelectedConfigs"
            />
            <label class="btn btn-outline-primary" for="includeTow"
              >Tow hitch</label
            >

            <input
              type="checkbox"
              class="btn-check"
              id="includeYoke"
              v-model="includeYoke"
              :checked="includeYoke"
              @change="setSelectedConfigs"
            />
            <label class="btn btn-outline-primary" for="includeYoke"
              >Yoke steering wheel</label
            >
          </div>
          <h4 class="mt-3">{{ configuration }}</h4>
        </div>
      </div>
      <div class="col-md-8">
        <BaseImage v-if="currentModalImg" :modalImage="currentModalImg" />
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

    const currModalData = store.getters.getSelectedModal;
    const configSelect = ref(modalDetails.configID);
    const includeYoke = ref(modalDetails.yoke);
    const includeTow = ref(modalDetails.towHitch);
    const modalConfigs = currModalData.configs;
    const currentModalImg = store.getters.getSelectedModalImage;
    const configuration = ref("");

    watch(configSelect, () => {
      setTimeout(function () {
        const details = store.getters.getModalConfigs;
        configuration.value =
          "Range: " +
          details.range +
          " KM/Charge - Max Speed: " +
          details.speed +
          " KMPH - Price: $" +
          details.price;
      }, 300);
    });

    function setSelectedConfigs() {
      store.dispatch("setConfigs", {
        configID: configSelect.value,
        yoke: includeYoke.value,
        towHitch: includeTow.value,
      });
    }

    return {
      configSelect,
      modalConfigs,
      includeYoke,
      includeTow,
      currentModalImg,
      configuration,
      setSelectedConfigs,
    };
  },
};
</script>
