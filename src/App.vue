<template>
  <div id="relative_container">
    <router-view/>
    <footerComponent/>
  </div>
</template>

<script>
  import footerComponent from './components/footer.vue'
  import './assets/style/style.css'

  export default {
    name: 'App',
    components: {
      footerComponent
    },
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

<style>
@media screen and (min-width: 1200px) {
  #relative_container {
    height: fit-content;
    min-height: 100vh;
    position: relative;
  }
}
</style>
