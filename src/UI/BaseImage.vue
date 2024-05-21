<template>
  <div class="row d-flex justify-content-center mt-3">
    <img :src="props.modalImage" class="img-fluid w-75" alt="modal-image" />
  </div>
</template>

<script setup>
const props = defineProps(['modalImage']);
</script>