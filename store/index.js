export const state = () => ({
  githubProjects: []
});

export const mutations = {
  setGithubProjects: (state, githubProjects) => {
    state.githubProjects = githubProjects
  },
};

export const actions = {
  async getGithubProjects({ state, commit }) {
    if (state.githubProjects.length) {
      // If already fetched, ignore
      return
    }
    try {
      let githubProjects = await fetch(`https://api.github.com/users/sdras/repos?page=1&per_page=100`).then(res => res.json());
      githubProjects = githubProjects.filter((project) => project.fork === false).map(({ id, html_url, name, homepage, stargazers_count, description }) => ({ id, html_url, name, homepage, stargazers_count, description }))
      commit('setGithubProjects', githubProjects)
    } catch (error) {
      console.error(error);
    }
  }
}
