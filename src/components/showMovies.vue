<template>
  <div class="flexbox">
    <p>{{ movieData.year }} -</p>
    <p>{{ movieData.title }} -</p>
    <p>{{ movieData.director }}</p>
    <p @click="deleteMovie(movieData.id)">X</p>
  </div>
</template>

<script>
export default {
  name: 'showMovies',
  props: [
    'movieData'
  ],
  methods: {
    deleteMovie(id) {

      let actor = this.movieData.actor

      this.$store.dispatch('deleteMovie', { id, actor })
    }
  }
}
</script>

<style scoped lang="scss">
  .flexbox {
    display: flex;
  }
</style>
