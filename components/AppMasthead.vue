<template>
  <div>
    <app-glitchysection>
      <h1
        @mouseenter="isBroken = true"
        @mouseleave="isBroken = false"
        :data-text="isBroken ? 'I Break Things' : 'I Make Things'"
        class="glitch"
      >
        I
        <span v-if="!isBroken">Make</span>
        <span v-else>Break</span>
        Things
      </h1>
      <app-roses :is-broken="isBroken"/>
    </app-glitchysection>
  </div>
</template>

<script>
import AppGlitchysection from "./AppGlitchysection.vue";
const AppRoses = () => import("./AppRoses.vue");

export default {
  components: {
    AppGlitchysection,
    AppRoses
  },
  data() {
    return {
      isBroken: false
    };
  }
};
</script>

<style lang="scss" scoped>
section {
  background: url("/bk-stars3.svg") center center no-repeat;
  background-size: cover;
  width: 100vw;
}
</style>
