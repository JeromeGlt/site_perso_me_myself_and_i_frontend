import { createStore } from 'vuex'
import router from '../router/index'

export default createStore({
  state: {
    username: '',
    userId: '',
    token: '',
    imageUrl: '',
    message_movie:'',
    message_user: '',
    movies: [],
    viewed_movies: []
  },
  getters: {
  },
  mutations: {
    USER (state, data) {
      state.username = data.username,
      state.userId = data.userId,
      state.imageUrl = data.imageUrl,
      state.token = data.token,
      state.message = data.message
    },
    UPDATE_USERNAME (state, username) {
      state.username = username
    },
    UPDATE_IMAGEURL (state, imageUrl) {
      state.imageUrl = imageUrl
    },
    MOVIE (state, data) {
      state.movies = data
    },
    VIEWED_MOVIES (state, data) {
      state.viewed_movies = data
    }
  },
  actions: {

    // users functions
    submitSignup({ commit }, signupData) {
      
      fetch('http://localhost:3001/api/user/signup', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
        },
        body: signupData
      })
      .then(res => res.json())
      .then(data => {
        commit('USER', data)
        if(!data.message) {
          router.push('/movies/' + data.userId)
        }
        console.log(data)
        localStorage.setItem('token', data.token)
      })
      .catch(err => console.log(err))
    },

    submitLogin({ commit }, loginData) {

      fetch('http://localhost:3001/api/user/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      .then(res => res.json())
      .then(data => {
        commit('USER', data)
        if(!data.message) {
            router.push('/movies/' + data.userId)
        }
        console.log(data)
        localStorage.setItem('token', data.token)
      })
      .catch(err => console.log(err))
    },

    getUser({ commit }) {

      let storageToken = localStorage.getItem('token')

      fetch('http://localhost:3001/api/user/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + storageToken
        }
      })
      .then(res => res.json())
      .then(data => commit('USER', data))
      .catch(err => console.log(err))
    },

    modifyUsername({ dispatch }, { modifyData, userId }) {

      let storageToken = localStorage.getItem('token')

      fetch('http://localhost:3001/api/user/' + userId, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + storageToken
        },
        body: JSON.stringify(modifyData)
      })
      .then(res => res.json())
      .then(data => dispatch('getUser', data))
      .catch(err => console.log(err))
    },

    modifyImage({ dispatch }, { modifyImage, userId }) {

      let storageToken = localStorage.getItem('token')

      fetch('http://localhost:3001/api/user/modifyImage/' + userId, {
          method: 'put',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + storageToken
          },
          body: modifyImage
      })
      .then(res => res.json())
      .then(data => dispatch('getUser', data))
      .catch(err => console.log(err))
    },

    deleteUser({ state }) {

      let storageToken = localStorage.getItem('token')

      fetch('http://localhost:3001/api/user/' + state.userId, {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + storageToken
        }
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    },

    // movies functions
    createMovie({ dispatch }, movieData) {

      let actor = movieData.actor

      fetch('http://localhost:3001/api/movie/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      })
      .then(() => {
        dispatch('getAllMovies', actor)
      })
      .catch(err => console.log(err))
    },

    getAllMovies({ commit }, actor) {

      fetch('http://localhost:3001/api/movie/' + actor, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        commit('MOVIE', data)
      })
      .catch(err => console.log(err))
    },

    modifyMovie({ dispatch }, { movieData, id }) {

      fetch('http://localhost:3001/api/movie/' + id, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
      })
      .then(() => {
        dispatch('getAllMovies', movieData.actor)
      })
      .catch(err => console.log(err))
    },

    deleteMovie({ dispatch }, { id, actor }) {

      fetch('http://localhost:3001/api/movie/' + id, {
        method: 'delete',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(() => {
        dispatch('getAllMovies', actor)
      })
      .catch(err => console.log(err))
    },

    //associations functions
    create_viewed_movie({ dispatch }, { userId, movieId, decade }) {

      fetch('http://localhost:3001/api/viewed_movie/' + userId + '/' + movieId + '/' + decade, {
        method: 'post',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(() =>{
        dispatch('get_viewed_movies', userId)
      })
      .catch(err => console.log(err))
    },

    get_viewed_movies({ commit }, userId) {

      fetch('http://localhost:3001/api/viewed_movie/' + userId, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        commit('VIEWED_MOVIES', data)
      })
      .catch(err => console.log(err))
    },

    destroy_viewed_movie({ dispatch }, { userId, movieId }) {

      fetch('http://localhost:3001/api/viewed_movie/destroy/' + userId + '/' + movieId, {
        method: 'delete',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(() => {
        dispatch('get_viewed_movies', userId)
      })
      .catch(err => console.log(err))
    }

  },
  modules: {
  }
})
