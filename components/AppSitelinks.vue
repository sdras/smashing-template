<template>
  <ul class="site-links">
    <li>
      <nuxt-link to="/writing">writing</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/speaking">speaking</nuxt-link>
    </li>
    <li>
      <nuxt-link to="/projects">projects</nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
a,
a:visited,
a:active {
  text-decoration: none;
  color: $light;
  font-weight: 500 !important;
}
</style>