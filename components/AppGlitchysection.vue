<template>
  <section ref="fireCanvas" class="glitchysection">
    <slot></slot>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.glitchysection {
  position: relative;
  z-index: 100;
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100vw;
  padding: 8vmin 12vmin 8vmin 8vmin;
  h1 {
    margin-top: -90px;
    text-transform: uppercase;
    font-size: calc(18vmin + (18 - 10) * ((100vw - 400px) / (800 - 400)));
    cursor: pointer;
    position: relative;
    z-index: 1000;
    text-align: center;
  }
}
</style>