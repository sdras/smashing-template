import pkg from "./package";

var glob = require("glob");
var path = require("path");
var dynamicRoutes = getDynamicPaths({
  "/blog": "*.json"
});

export default {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: `Sarah Drasner's bomb site`,
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preload",
        as: "style",
        href: "https://cloud.typography.com/7626114/6931412/css/fonts.css"
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cloud.typography.com/7626114/6931412/css/fonts.css"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#7f7ff8"
  },

  /*
   ** Global CSS
   */
  css: ["assets/normalize.css"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/blog.server.js",
    "~/plugins/projects.server.js",
    "~/plugins/vuelidate"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/component-cache",
    "@nuxtjs/style-resources",
    "@nuxtjs/markdownit"
  ],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    html: true,
    xhtmlOut: true,
    injected: true
  },

  styleResources: {
    scss: ["assets/main.scss"]
  },

  generate: {
    routes: dynamicRoutes
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};

// helpers
/**
 * Create an array of URLs from a list of files
 * @param {*} urlFilepathTable
 */
function getDynamicPaths(urlFilepathTable) {
  return [].concat(
    ...Object.keys(urlFilepathTable).map(url => {
      var filepathGlob = urlFilepathTable[url];
      return glob
        .sync(filepathGlob, { cwd: "blog" })
        .map(filepath => `${url}/${path.basename(filepath, ".json")}`);
    })
  );
}
