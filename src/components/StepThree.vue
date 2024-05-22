<template>
  <div class="container-fluid">
    <Steps />
    <BaseHeading headingText="Step 3: Summary" />
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              Your Tesla
              <span class="fw-bolder">{{ currModalData.description }}</span>
            </h5>
            <table class="table">
              <tbody>
                <tr>
                  <th>{{ configuration }}</th>
                  <td></td>
                </tr>
                <tr>
                  <th>{{ modalConfigs.description }}</th>
                  <td class="text-end">$ {{ modalConfigs.price }}</td>
                </tr>
                <tr>
                  <th>{{ modalColorDetails[0].description }}</th>
                  <td class="text-end">$ {{ modalColorDetails[0].price }}</td>
                </tr>
                <tr>
                  <th>Tow Hitch Package</th>
                  <td class="text-end">$ {{ towHitchPackPrice }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <table class="table table-light">
              <tbody>
                <tr>
                  <th>TOTAL COST</th>
                  <td class="text-end">$ {{ totalCost }}</td>
                </tr>
              </tbody>
            </table>
          </div>
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

export default {
  components: {
    Steps,
    BaseHeading,
    BaseImage,
  },
  setup() {
    const store = useStore();

    const currentModalImg = store.getters.getSelectedModalImage;
    const currModalData = store.getters.getSelectedModal;
    const modalConfigs = store.getters.getModalConfigs;
    const modalColorDetails = currModalData.colors.filter(
      (clr) => clr.code == store.state.modalColor
    );

    const configuration =
      "Range: " +
      modalConfigs.range +
      " KM/Charge - Max Speed: " +
      modalConfigs.speed +
      " KMPH";
    const towHitchPackPrice =
      modalConfigs.yoke && modalConfigs.towHitch ? 1000 : 0;
    const totalCost =
      modalConfigs.price + modalColorDetails[0].price + towHitchPackPrice;

    return {
      currModalData,
      currentModalImg,
      modalColorDetails,
      modalConfigs,
      configuration,
      totalCost,
      towHitchPackPrice,
    };
  },
};
</script>
