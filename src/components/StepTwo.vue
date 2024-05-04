<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark">
        <h2><router-link to="/step-1">Step 1</router-link></h2>
      </div>
      <div class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark">
        <h2><router-link :to="'/step-2/' + this.id">Step 2</router-link></h2>
      </div>
      <div class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark">
        <h2>
          <router-link :to="urlParam">Step 3</router-link>
        </h2>
      </div>
    </div>
    <h3>Step 2: Select your config and options</h3>
    <div class="row">
      <div class="col-md-4 g-3 d-flex justify-content-between">
        <div class="col-auto">
          <label for="model" class="col-form-label">Select Configuration</label>
        </div>
        <div class="col-auto">
          <select class="form-select" v-model="configSelect" @change="calConfig">
            <option v-for="(modal, key) in modalConfigs" :key="key" :value="modal.id">
              {{ modal.description }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row col-md-6 mt-5">
      <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <input
          type="checkbox"
          class="btn-check"
          id="includeYoke"
          v-model="includeYoke"
          :checked="towHitch"
        />
        <label class="btn btn-outline-primary" for="includeYoke">Tow hitch</label>

        <input
          type="checkbox"
          class="btn-check"
          id="includeTow"
          v-model="includeTow"
          :checked="yoke"
        />
        <label class="btn btn-outline-primary" for="includeTow">Yoke steering wheel</label>
      </div>
      <h4 class="mt-3">{{ configuration }}</h4>
    </div>
    <div class="row mt-4">
      <img :src="currentModal" class="img-fluid" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  mounted() {
    const mData = this.id.split('-')

    axios.get('/modal/' + mData[0]).then((response) => {
      this.towHitch = response.data.towHitch
      this.yoke = response.data.yoke
      this.modalConfigs = response.data.configs
      console.log(response.data)
    })
    this.currentModal =
      'https://interstate21.com/tesla-app/images/' + mData[0] + '/' + mData[1] + '.jpg'
  },
  data() {
    return {
      configSelect: 0,
      towHitch: false,
      yoke: false,
      modalConfigs: [],
      currentModal: [],
      configuration: '',
      urlParam: ''
    }
  },
  computed: {
    urlParam() {
      return '/step-3/' + this.id + '-' + this.configSelect + '-' + (this.towHitch ? 1 : 0) + '-' + (this.yoke ? 1 : 0)
    }
  },
  methods: {
    calConfig() {
      if (this.configSelect !== 'undefined') {
        const configData = this.modalConfigs.find((item) => item.id === this.configSelect)

        this.configuration =
          'Range: ' +
          configData.range +
          ' per Charge - Max Speed: ' +
          configData.speed +
          ' KMPH - Price: $ ' +
          configData.price
      }
    }
  }
}
</script>