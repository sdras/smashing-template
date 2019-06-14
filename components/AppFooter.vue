<template>
  <footer>
    <div>
      <nuxt-link to="/" exact>
        <icon-fern/>
      </nuxt-link>
    </div>
    <app-sitelinks/>
    <hr>
    <p>All materials &copy; Sarah Drasner 2019</p>
    <div class="social-links">
      <a href="https://twitter.com/sarah_edo" name="twitter">
        <icon-twitter width="40" height="40"/>
      </a>
      <a href="https://github.com/sdras" name="github">
        <icon-github width="40" height="40"/>
      </a>
      <a href="https://codepen.io/sdras/" name="codepen">
        <icon-codepen width="40" height="40"/>
      </a>
    </div>
  </footer>
</template>

<script>
import IconFern from "./icons/IconFern.vue";
import IconTwitter from "./icons/IconTwitter.vue";
import IconGithub from "./icons/IconGithub.vue";
import IconCodepen from "./icons/IconCodepen.vue";
import AppSitelinks from "./AppSitelinks.vue";

export default {
  components: {
    IconFern,
    IconTwitter,
    IconGithub,
    IconCodepen,
    AppSitelinks
  }
};
</script>

<style lang="scss" scoped>
footer {
  background: $dark;
  position: relative;
  color: white;
  text-align: center;
  width: 100vw;
  padding: 50px 8vw 30px;
  div {
    margin-bottom: 30px;
  }
  hr {
    opacity: 0.1;
    margin-bottom: 30px;
  }
  .site-links {
    margin-bottom: 30px;
  }
  p {
    opacity: 0.7;
    margin-bottom: 30px;
  }
}
</style>