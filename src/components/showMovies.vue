<template>
  <div>
    <div class="flexbox" :id="this.movieData.id" v-if="no_viewed_movie" @click="create_viewed_movie(this.userId, this.movieData.id, this.movieData.decade, this.movieData.actor)">
      <p>{{ movieData.year }} -</p>
      <p>{{ movieData.title }} -</p>
      <p>{{ movieData.director }} -</p>
      <p @click="deleteMovie(movieData.id)" v-if="isAdmin">X</p>
      <p>-</p>
      <p @click="modify_movie_section_open" v-if="isAdmin">M</p>
      <div v-if="modify_movie_section">
        <label>Acteur</label>
        <select v-model="actor">
          <option>Belmondo</option>
          <option>Clavier</option>
        </select>
        <label>Titre</label>
        <input type="text" v-model="title">
        <label>Réalisateur</label>
        <input type="text" v-model="director">
        <label>Année</label>
        <input type="number" v-model="year">
        <label>Décennie</label>
        <select v-model="decade">
          <option>50</option>
          <option>60</option>
          <option>70</option>
          <option>80</option>
          <option>90</option>
          <option>2000</option>
          <option>10</option>
          <option>20</option>
        </select>
        <button @click="modifyMovie(movieData.id)"></button>
      </div>
    </div>
    <div class="flexbox viewed_text" v-if="viewed_movie" @click="destroy_viewed_movie(this.userId, this.movieData.id)">
      <p>{{ movieData.year }} -</p>
      <p>{{ movieData.title }} -</p>
      <p>{{ movieData.director }} -</p>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'showMovies',
  data: () => ({
    modify_movie_section: false,
    no_viewed_movie: true,
    viewed_movie: false,
    actor: '',
    title: '',
    director: '',
    year: null,
    decade: null
  }),
  computed: {
    ...mapState({
      userId: state => state.userId,
      viewed_movies: state => state.viewed_movies,
      movies_belmondo: state => state.movies_belmondo,
      movies_clavier: state => state.movies_clavier,
      isAdmin: state => state.isAdmin
    })
  },
  props: [
    'movieData'
  ],
  methods: {
    check_viewed_movies() {

      for(let i = 0; i < this.viewed_movies.length; i++) {
        if(this.movieData.id === this.viewed_movies[i].movieId) {
          this.viewed_movie = true
          this.no_viewed_movie = false
        }
      }
      // console.log(this.viewed_movies[0])
    },
    deleteMovie(id) {

      let actor = this.movieData.actor

      this.$store.dispatch('deleteMovie', { id, actor })
    },
    modify_movie_section_open() {
      this.modify_movie_section = true
    },
    modifyMovie(id) {

      let movieData = {
        title: this.title,
        director: this.director,
        actor: this.actor,
        year: this.year,
        decade: this.decade
      }

      this.$store.dispatch('modifyMovie', { movieData, id })
      this.modify_movie_section = false
    },
    create_viewed_movie(userId, movieId, decade, actor) {

      this.$store.dispatch('create_viewed_movie', { userId, movieId, decade, actor })
      this.no_viewed_movie = false
      this.viewed_movie = true
    },
    destroy_viewed_movie(userId, movieId) {

      this.$store.dispatch('destroy_viewed_movie', { userId, movieId })
      this.viewed_movie = false
      this.no_viewed_movie = true
    }
  },
  mounted() {
    // this.get_viewed_movies(),
    this.check_viewed_movies()
  }
}
</script>

<style scoped lang="scss">
  .flexbox {
    display: flex;
  }
  .viewed_text {
    text-decoration: underline overline;
  }
</style>
