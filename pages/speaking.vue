<template>
  <main>
    <div class="map">
      <div class="fixed">
        <h1>Speaking</h1>
      </div>
      <app-globe/>
      <div class="blurb">
        <p>
          I'm a Frontend Master! Check out my courses on
          <a
            href="https://frontendmasters.com/courses/vue/"
            target="_blank"
          >Intro to Vue</a>,
          <a
            href="https://frontendmasters.com/courses/design-for-developers/"
            target="_blank"
          >Design for Developers</a>, and
          <a
            href="https://frontendmasters.com/courses/svg-essentials-animation/"
            target="_blank"
          >SVG Essentials and Animation</a>
        </p>
      </div>
    </div>
    <div class="table">
      <h2>Conferences</h2>
      <table>
        <thead>
          <tr>
            <th>Conference</th>
            <th>Date</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in speaking" :key="item.date">
            <td>
              <a :href="item.link">{{ item.conference }}</a>
              <span class="keynote" v-if="item.keynote">Keynote</span>
            </td>
            <td>{{ item.date }}</td>
            <td>{{ item.city }}</td>
          </tr>
        </tbody>
      </table>
      <h2 class="podcasts">Podcasts && Screencasts</h2>
      <table>
        <thead>
          <tr>
            <th>Conference</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in podcasts" :key="item.date">
            <td>
              <a :href="item.link">{{ item.conference }}</a>
            </td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
const AppGlobe = () => import("~/components/AppGlobe.vue");

export default {
  name: "speaking",
  components: {
    AppGlobe
  },
  computed: {
    ...mapState(["speaking", "podcasts"])
  }
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-gap: 8vmin;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.fixed {
  position: fixed;
}

h1 {
  transform: rotate(90deg);
  position: absolute;
  left: 80px;
  top: 0;
  transform-origin: 0 0;
  font-size: 40px;
}

a,
a:visited,
a:active {
  text-decoration: none;
  color: white;
}

h2 {
  margin-bottom: 20px;
}

.podcasts {
  margin-top: 60px;
}

.keynote {
  color: #7f7ff8;
  font-weight: bold;
}

.blurb {
  width: 30vw;
  bottom: 8vmin;
  position: fixed;
  line-height: 1.7;
}

@media screen and (max-width: 1000px) {
  main {
    margin: 4vmin;
    grid-template-columns: 1fr 2fr;
  }
  .blurb {
    width: 25vw;
  }
}

@media screen and (max-width: 650px) {
  main {
    margin: 10vmin 4vmin;
    grid-gap: 5vmin;
    grid-template:
      "a b"
      "c c";
  }

  h1 {
    left: 10vmin;
  }
  .fixed {
    grid-area: a;
    height: 200px;
    position: absolute;
  }
  .blurb {
    grid-area: b;
    position: relative;
    width: 70vw;
    bottom: auto;
    margin-left: 20vw;
    height: 200px;
  }
  .table {
    grid-area: c;
    width: 92vw;
  }
}
</style>
