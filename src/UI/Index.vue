<template>
  <div class="container-fluid text-center">
    <img
      src="https://cdn.motor1.com/images/mgl/Mk3qg6/s3/2017-tesla-roadster-deck-model-petersen-automotive-museum.jpg"
      class="img-fluid"
      alt="Tesla"
    />
    <h1 class="centered">
      Choose Your Dream Tesla Now
      <router-link to="/step-1">Start...</router-link>
    </h1>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  text-align: center;
  color: white;
}

img {
  opacity: 0.5;
}

.centered {
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
}

a {
  text-decoration: none;
}
</style>