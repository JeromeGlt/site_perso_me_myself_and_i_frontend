import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import showMovies from './components/showMovies'

createApp(App).use(store).use(router).component('showMovies', showMovies).mount('#app')