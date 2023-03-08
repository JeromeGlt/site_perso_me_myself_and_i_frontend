import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
    USER (state, data) {
      state.username = data.username,
      state.userId = data.userId,
      state.token = data.token,
      state.message = data.message
    }
  },
  actions: {

    submitSignup({ commit }, signupData) {
      fetch('http://localhost:3000/api/user/signup', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      })
      .then(res => res.json())
      .then(data => {
        commit('USER', data)
        // if(!data.message) {
          // router.push('/posts')
        // }
        console.log(data)
        localStorage.setItem('token', data.token)
      })
      .catch(err => console.log(err))
  },

  submitLogin({ commit }, loginData) {
    fetch('http://localhost:3000/api/user/login', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData),
    })
    .then(res => res.json())
    .then(data => {
        commit('USER', data)
        // if(!data.message) {
        //     router.push('/posts')
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
