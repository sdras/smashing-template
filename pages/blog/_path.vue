<template>
  <main class="blogpost">
    <div class="titlearea">
      <h1>{{ title }}</h1>
      <p>{{ date }}</p>
    </div>

    <div class="bkimg" :style="`background: url(${thumbnail}) center center no-repeat`"></div>
    <section>
      <div class="blognav">
        <h4>More on this site</h4>
        <ul>
          <li v-for="post in blogPosts" :key="post.title">
            <nuxt-link :to="post.path">{{ post.title }}</nuxt-link>
          </li>
        </ul>
      </div>
      <h6 v-for="(tag, i) in tags" :key="i" class="tag posttags">
        <span>{{ tag }}</span>
      </h6>
      <article v-html="$md.render(body)"></article>
      <hr>
      <nuxt-link to="/writing">
        <button class="seepost">see all writing ⟶</button>
      </nuxt-link>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  async asyncData({ params }) {
    let post = await import("~/blog/" + params.path + ".json");
    return post;
  },
  computed: {
    ...mapState(["blogPosts"])
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
  mounted() {
    document.body.scrollTop;
    this.setStyles("img", "width: 100%");
    this.setStyles("h2", "font-size: 35px;");
    this.setStyles("p", "margin-bottom: 35px;");
    this.setStyles(
      "pre",
      "white-space: pre-wrap;background: #efefef;padding: 3px 15px; margin: 0;font-size:17px;"
    );
    this.setStyles(
      "blockquote",
      "font-size:30px;border-left:1px solid #ccc;padding:20px;"
    );
    this.setStyles(
      "article a, article a:active, article a:visited",
      "color: #aa0753;text-decoration:none;background-image: linear-gradient(to right, #e2cfaa 0%, #de72a4 100%);background-repeat:repeat-x;background-position: 0 1.08em;transition:0.25s all;"
    );
  }
};
</script>

<style lang="scss" scoped>
main {
  width: 100vw;
  background: white;
  position: relative;
  margin: 0;
  padding-top: 250px;
  padding-left: 9vmin;
}

section {
  background: white;
  position: relative;
  padding: 40px 8vmin 10vmin;
  color: $dark;
}

.bkimg {
  position: absolute;
  left: 0;
  top: 0;
  width: 101vw;
  height: 400px;
  border-bottom: 5px solid red;
  background-size: cover !important;
}

.titlearea {
  z-index: 2000;
  position: absolute;
  text-shadow: 0 0 10px black;
  top: 85px;
  p {
    margin-top: 10px;
    color: #ddd;
  }
}

h1 {
  font-family: unset;
  text-transform: none;
  font-weight: 500;
  font-style: normal;
  color: white;
  font-size: 50px;
}

article {
  width: 60vw;
  max-width: 650px;
  font-size: 20px;
  line-height: 1.4;
  p {
    line-height: 1.5;
  }
  h2 {
    font-size: 40px;
  }
}

.blognav {
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: -o-sticky;
  position: sticky;
  top: 0;
  margin-top: -40px;
  float: right;
  z-index: 4000;
  width: 250px;
  padding: 50px 0;
  border-left: 1px solid #ccc;
  h4 {
    color: $dark;
    padding: 0 0 20px 20px;
    font-size: 20px;
  }
  ul {
    list-style: square;
    line-height: 1;
    li {
      padding-bottom: 20px;
    }
  }
  a {
    color: #666;
    font-weight: 400;
    transition: 0.25s all ease;
    &:hover {
      color: $dark;
    }
  }
}

hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(170, 7, 83, 0),
    rgba(170, 7, 83, 0.75),
    rgba(170, 7, 83, 0)
  );
  margin-top: 50px;
  width: 60vw;
  max-width: 600px;
}

.seepost {
  margin-top: 50px;
  width: 300px;
  border-color: $pink;
  color: $pink;
  &:hover {
    background: $pink;
    border: 1px solid $pink;
  }
}

.tag {
  color: white;
  background: #222;
  border: 1px solid #222;
}

@media screen and (max-width: 1120px) {
  .blognav {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .titlearea {
    top: 65px !important;
    margin-left: 8vmin;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
  }
  h1 {
    font-size: 40px;
    width: 85vw;
  }
  main {
    padding-left: 0;
  }
  article {
    width: 80vw;
    font-size: 18px;
  }
  section {
    border-top: 3px solid red;
    padding: 40px 8vmin 20vmin;
  }
  .tag {
    margin: 10px 5px 10px 0;
    display: inline-block;
    padding: 4px 10px;
  }
  .seepost {
    margin-top: 30px;
  }
}
</style>
