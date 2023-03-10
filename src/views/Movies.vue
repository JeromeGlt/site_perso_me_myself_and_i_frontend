<template>
  <div>
    <div>
      <h1>Cinéma français</h1>
      <div v-if="userId">
        <p @click="modify_username_input">Modifier le nom d'utilisateur</p>
        <div v-if="modify_username_section">
          <div>
            <label for="username">Pseudo</label>
            <input type="text" name="username" v-model="username" @input="commitUsername">
            <div v-if="alertUsername">Le pseudo doit contenir entre 5 et 40 caractères. Seuls les lettres, points et tirets sont autorisés</div>
            <button @click="modifyUsername(userId)">Enregistrer</button>
          </div>
        </div>
        <p @click="deleteUser_alert">Supprimer le profil</p>
        <div v-if="delete_user_section">
          <p>Etes-vous sûr ? <span @click="deleteUser(userId)">Oui</span> <span @click="no_deleteUser_alert">Non</span></p>
        </div>
      </div>
      <div>
        <div>
          <img :src="imageUrl" alt="image de l'utilisateur"/>
        </div>
        <p @click="modify_image_input">Modifier l'image du profil</p>
        <div v-if="modify_image_section">
          <label for="user_imageUrl_modify">Choisir une image...</label>
          <input type="file" name="imageUrl_modify" @change="commitImageProfile">
          <div>
            <button @click="modifyImage(userId)">Envoyer</button>
            <button title="Annuler" @click="no_modify_image_section">X</button>
          </div>
        </div>
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
        imageUrl: state => state.imageUrl,
        isAdmin: state => state.isAdmin
      }),
    },
    data: () => ({
      modify_username_section: false,
      modify_image_section: false,
      delete_user_section: false,
      alertUsername: false
    }),
    methods: {
      getUser() {
        this.$store.dispatch('getUser')
      },
      modify_username_input() {
        this.modify_username_section = true
      },
      commitUsername(event) {
        if(/[^a-zA-Z-_.âàäçéêèëîïôöûü]/i.test(event.target.value) || event.target.value.length < 5 || event.target.value.length > 40) {
          return this.alertUsername = true
        } else {
          this.alertUsername = false
          this.$store.commit('UPDATE_USERNAME', event.target.value)
        }
      },
      modify_image_input() {
        this.modify_image_section = true
      },
      commitImageProfile(event) {
        this.$store.commit('UPDATE_IMAGEURL', event.target.files[0])
      },
      modifyUsername(userId) {

        let modifyData = {
          username: this.username
        }

        this.$store.dispatch('modifyUsername', { modifyData, userId })
        this.modify_username_section = false
      },
      modifyImage(userId) {

        let modifyImage = new FormData()
        modifyImage.append('imageUrl', this.imageUrl)

        this.$store.dispatch('modifyImage', { modifyImage, userId })
        this.$store.dispatch('getUser')
        this.modify_image_section = !this.modify_image_section
      },
      no_modify_image_section() {
        this.modify_image_section = false
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