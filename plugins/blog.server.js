export default async ({ store }) => {
  const context = await require.context("~/blog/", false, /\.json$/);

  const searchposts = await context.keys().map(key => {
    return {
      ...context(key),
      path: `/blog/${key.replace(".json", "").replace("./", "")}`
    };
  });

  const sortedposts = searchposts.sort((a, b) =>
    b.date.slice(-5) - a.date.slice(-5)
  )

  store.commit("setPosts", sortedposts);
};
