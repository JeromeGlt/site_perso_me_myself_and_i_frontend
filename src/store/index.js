import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
    SIGNUP (state, data) {
      state.username = data.username,
      state.userId = data.userId,
      state.token = data.token,
      state.message = data.message
    }
  },
  actions: {

    submitSignup({ commit }, values) {
      console.log(JSON.stringify(values))
      fetch('http://localhost:3000/api/user/signup', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        commit('SIGNUP', data)
        // if(!data.message) {
          // router.push('/posts')
        // }
        console.log(data)
        localStorage.setItem('token', data.token)
      })
      .catch(err => console.log(err))
  }

  },
  modules: {
  }
})
