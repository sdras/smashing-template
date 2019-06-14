<template>
  <app-glitchysection>
    <h1 class="glitch" data-text="404">404</h1>
    <br>
    <p>This is not the page you are looking for.</p>
    <nuxt-link exact to="/">
      <button>⟵ Back to home</button>
    </nuxt-link>
  </app-glitchysection>
</template>

<script>
import AppGlitchysection from "~/components/AppGlitchysection.vue";

export default {
  components: {
    AppGlitchysection
  },
  name: "thankyou"
};
</script>

<style lang="scss" scoped>
section {
  flex-direction: column;
}

p {
  font-size: 22px;
}

button {
  margin-top: 40px;
  width: 200px;
}
</style>