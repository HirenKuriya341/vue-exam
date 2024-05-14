<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark">
        <h2><router-link to="/step-1">Step 1</router-link></h2>
      </div>
      <div class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark">
        <h2><router-link :to="'/step-2/' + this.config">Step 2</router-link></h2>
      </div>
      <div class="col-md-4 py-2 bg-light text-center border rounded-pill border-dark">
        <h2><router-link :to="'/step-3' + this.config">Step 3</router-link></h2>
      </div>
    </div>
    <h3>Step 3: Summary</h3>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          Your Tesla <span class="fw-bolder">{{ selectedModal.description }}</span>
        </h5>
        <table class="table">
          <tbody>
            <tr>
              <th width="30%">{{ configuration }}</th>
              <td></td>
            </tr>
            <tr>
              <th width="30%">{{ modalConfigs.description }}</th>
              <td>$ {{ modalConfigs.price }}</td>
            </tr>
            <tr>
              <th width="30%">{{ modalColor.description }}</th>
              <td>$ {{ modalColor.price }}</td>
            </tr>
            <tr>
              <th width="30%">Tow Hitch Package</th>
              <td>$ 1000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer">
        <table class="table table-light">
          <tbody>
            <tr>
              <th width="30%">TOTAL COST</th>
              <td>$ {{ totalCost }}</td>
            </tr>
          </tbody>
        </table>
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
      modalConfigs: [],
      totalCost: 0
    }
  },
  computed: {
    totalCost() {
      return this.modalConfigs.price + this.modalColor.price + (this.towHitch ? 1000 : 0);
    }
  }
}
</script>