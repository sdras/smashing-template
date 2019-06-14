export default async ({ store }) => {
  await Promise.all([
    store.dispatch('getGithubProjects'),
  ])
}
