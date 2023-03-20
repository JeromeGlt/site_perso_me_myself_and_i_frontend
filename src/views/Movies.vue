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
        <label>Choisissez votre acteur</label>
        <select v-model="actor" @input="get_datas">
          <option>Belmondo</option>
          <option>Clavier</option>
        </select>
    </div>
    <!-- ce qui sera en v-if="isAdmin" -->
    <div v-if="isAdmin">
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
    <!-- Affichage du tableau -->
    <div v-if="array_belmondo">
      <table>
        <tr>
          <td>Décennies</td>
          <td>Films tournés</td>
          <td>Films vus</td>
        </tr>
        <tr>
          <td>Années 50</td>
          <td>{{ total_movies_50 }}</td>
          <td>{{ total_viewed_50 }} - {{ fifties_percent }}%</td>
        </tr>
        <tr>
          <td>Années 60</td>
          <td>{{ total_movies_60 }}</td>
          <td>{{ total_viewed_60 }} - {{ sixties_percent }}%</td>
        </tr>
        <tr>
          <td>Années 70</td>
          <td>{{ total_movies_70 }}</td>
          <td>{{ total_viewed_70 }} - {{ seventies_percent }}%</td>
        </tr>
        <tr>
          <td>Années 80</td>
          <td>{{ total_movies_80 }}</td>
          <td>{{ total_viewed_80 }} - {{ eighties_percent }}%</td>
        </tr>
        <tr>
          <td>Années 90</td>
          <td>{{ total_movies_90 }}</td>
          <td>{{ total_viewed_90 }} - {{ nineties_percent }}%</td>
        </tr>
        <tr>
          <td>Années 2000</td>
          <td>{{ total_movies_2000 }}</td>
          <td>{{ total_viewed_2000 }} - {{ millenial_percent }}%</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{{ total_movies }}</td>
          <td>{{ total_viewed }} - {{ total_percent }}%</td>
        </tr>
      </table>
      <button @click="calculate">Rafraichir</button>
    </div>
    <!-- Affichage des films -->
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
        movies: state => state.movies,
        viewed_movies: state => state.viewed_movies
      }),
    },
    data: () => ({
      modify_username_section: false,
      modify_image_section: false,
      delete_user_section: false,
      alertUsername: false,
      array_belmondo: false,
      array_clavier: false,
      imageUrl_modify: '',
      actor: '',
      title: '',
      director: '',

      total_movies_50: 7,
      total_movies_60: 39,
      total_movies_70: 14,
      total_movies_80: 9,
      total_movies_90: 6,
      total_movies_2000: 3,
      total_movies: 78,

      total_viewed_50: 0,
      total_viewed_60: 0,
      total_viewed_70: 0,
      total_viewed_80: 0,
      total_viewed_90: 0,
      total_viewed_2000: 0,

      fifties_percent: 0,
      sixties_percent: 0,
      seventies_percent: 0,
      eighties_percent: 0,
      nineties_percent: 0,
      millenial_percent: 0,

      total_viewed: 0,
      total_percent: 0,

      year: null,
      decade: null
    }),
    methods: {

      // get functions
      getUser() {
        this.$store.dispatch('getUser')
      },
      get_viewed_movies() {

        let userId_url = window.location.href.split('http://localhost:8080/#/movies/')

        this.$store.dispatch('get_viewed_movies', userId_url[1])
      },
      get_datas(event) {
        let actor = event.target.value

        this.$store.dispatch('getAllMovies', actor)
        // variabiliser quel array doit s'afficher en fonction de la valeur de actor
        if(event.target.value === 'Belmondo') {
          this.array_belmondo = true
          this.array_clavier = false
        } else if(event.target.value === 'Clavier') {
          this.array_belmondo = false
          this.array_clavier = true
        }

        this.calculate()
      },
      calculate() {
        let total_viewed_50_array = []
        let total_viewed_60_array = []
        let total_viewed_70_array = []
        let total_viewed_80_array = []
        let total_viewed_90_array = []
        let total_viewed_2000_array = []

        for(let i = 0; i < this.viewed_movies.length; i++) {
          if(this.viewed_movies[i].decade === 50) {
            total_viewed_50_array.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 60) {
            total_viewed_60_array.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 70) {
            total_viewed_70_array.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 80) {
            total_viewed_80_array.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 90) {
            total_viewed_90_array.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 2000) {
            total_viewed_2000_array.push(this.viewed_movies[i])
          }
        }

        this.total_viewed_50 = total_viewed_50_array.length
        this.total_viewed_60 = total_viewed_60_array.length
        this.total_viewed_70 = total_viewed_70_array.length
        this.total_viewed_80 = total_viewed_80_array.length
        this.total_viewed_90 = total_viewed_90_array.length
        this.total_viewed_2000 = total_viewed_2000_array.length

        this.fifties_percent = (this.total_viewed_50 / this.total_movies_50 * 100).toFixed(1)
        this.sixties_percent = (this.total_viewed_60 / this.total_movies_60 * 100).toFixed(1)
        this.seventies_percent = (this.total_viewed_70 / this.total_movies_70 * 100).toFixed(1)
        this.eighties_percent = (this.total_viewed_80 / this.total_movies_80 * 100).toFixed(1)
        this.nineties_percent = (this.total_viewed_90 / this.total_movies_90 * 100).toFixed(1)
        this.millenial_percent = (this.total_viewed_2000 / this.total_movies_2000 * 100).toFixed(1)

        this.total_viewed = this.total_viewed_50 + this.total_viewed_60 + this.total_viewed_70 + this.total_viewed_80 + this.total_viewed_90 + this.total_viewed_2000
        this.total_percent = (this.total_viewed / this.total_movies * 100).toFixed(1)
      },

      //user modifications functions
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

      // user deletion functions
      deleteUser_alert() {
        this.delete_user_section = true
      },
      no_deleteUser_alert() {
        this.delete_user_section = false
      },
      deleteUser() {
        this.$store.dispatch('deleteUser')
      },

      // movie creation function
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
      }
    },
    created() {
      this.get_viewed_movies(),
      this.getUser()
    }
  }
</script>

<style scoped lang='scss'>

</style>