<template>
  <div>
    <div>
      <h1>Cinéma français</h1>
      <div>
        <p>{{ username }}, vous pouvez créer ici vos tableaux de visionnages</p>
        <p>Voici le mien :</p>
        <p>TABLEAU</p>
      </div>
      <p v-if="!userId">Vous voulez créer le vôtre ? Faut se co et tout</p>
    </div>
    <div v-if="userId">
        Choisissez votre acteur
    </div>
    <div v-if="isAdmin">
        <label></label>
        <input>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'WatchedMovies',
    computed: {
      ...mapState({
        username: state => state.username,
        userId: state => state.userId
      }),
    },
    methods: {
      getUser() {
        this.$store.dispatch('getUser')
      }
    },
    mounted() {
      this.getUser()
    }
  }
</script>

<style scoped lang='scss'>

</style>