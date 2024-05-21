<template>
  <div class="container-fluid">
    <Steps />
    <h3>Step 3: Summary</h3>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          Your Tesla
          <span class="fw-bolder">{{ currModalData.description }}</span>
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
              <th width="30%">{{ modalColorDetails[0].description }}</th>
              <td>$ {{ modalColorDetails[0].price }}</td>
            </tr>
            <tr>
              <th width="30%">Tow Hitch Package</th>
              <td>$ {{ towHitchPackPrice }}</td>
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
    <base-image v-if="currentModalImg" :modalImage="currentModalImg"></base-image>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Steps from "../UI/Steps.vue";

export default {
  components: {
    Steps,
  },
  setup() {
    const store = useStore();
    
    const currentModalImg = store.getters.getSelectedModalImage;
    const currModalData = store.getters.getSelectedModal;
    const modalConfigs = store.getters.getModalConfigs;
    const modalColorDetails = currModalData.colors.filter(clr => clr.code == store.state.modalColor);

    const configuration = 'Range: ' + modalConfigs.range + ' KM/Charge - Max Speed: ' + modalConfigs.speed + ' KMPH';
    const towHitchPackPrice = (modalConfigs.yoke && modalConfigs.towHitch) ? 1000 : 0;
    const totalCost = modalConfigs.price + modalColorDetails[0].price + towHitchPackPrice;

    return {
      currModalData,
      currentModalImg,
      modalColorDetails,
      modalConfigs,
      configuration,
      totalCost,
      towHitchPackPrice
    }
  },
};
</script>
