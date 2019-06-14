<template>
  <main>
    <section class="projectheading">
      <h1>Projects</h1>
      <div class="projectblurb">
        <p>
          Follow me on&nbsp;
          <a href="https://codepen.io/sdras/" name="codepen">
            <icon-codepen width="15" height="15"/>&nbsp;CodePen
          </a>
          <br>or&nbsp;
          <a href="https://github.com/sdras" name="github">
            <icon-github width="15" height="15"/>&nbsp;GitHub
          </a>
          if you want, I suppose.
        </p>
      </div>
    </section>

    <section class="github">
      <h2>GitHub</h2>
      <table>
        <tbody>
          <tr v-for="item in githubProjects" :key="item.id">
            <td>
              <h3>
                <a :href="item.html_url">{{ item.name | replaceSpace }}</a>
                <a v-if="item.homepage" :href="item.homepage" target="_blank">&middot; Site</a>
              </h3>
              <p>✩ {{ item.stargazers_count }}</p>
              <p>{{ item.description }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";
import IconGithub from "~/components/icons/IconGithub.vue";
import IconCodepen from "~/components/icons/IconCodepen.vue";

export default {
  name: "projects",
  components: {
    IconGithub,
    IconCodepen
  },
  methods: {
    setStyles(tag, style) {
      let el = document.body.querySelectorAll(tag),
        i = el.length;

      while (i--) {
        el[i].setAttribute("style", style);
      }
    }
  },
  computed: {
    ...mapState(["githubProjects"])
  },
  filters: {
    replaceSpace(value) {
      return value.toString().replace(/-/g, " ");
    }
  },
  mounted() {
    this.setStyles(".codepen a", "color: white");
  }
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-gap: 8vmin;
  grid-template-columns: 1fr 2fr 2fr;
}
.projectheading {
  grid-column: 1 / 2;
  position: fixed;
}
.codepen {
  grid-column: 2 / 3;
  font-size: 18px;
  a,
  a:visited,
  a:active,
  a:-webkit-any-link {
    text-decoration: none;
    color: white !important;
    font-weight: bold;
  }
}
.github {
  grid-column: 3;
}
h1 {
  transform: rotate(90deg);
  position: absolute;
  left: 80px;
  top: 0;
  transform-origin: 0 0;
  font-size: 8vmin;
}
.codepen h3 {
  margin-top: 30px;
}

$orange: #ec633a;

button {
  margin: 15px 0;
  border: 1px solid $orange;
  color: $orange;
  &:hover {
    background: $orange;
    border: 1px solid $orange;
  }
}

a,
a:visited,
a:active {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

p {
  a,
  a:visited,
  a:active {
    text-decoration: none;
    color: white;
    font-weight: bold;
  }
}

.github h3 {
  padding-bottom: 5px;
  font-size: 25px;
  a {
    color: #dcdbdb;
    font-weight: 400;
    &:hover {
      color: white;
    }
  }
}

.projectblurb {
  bottom: 8vmin;
  position: fixed;
  line-height: 1.4;
  width: 210px;
}

@media screen and (max-width: 1000px) {
  main {
    grid-gap: 5vmin;
    margin: 4vmin;
    grid-template:
      "a"
      "b"
      "c";
  }

  .projectheading {
    grid-area: a;
    position: relative;
    height: 150px;
    margin: 30px 0;
    h1 {
      left: 40px;
      font-size: 40px;
    }
    .projectblurb {
      position: relative;
      bottom: auto;
      margin-left: 70px;
    }
  }
  .codepen {
    grid-area: b;
  }
  .github {
    grid-area: c;
  }
}
</style>
