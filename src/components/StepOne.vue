<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark">
        <h2><router-link to="/step-1">Step 1</router-link></h2>
      </div>
      <div class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark">
        <h2><router-link :class="this.modal && this.modalColor ? '' : 'disable-link'" :to="stepTwoURL">Step 2</router-link></h2>
      </div>
      <div class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark">
        <h2><router-link to="">Step 3</router-link></h2>
      </div>
    </div>
    <h3>Step 1: Choose your model and color</h3>
    <div class="row">
      <div class="col-md-4 g-3 align-items-center">
        <div class="col-auto">
          <label for="model" class="col-form-label">Select Model</label>
        </div>
        <div class="col-auto">
          <select class="form-select" v-model="modal" id="model" @change="selectModal">
            <option v-for="(modal, key) in modals" :key="key" :value="modal.code">
              {{ modal.description }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-md-4 g-3 align-items-center">
        <div class="col-auto">
          <label for="modalColor" class="col-form-label">Select Color</label>
        </div>
        <div class="col-auto">
          <select class="form-select" v-model="modalColor" id="modalColor" @change="getModalColor">
            <option value="0">Select Model Color</option>
            <option v-for="(modal, key) in selectedModal.colors" :key="key" :value="modal.code">
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
import axios from 'axios'

export default {
  mounted() {
    try {
      const resp = axios.get('/modal').then((response) => {
        this.modals = response.data
        this.selectedModal = this.modals[0]
      })
    } catch (e) {
      this.modals = []
    }
  },
  data() {
    return {
      modals: [],
      modal: '',
      modalColor: '',
      selectedModal: [],
      currentModalImg: '',
      stepTwoURL: ''
    }
  },
  computed: {
    stepTwoURL() {
      if (this.modal && this.modalColor) {
        return '/step-2/' + this.modal + '-' + this.modalColor;
      }
      return '';
    }
  },
  methods: {
    selectModal() {
      if (this.modal !== 'undefined') {
        this.selectedModal = this.modals.find((item) => item.code === this.modal)
        this.currentModalImg =
          'https://interstate21.com/tesla-app/images/' +
          this.modal +
          '/' +
          this.selectedModal.colors[0].code +
          '.jpg'
      }
    },
    getModalColor() {
      this.currentModalImg =
        'https://interstate21.com/tesla-app/images/' + this.modal + '/' + this.modalColor + '.jpg'
    }
  }
}
</script>