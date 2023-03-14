<template>
  <div>
    <div>
      <h1>Cinéma français</h1>
      <div v-if="userId">
        <p @click="modify_username_input">Modifier le nom d'utilisateur</p>
        <div v-if="modify_username_section">
          <div>
            <label>Pseudo</label>
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
          <label>Choisir une image...</label>
          <input type="file" name="imageUrl_modify" @change="commitImageProfile">
          <div>
            <p v-if="!this.imageUrl_modify">Veuillez sélectionner une nouvelle image</p>
            <button v-if="this.imageUrl_modify" @click="modifyImage(userId)">Envoyer</button>
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
    <!-- ce qui sera en v-if="isAdmin" -->
    <div>
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
        <button @click="submitMovie"></button>
    </div>
    <div>
      <ul>
        <li v-for="movie in movies" :key="movie.title">
          <showMovies :movieData="movie"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import showMovies from '../components/showMovies.vue'

  export default {
    name: 'WatchedMovies',
    component: {
      showMovies
    },
    computed: {
      ...mapState({
        username: state => state.username,
        userId: state => state.userId,
        imageUrl: state => state.imageUrl,
        isAdmin: state => state.isAdmin,
        movies: state => state.movies
      }),
    },
    data: () => ({
      modify_username_section: false,
      modify_image_section: false,
      delete_user_section: false,
      alertUsername: false,
      imageUrl_modify: '',
      actor: '',
      title: '',
      director: '',
      year: null,
      decade: null
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
        this.imageUrl_modify = this.imageUrl
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
      },
      submitMovie() {

        let movieData = {
          title: this.title,
          director: this.director,
          actor: this.actor,
          year: this.year,
          decade: this.decade
        }

        this.$store.dispatch('createMovie', movieData)

        this.title = ''
        this.director = ''
        this.year = ''
      },
      getAllMovies() {
        let actor = 'Belmondo'

        this.$store.dispatch('getAllMovies', actor)
      }
    },
    mounted() {
      this.getUser()
      this.getAllMovies()
    }
  }
</script>

<style scoped lang='scss'>

</style>