import { createStore } from 'vuex'
import router from '../router/index'

export default createStore({
  state: {
    username: '',
    userId: '',
    isAdmin: '',
    token: '',
    imageUrl: '',
    message_movie:'',
    message_user: '',
    actors: [],
    movies: [],
    viewed_movies: [],
    error: ''
  },
  getters: {
  },
  mutations: {
    USER (state, data) {
      state.username = data.username,
      state.userId = data.userId,
      state.isAdmin = data.isAdmin,
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
    UPDATE_MESSAGE (state, message) {
      state.message = message
    },
    MOVIES (state, data) {
      state.movies = data
    },
    ACTORS (state, data) {
      state.actors = data
    },
    VIEWED_MOVIES (state, data) {
      state.viewed_movies = data
    },
    ERROR (state, data) {
      state.error = data
    }
  },
  actions: {

    // users functions
    submitSignup({ commit }, signupData) {
      
      fetch(process.env.VUE_APP_URL_API + 'api/user/signup', {
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
          router.push('/movies/')
        }
        localStorage.setItem('token', data.token)
      })
      .catch(err => {
        commit('ERROR', err)
      })
    },

    submitLogin({ commit }, loginData) {

      fetch(process.env.VUE_APP_URL_API + 'api/user/login', {
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
          router.push('/movies')
        }
        localStorage.setItem('token', data.token)
      })
      .catch(err => {
        commit('ERROR', err)
      })
    },

    getUser({ commit }) {

      let storageToken = localStorage.getItem('token')

      fetch(process.env.VUE_APP_URL_API + 'api/user/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + storageToken
        }
      })
      .then(res => res.json())
      .then(data => {
        commit('USER', data)
        if(data.message) {
          router.push('/login')
        }
      })
      .catch(err => {
        commit('ERROR', err)
        router.push('/login')
      })
    },

    modifyUsername({ dispatch, commit }, { modifyData, userId }) {

      fetch(process.env.VUE_APP_URL_API + 'api/user/' + userId, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifyData)
      })
      .then(res => res.json())
      .then(data => dispatch('getUser', data))
      .catch(err => {
        commit('ERROR', err)
      })
    },

    modifyImage({ dispatch, commit }, { modifyImage, userId }) {

      fetch(process.env.VUE_APP_URL_API + 'api/user/modifyImage/' + userId, {
          method: 'put',
          headers: {
              'Accept': 'application/json'
          },
          body: modifyImage
      })
      .then(res => res.json())
      .then(data => dispatch('getUser', data))
      .catch(err => {
        commit('ERROR', err)
      })
    },

    deleteUser({ state, commit }) {

      fetch(process.env.VUE_APP_URL_API + 'api/user/' + state.userId, {
        method: 'delete',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.message === 'Deleted user') {
          router.push('/signup')
        }
      })
      .catch(err => {
        commit('ERROR', err)
      })
    },

    // movies functions
    getActors({ commit }) {

      fetch(process.env.VUE_APP_URL_API + 'api/movie/actors/list', {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => commit('ACTORS', data.actors))
      .catch(err => {
        commit('ERROR', err)
      })
    },

    getAllMovies({ commit }, actor) {

      fetch(process.env.VUE_APP_URL_API + 'api/movie/' + actor, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => commit('MOVIES', data))
      .catch(err => {
        commit('ERROR', err)
      })
    },

    //associations functions
    create_viewed_movie({ dispatch, commit }, { userId, movieId, decade, actor }) {

      fetch(process.env.VUE_APP_URL_API + 'api/viewed_movie/' + userId + '/' + movieId + '/' + decade + '/' + actor, {
        method: 'post',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(() =>{
        dispatch('get_viewed_movies', userId)
      })
      .catch(err => {
        commit('ERROR', err)
      })
    },

    get_viewed_movies({ commit }) {

      let storageToken = localStorage.getItem('token')

      fetch(process.env.VUE_APP_URL_API + 'api/viewed_movie/', {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + storageToken
        }
      })
      .then(res => res.json())
      .then(data => {
        commit('VIEWED_MOVIES', data)
      })
      .catch(err => {
        commit('ERROR', err)
      })
    },

    destroy_viewed_movie({ dispatch, commit }, { userId, movieId }) {

      fetch(process.env.VUE_APP_URL_API + 'api/viewed_movie/destroy/' + userId + '/' + movieId, {
        method: 'delete',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(() => {
        dispatch('get_viewed_movies', userId)
      })
      .catch(err => {
        commit('ERROR', err)
      })
    }

  },
  modules: {
  }
})
