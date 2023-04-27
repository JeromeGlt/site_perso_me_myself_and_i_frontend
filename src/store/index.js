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
    viewed_movies: []
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
      .catch(err => console.log(err))
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
      .catch(err => console.log(err))
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
      .then(data => commit('USER', data))
      .catch(err => console.log(err))
    },

    modifyUsername({ dispatch }, { modifyData, userId }) {

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
      .catch(err => console.log(err))
    },

    modifyImage({ dispatch }, { modifyImage, userId }) {

      fetch(process.env.VUE_APP_URL_API + 'api/user/modifyImage/' + userId, {
          method: 'put',
          headers: {
              'Accept': 'application/json'
          },
          body: modifyImage
      })
      .then(res => res.json())
      .then(data => dispatch('getUser', data))
      .catch(err => console.log(err))
    },

    deleteUser({ state }) {

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
      .catch(err => console.log(err))
    },

    // movies functions
    createMovie({ dispatch }, movieData) {

      let actor = movieData.actor

      fetch(process.env.VUE_APP_URL_API + 'api/movie/', {
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

    getActors({ commit }) {
      fetch(process.env.VUE_APP_URL_API + 'api/movie/actors/list', {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => commit('ACTORS', data.actors))
      .catch(err => console.log(err))
    },

    getAllMovies({ commit }, actor) {

      fetch(process.env.VUE_APP_URL_API + 'api/movie/' + actor, {
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => commit('MOVIES', data))
      .catch(err => console.log(err))
    },

    modifyMovie({ dispatch }, { movieData, id }) {

      fetch(process.env.VUE_APP_URL_API + 'api/movie/' + id, {
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

      fetch(process.env.VUE_APP_URL_API + 'api/movie/' + id, {
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
    create_viewed_movie({ dispatch }, { userId, movieId, decade, actor }) {

      fetch(process.env.VUE_APP_URL_API + 'api/viewed_movie/' + userId + '/' + movieId + '/' + decade + '/' + actor, {
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
      .catch(err => console.log(err))
    },

    destroy_viewed_movie({ dispatch }, { userId, movieId }) {

      fetch(process.env.VUE_APP_URL_API + 'api/viewed_movie/destroy/' + userId + '/' + movieId, {
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
