<template>
  <div class="flexbox">
    <p>{{ movieData.year }} -</p>
    <p>{{ movieData.title }} -</p>
    <p>{{ movieData.director }}</p>
  </div>
</template>

<script>
export default {
  name: 'showMovies',
  props: [
    'movieData'
  ]
}
</script>

<style scoped lang="scss">
  .flexbox {
    display: flex;
  }
</style>
