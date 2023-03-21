import { createRouter, createWebHashHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Movies from '../views/Movies.vue'

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage
  },
  {
    path: '/signup',
    name: 'SignUp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Signup
  },
  {
    path: '/login',
    name: 'LogIn',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
  {
    path: '/movies/:userId',
    name: 'WatchedMovies',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Movies
  },
  {
    path: '/movies',
    name: 'WatchedMoviesWithoutConnexion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Movies
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
