<template>
  <div>
    <div>
      <h1>Cinéma français</h1>
      <div v-if="userId">
        <p @click="modifyUser_input">Modifier le profil</p>
        <div v-if="modify_user_section">
          <label for="username">Pseudo</label>
          <input type="text" name="user_name" v-model="username" @change="modifyUsername">
          <button @click="modifyUser(userId)"></button>
        </div>
        <p @click="deleteUser_alert">Supprimer le profil</p>
        <div v-if="delete_user_section">
          <p>Etes-vous sûr ? <span @click="deleteUser">Oui</span> <span @click="no_deleteUser_alert">Non</span></p>
        </div>
      </div>
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
        userId: state => state.userId,
        isAdmin: state => state.isAdmin
      }),
    },
    data: () => ({
      modify_user_section: false,
      delete_user_section: false
    }),
    methods: {
      getUser() {
        this.$store.dispatch('getUser')
      },
      modifyUser_input() {
        this.modify_user_section = true
      },
      modifyUsername(event) {
        this.$store.commit('UPDATE_USERNAME', event.target.value)
      },
      modifyUser(userId) {
        let modifyData = {
          username: this.username
        }

        this.$store.dispatch('modifyUser', { modifyData, userId })
        this.modify_user_section = false
      },
      deleteUser_alert() {
        this.delete_user_section = true
      },
      no_deleteUser_alert() {
        this.delete_user_section = false
      },
      deleteUser() {
        this.$store.dispatch('deleteUser')
      }
    },
    mounted() {
      this.getUser()
    }
  }
</script>

<style scoped lang='scss'>

</style>