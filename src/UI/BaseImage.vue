<template>
  <div class="row d-flex justify-content-center mt-3">
    <div v-if="isLoading" class="loader">
      <div class="spinner"></div>
      <div>Loading...</div>
    </div>
    <img v-else :src="props.modalImage" class="img-fluid w-75" alt="modal-image" />
  </div>
</template>

<script setup>
const props = defineProps(["modalImage", "isLoading"]);
</script>

<style scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0.6;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 75px;
  height: 75px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>