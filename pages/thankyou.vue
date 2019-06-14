<template>
  <app-glitchysection>
    <h1 class="glitch" data-text="thanks!">Thanks!</h1>
    <br>
    <p>Thanks for your message! I'll get in touch as soon as I'm available.</p>
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