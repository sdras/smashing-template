<template>
  <section>
    <h2 id="about" name="about">About Me</h2>
    <div class="about">
      <img src="/bio-photo.svg" width="100" height="100" alt="photo of sarah drasner">
      <p>
        Sarah Drasner is an award-winning Speaker, Head of Developer Experience at Netlify, Vue core team member, and Staff Writer at CSS-Tricks.
        Sarah is formerly Principal Lead of Emerging Markets, Cloud Advocates at Microsoft and Manager of UX & Engineering at Trulia/Zillow Group.
        She’s the author of SVG Animations from O’Reilly and has given Frontend Masters workshops.
        Sarah is a co-organizer of ConcatenateConf, a free conference for Nigerian and Kenyan developers.
        Sarah is also the co-founder of Web Animation Workshops, with Val Head.
        She has worked for 15 years as a web developer, and at points worked as a Scientific Illustrator and a Professor in the Greek Islands.
      </p>
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
      <!--social-links-->
    </div>
    <!--about-->
  </section>
</template>

<script>
import IconTwitter from "~/components/icons/IconTwitter.vue";
import IconGithub from "~/components/icons/IconGithub.vue";
import IconCodepen from "~/components/icons/IconCodepen.vue";

export default {
  components: {
    IconTwitter,
    IconGithub,
    IconCodepen
  }
};
</script>

<style lang="scss" scoped>
section {
  width: 100vw;
  height: 700px;
  background: url("/france.svg") center center no-repeat $dark;
  background-size: cover;
  padding: 100px;
}

img {
  border-radius: 50% 50%;
  box-shadow: 0 0 0 1px black;
  float: left;
  margin: 10px 30px 30px 10px;
  opacity: 0.7;
}

.about {
  width: 45vw;
  padding: 40px 40px 80px;
  background: rgba(0, 0, 0, 0.4);
  line-height: 1.7;
  border-left: 1px solid rgba(255, 255, 0, 0.3);
}

h2 {
  margin-bottom: 20px;
}

.social-links {
  float: right;
  a {
    opacity: 0.5;
    transition: 0.25s all ease;
    &:hover {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 1200px) {
  section {
    padding: 8vmin;
    height: auto;
  }
  .about {
    padding: 6vmin 6vmin 10vmin !important;
    width: calc(90vw - 8vmin);
  }
}
</style>