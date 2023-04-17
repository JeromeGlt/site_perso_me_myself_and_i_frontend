<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  import './assets/style/style.css'
  export default {
    name: 'App',
    methods: {
      link_linkedin() {
        window.open('https://www.linkedin.com/in/jérôme-gallot/')
      },
      link_github() {
        window.open('https://github.com/JeromeGlt')
      }
    }
  }
</script>

<style scoped>

</style>
