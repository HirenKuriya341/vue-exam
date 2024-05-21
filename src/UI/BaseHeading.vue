<template>
  <p class="display-3 mt-4 text-center text-primary">{{ props.headingText }}</p>
</template>

<script setup>
const props = defineProps(["headingText"]);
</script>