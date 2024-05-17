<template>
  <div class="container-fluid">
    <Steps />
    <h3>Step 2: Select your config and options</h3>
    <div class="row">
      <div class="col-md-4 g-3 d-flex justify-content-between">
        <div class="col-auto">
          <label for="model" class="col-form-label">Select Configuration</label>
        </div>
        <div class="col-auto">
          <select
            class="form-select"
            v-model="configSelect"
            @change="calConfig"
          >
            <option
              v-for="(modal, key) in modalConfigs"
              :key="key"
              :value="modal.id"
            >
              {{ modal.description }}
            </option>
          </select>
        </div>
      </div>
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
          id="includeYoke"
          v-model="includeYoke"
          :checked="towHitch"
          @click="updateValue('towHitch')"
        />
        <label class="btn btn-outline-primary" for="includeYoke"
          >Tow hitch</label
        >

        <input
          type="checkbox"
          class="btn-check"
          id="includeTow"
          v-model="includeTow"
          :checked="yoke"
          @click="updateValue('yoke')"
        />
        <label class="btn btn-outline-primary" for="includeTow"
          >Yoke steering wheel</label
        >
      </div>
      <h4 class="mt-3">{{ configuration }}</h4>
    </div>
    <div class="row mt-4">
      <img :src="currentModal" class="img-fluid" />
    </div>
  </div>
</template>

<script>
import Steps from "../UI/Steps.vue";

import { useStore } from "vuex";

export default {
  components: {
    Steps,
  },
  setup() {
    const store = useStore();
    const currModalData = store.getters.getSelectedModal.code;

    

    return {
      currModalData
    }
  },
};
</script>