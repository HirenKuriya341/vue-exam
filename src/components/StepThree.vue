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
        <h2><router-link :to="'/step-3' + this.id">Step 3</router-link></h2>
      </div>
    </div>
    <h3>Step 3: Summary</h3>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          Your Tesla <span class="fw-bolder">{{ selectedModal.description }}</span>
        </h5>
        <p class="card-text">
          <span class="fw-bold">{{ modalConfigs.description }}</span> - $ {{ modalConfigs.price }}
        </p>
        <p class="card-text">
          <span class="fw-bold">{{ configuration }}</span>
        </p>
        <p class="card-text">
          <span class="fw-bold">{{ modalColor.description }}</span> - $ {{ modalColor.price }}
        </p>
        <p class="card-text" v-f="towHitch">
          <span class="fw-bold">Tow Hitch Package</span> - $ 1000
        </p>
      </div>
      <div class="card-footer">
        <span>TOTAL COST</span>
      </div>
    </div>
    <div class="row mt-4">
      <img :src="currentModal" class="img-fluid" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['config'],
  mounted() {
    const mData = this.config.split('-')

    const resp = axios.get('/modal/' + mData[0]).then((response) => {
      this.towHitch = response.data.towHitch
      this.modalConfigs = response.data.configs.find((item) => item.id == mData[2])
      this.configuration =
        'Range: ' + this.modalConfigs.range + ' per Charge - Max Speed: ' + this.modalConfigs.speed
    })

    axios.get('/modal').then((response) => {
      this.selectedModal = response.data.find((item) => item.code === mData[0])
      this.modalColor = this.selectedModal.colors.find((item) => item.code === mData[1])
    })
    this.currentModal =
      'https://interstate21.com/tesla-app/images/' + mData[0] + '/' + mData[1] + '.jpg'
  },
  data() {
    return {
      currentModal: '',
      configuration: '',
      modalColor: '',
      towHitch: false,
      selectedModal: [],
      modalConfigs: []
    }
  },
  computed() {
    console.log(this.modalConfigs)
  }
}
</script>