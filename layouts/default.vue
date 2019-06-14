<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      width="1"
      height="1"
      role="presentation"
      class="hidden"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(80, 80, 80);stop-opacity:1"></stop>
          <stop offset="100%" style="stop-color:rgb(200, 200, 200);stop-opacity:1"></stop>
        </linearGradient>
      </defs>
    </svg>
    <app-navigation/>
    <nuxt/>
    <app-footer/>
  </div>
</template>

<script>
import AppNavigation from "~/components/AppNavigation.vue";
import AppFooter from "~/components/AppFooter.vue";

export default {
  components: {
    AppNavigation,
    AppFooter
  },
  mounted() {
    console.clear();
  }
};
</script>


<style>
html {
  font-family: "Mercury Display A", "Mercury Display B", -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #141618;
  color: #eee;
  font-display: swap;
}

.hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.setup {
  color: #7f7ff8;
  margin-bottom: 10px;
  border: 1px dashed;
  padding: 10px;
}

.punchline::before {
  position: absolute;
  width: 20px;
  height: 20px;
  content: "🙄";
  bottom: 10px;
  right: 10px;
  font-size: 50px;
}

.punchline {
  color: #79cef8;
  border: 1px double;
  padding: 10px;
  position: relative;
}
</style>
