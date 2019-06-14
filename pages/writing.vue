<template>
  <main>
    <div class="writingheading">
      <h1>Writing</h1>
    </div>

    <div class="blurb" ref="blurb" @dblclick.prevent="dadjokes">
      <p>
        I’m the author of
        <a
          href="https://www.amazon.com/SVG-Animations-Implementations-Responsive-Animation-ebook-dp-B06XPVW2PP/dp/B06XPVW2PP/"
          target="_blank"
        >SVG Animations from O’Reilly</a> and a staff writer for
        <a href="https://css-tricks.com/" target="_blank">CSS-Tricks</a>. Sometimes I write for Smashing Magazine, Net Magazine, and others. My writing on this site is mostly personal.
      </p>
    </div>

    <div class="external">
      <h2>Technical Writing</h2>
      <div class="posts">
        <ul>
          <li v-for="post in writing" :key="post.title">
            <a :href="post.link" target="_blank">{{ post.title }}</a>
            <br>
            <small>published on {{ post.date }} on {{ post.platform }}</small>
          </li>
        </ul>
      </div>
    </div>

    <div class="labelnav">
      <ul v-for="(label, index) in labels" :key="label">
        <li @click="movelabel(label, index)">{{ label }}</li>
      </ul>
      <div class="line" :style="`transform: translate3d(0, ${labelIndex * 35}px, 0)`"></div>
    </div>

    <div class="blog">
      <h2>On This Site</h2>
      <transition-group name="list">
        <div v-for="post in filteredPosts" :key="post.title" class="post">
          <div class="surface">
            <h3>{{ post.title }}</h3>
            <p>{{ post.date }}</p>
            <h6 v-for="(tag, i) in post.tags" :key="i" class="tag posttags">
              <span>{{ tag }}</span>
            </h6>
            <NuxtLink :to="post.path">
              <button class="seepost">see post ⟶</button>
            </NuxtLink>
          </div>
          <!--surface-->
        </div>
      </transition-group>
      <!--post-->
    </div>
    <!--blog-->
  </main>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "writing",
  data() {
    return {
      selectedLabel: "all posts",
      labelIndex: 0,
      labels: [
        "all posts",
        "life updates",
        "introspection",
        "year end review",
        "SVG",
        "tutorial"
      ],
      dadjokesarr: [
        `<p class="setup">Why is the app component's favorite whiskey Laphroaig?</p>
<p class="punchline">Because it's imported!</p>`,
        `<p class="setup">What's the name of Sherlock's geeky brother?</p>
<p class="punchline">Mycrosoft Holmes!</p>`,
        `<p class="setup">Where do nerds like me go to get drinks?</p>
<p class="punchline">The Scroll Bar!</p>`,
        `<p class="punchline">Debugging graphics like Law and Order SVG</p>`,
        `<p class="punchline">I lost some memory from switching computers, but I didn't mind one bit.</p>`,
        `<p class="punchline">iPhone chargers should be called Apple Juice.</p>`,
        `<p class="setup">What did one baby prototype say to the other?</p>
<p class="punchline">I'll race you to class!</p>`,
        `<p class="setup">Why did the computer seem too bitter?</p>
<p class="punchline">Because it had a microchip on it's shoulder!</p>`
      ]
    };
  },
  computed: {
    ...mapState(["writing", "blogPosts"]),
    filteredPosts() {
      let tempArr = [];
      this.blogPosts.filter(el => {
        if (el.tags.includes(this.selectedLabel)) {
          tempArr.push(el);
        }
      });
      return tempArr;
    }
  },
  methods: {
    movelabel(label, index) {
      this.selectedLabel = label;
      this.labelIndex = index;
    },
    dadjokes() {
      this.$refs.blurb.innerHTML = this.dadjokesarr[
        Math.floor(Math.random() * this.dadjokesarr.length)
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-gap: 8vmin;
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: 250px 1fr;
}
.writingheading {
  grid-column: 1 / 2;
  grid-row: 1;
  position: relative;
  height: 300px;
}
.blurb {
  grid-column: 2 / 3;
  grid-row: 1;
  font-size: 18px;
  height: 300px;
  touch-action: none;
}
.external {
  grid-column: 3;
  grid-row: 1 / 3;
}
.labelnav {
  grid-column: 1;
  grid-row: 2;
  position: relative;
  ul {
    padding-left: 0;
    list-style: none;
    li {
      margin: 0 0 15px;
      cursor: pointer;
      transition: 0.2s color ease;
      &:hover {
        color: white;
      }
    }
  }
}
.blog {
  grid-column: 2;
  grid-row: 2;
  h2 {
    font-size: 70px;
    margin-bottom: 20px;
  }
}

.post {
  padding: 30px 0;
  background-size: cover !important;
  width: 100%;
  position: relative;
  border-bottom: 1px solid #333;
  p {
    margin: 10px 0;
  }
}

button.seepost {
  display: inline-block;
  border: none;
  color: white;
  padding: 10px 20px;
  background: $pink;
  position: absolute;
  right: 0;
  box-shadow: 2px 5px 10px 2px black;
  bottom: -46px;
  width: auto;
  &:hover {
    transform: translate3d(5px, 0, 0);
  }
}

.surface {
  position: relative;
  z-index: 1000;
}

h1 {
  transform: rotate(90deg);
  position: absolute;
  left: 80px;
  top: 0;
  transform-origin: 0 0;
  font-size: 8vmin;
}

.external ul {
  padding-left: 14px;
  border-left: 1px solid #3f3f3f;
  li {
    margin: 15px 0;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
}

.posts {
  margin-left: 5px;
  position: relative;
  &::before {
    position: absolute;
    width: 11px;
    height: 10px;
    background: #141618;
    z-index: 1000;
    top: -2px;
    left: -3px;
    content: "";
  }
}

.csstricks {
  background: #aa0753;
  color: white;
  border: none;
  box-shadow: 2px 2px 5px 0px black;
}

.line {
  width: 100px;
  background: rgb(207, 207, 207);
  height: 1px;
  position: absolute;
  top: 10px;
  left: -110px;
  transition: 0.35s transform ease-out;
}

@media screen and (max-width: 1200px) {
  .blog h2 {
    font-size: 45px !important;
  }
}

@media screen and (max-width: 1000px) {
  main {
    grid-gap: 5vmin;
    margin: 60px 5vmin 10vmin;
    grid-template:
      "a b"
      "e e"
      "c c";
  }

  .writingheading {
    grid-area: a;
    min-width: 60px;
    height: 175px;
    h1 {
      left: 55px;
      font-size: 40px;
    }
  }
  .blurb {
    grid-area: b;
    height: 175px;
  }
  .external {
    grid-area: c;
  }
  .labelnav {
    display: none;
  }
  .blog {
    grid-area: e;
    margin-bottom: 100px;
    h2 {
      margin-bottom: 0;
      margin-top: 70px;
    }
  }
}
</style>
