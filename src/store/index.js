import { createStore } from 'vuex'

export default createStore({
  state: {
    username: '',
    userId: '',
    token: '',
    message_movie:'',
    message_user: ''
  },
  getters: {
  },
  mutations: {
    USER (state, data) {
      state.username = data.username,
      state.userId = data.userId,
      state.token = data.token,
      state.message = data.message
    },
    UPDATE_USERNAME (state, username) {
      state.username = username
    }
  },
  actions: {

    submitSignup({ commit }, signupData) {
      fetch('http://localhost:3000/api/user/signup', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
        },
        body: signupData
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
    },

    getUser({ commit }) {
      let storageToken = localStorage.getItem('token')

      fetch('http://localhost:3000/api/user/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + storageToken
        }
      })
      .then(res => res.json())
      .then(data => commit('USER', data))
      .catch(err => console.log(err))
    },

    modifyUser({ dispatch }, { modifyData, userId }) {
      fetch('http://localhost:3000/api/user/' + userId, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifyData)
      })
      .then(res => res.json())
      .then(data => dispatch('getUser', data))
      .catch(err => console.log(err))
    }

  },
  modules: {
  }
})
