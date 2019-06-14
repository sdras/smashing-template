<template>
  <nav>
    <nuxt-link to="/" exact>
      <icon-fern/>
      <span class="logo">Sarah Drasner</span>
    </nuxt-link>
    <app-sitelinks/>
  </nav>
</template>

<script>
import AppSitelinks from "./AppSitelinks.vue";
import IconFern from "./icons/IconFern.vue";

export default {
  components: {
    AppSitelinks,
    IconFern
  }
};
</script>

<style lang="scss" scoped>
nav {
  background: $dark;
  color: white;
  padding: 30px 8vmin 25px;
}

a,
a:visited,
a:active {
  text-decoration: none;
  color: white;
}

.logo {
  text-transform: uppercase;
  font-size: 25px;
  display: inline;
}

ul.site-links {
  float: right;
}

@media screen and (max-width: 500px) {
  nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: -10px;
    padding: 30px 20px 25px;
    box-shadow: 0 2px 10px 0 black;
    border: 1px solid #222;
    a {
      margin: 0 20px;
    }
    svg {
      margin-left: -30px;
    }
  }
}
</style>