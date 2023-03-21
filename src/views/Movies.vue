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
    <!-- Select pour choisir l'acteur -->
    <div v-if="userId">
      <label>Choisissez votre acteur</label>
      <select v-model="actor" @input="get_datas">
        <option>Belmondo</option>
        <option>Clavier</option>
      </select>
    </div>
    <!-- Seulement visible par l'administrateur -->
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
    <div class="flexbox">
      <!-- Affichage du tableau -->
      <div v-if="array_belmondo">
        <p @click="close_belmondo">fermer</p>
        <table>
          <tr>
            <td>Décennies</td>
            <td>Films tournés</td>
            <td>Films vus</td>
          </tr>
          <tr>
            <td>Années 50</td>
            <td>{{ total_movies_50_belmondo }}</td>
            <td>{{ total_viewed_50_belmondo }} - {{ fifties_percent_belmondo }}%</td>
          </tr>
          <tr>
            <td>Années 60</td>
            <td>{{ total_movies_60_belmondo }}</td>
            <td>{{ total_viewed_60_belmondo }} - {{ sixties_percent_belmondo }}%</td>
          </tr>
          <tr>
            <td>Années 70</td>
            <td>{{ total_movies_70_belmondo }}</td>
            <td>{{ total_viewed_70_belmondo }} - {{ seventies_percent_belmondo }}%</td>
          </tr>
          <tr>
            <td>Années 80</td>
            <td>{{ total_movies_80_belmondo }}</td>
            <td>{{ total_viewed_80_belmondo }} - {{ eighties_percent_belmondo }}%</td>
          </tr>
          <tr>
            <td>Années 90</td>
            <td>{{ total_movies_90_belmondo }}</td>
            <td>{{ total_viewed_90_belmondo }} - {{ nineties_percent_belmondo }}%</td>
          </tr>
          <tr>
            <td>Années 2000</td>
            <td>{{ total_movies_2000_belmondo }}</td>
            <td>{{ total_viewed_2000_belmondo }} - {{ millenial_percent_belmondo }}%</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{{ total_movies_belmondo }}</td>
            <td>{{ total_viewed_belmondo }} - {{ total_percent_belmondo }}%</td>
          </tr>
        </table>
        <button @click="calculate_belmondo">Rafraichir</button>
        <!-- films -->
        <div>
          <ul>
            <li v-for="movie in movies_belmondo" :key="movie.title">
              <showMovies :movieData="movie"/>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="array_clavier">
        <p @click="close_clavier">fermer</p>
        <table>
          <tr>
            <td>Décennies</td>
            <td>Films tournés</td>
            <td>Films vus</td>
          </tr>
          <tr>
            <td>Années 70</td>
            <td>{{ total_movies_70_clavier }}</td>
            <td>{{ total_viewed_70_clavier }} - {{ seventies_percent_clavier }}%</td>
          </tr>
          <tr>
            <td>Années 80</td>
            <td>{{ total_movies_80_clavier }}</td>
            <td>{{ total_viewed_80_clavier }} - {{ eighties_percent_clavier }}%</td>
          </tr>
          <tr>
            <td>Années 90</td>
            <td>{{ total_movies_90_clavier }}</td>
            <td>{{ total_viewed_90_clavier }} - {{ nineties_percent_clavier }}%</td>
          </tr>
          <tr>
            <td>Années 2000</td>
            <td>{{ total_movies_2000_clavier }}</td>
            <td>{{ total_viewed_2000_clavier }} - {{ millenial_percent_clavier }}%</td>
          </tr>
          <tr>
            <td>Années 2010</td>
            <td>{{ total_movies_2010_clavier }}</td>
            <td>{{ total_viewed_2010_clavier }} - {{ tens_percent_clavier }}%</td>
          </tr>
          <tr>
            <td>Années 2020</td>
            <td>{{ total_movies_2020_clavier }}</td>
            <td>{{ total_viewed_2020_clavier }} - {{ twenties_percent_clavier }}%</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{{ total_movies_clavier }}</td>
            <td>{{ total_viewed_clavier }} - {{ total_percent_clavier }}%</td>
          </tr>
        </table>
        <button @click="calculate_clavier">Rafraichir</button>
        <!-- films -->
        <div>
          <ul>
            <li v-for="movie in movies_clavier" :key="movie.title">
              <showMovies :movieData="movie"/>
            </li>
          </ul>
        </div>
      </div> 
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
        movies_belmondo: state => state.movies_belmondo,
        movies_clavier: state => state.movies_clavier,
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

      total_movies_50_belmondo: 7,
      total_movies_60_belmondo: 39,
      total_movies_70_belmondo: 14,
      total_movies_80_belmondo: 9,
      total_movies_90_belmondo: 6,
      total_movies_2000_belmondo: 3,
      total_movies_belmondo: 78,

      total_movies_70_clavier: 15,
      total_movies_80_clavier: 13,
      total_movies_90_clavier: 10,
      total_movies_2000_clavier: 11,
      total_movies_2010_clavier: 16,
      total_movies_2020_clavier: 4,
      total_movies_clavier: 69,

      total_viewed_50_belmondo: 0,
      total_viewed_60_belmondo: 0,
      total_viewed_70_belmondo: 0,
      total_viewed_80_belmondo: 0,
      total_viewed_90_belmondo: 0,
      total_viewed_2000_belmondo: 0,

      total_viewed_70_clavier: 0,
      total_viewed_80_clavier: 0,
      total_viewed_90_clavier: 0,
      total_viewed_2000_clavier: 0,
      total_viewed_2010_clavier: 0,
      total_viewed_2020_clavier: 0,

      fifties_percent_belmondo: 0,
      sixties_percent_belmondo: 0,
      seventies_percent_belmondo: 0,
      eighties_percent_belmondo: 0,
      nineties_percent_belmondo: 0,
      millenial_percent_belmondo: 0,

      seventies_percent_clavier: 0,
      eighties_percent_clavier: 0,
      nineties_percent_clavier: 0,
      millenial_percent_clavier: 0,
      tens_percent_clavier: 0,
      twenties_percent_clavier: 0,

      total_viewed_belmondo: 0,
      total_percent_belmondo: 0,

      total_viewed_clavier: 0,
      total_percent_clavier: 0,

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
          this.calculate_belmondo()
        } else if(event.target.value === 'Clavier') {
          this.array_clavier = true
          this.calculate_clavier()
        }
      },
      close_belmondo() {
        this.array_belmondo = false
      },
      close_clavier() {
        this.array_clavier = false
      },
      calculate_belmondo() {

        let total_viewed_50_array_belmondo = []
        let total_viewed_60_array_belmondo = []
        let total_viewed_70_array_belmondo = []
        let total_viewed_80_array_belmondo = []
        let total_viewed_90_array_belmondo = []
        let total_viewed_2000_array_belmondo = []

        for(let i = 0; i < this.viewed_movies.length; i++) {
          if(this.viewed_movies[i].decade === 50 && this.viewed_movies[i].actor === 'Belmondo') {
            total_viewed_50_array_belmondo.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 60 && this.viewed_movies[i].actor === 'Belmondo') {
            total_viewed_60_array_belmondo.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 70 && this.viewed_movies[i].actor === 'Belmondo') {
            total_viewed_70_array_belmondo.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 80 && this.viewed_movies[i].actor === 'Belmondo') {
            total_viewed_80_array_belmondo.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 90 && this.viewed_movies[i].actor === 'Belmondo') {
            total_viewed_90_array_belmondo.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 2000 && this.viewed_movies[i].actor === 'Belmondo') {
            total_viewed_2000_array_belmondo.push(this.viewed_movies[i])
          }
        }

        this.total_viewed_50_belmondo = total_viewed_50_array_belmondo.length
        this.total_viewed_60_belmondo = total_viewed_60_array_belmondo.length
        this.total_viewed_70_belmondo = total_viewed_70_array_belmondo.length
        this.total_viewed_80_belmondo = total_viewed_80_array_belmondo.length
        this.total_viewed_90_belmondo = total_viewed_90_array_belmondo.length
        this.total_viewed_2000_belmondo = total_viewed_2000_array_belmondo.length

        this.fifties_percent_belmondo = (this.total_viewed_50_belmondo / this.total_movies_50_belmondo * 100).toFixed(0)
        this.sixties_percent_belmondo = (this.total_viewed_60_belmondo / this.total_movies_60_belmondo * 100).toFixed(0)
        this.seventies_percent_belmondo = (this.total_viewed_70_belmondo / this.total_movies_70_belmondo * 100).toFixed(0)
        this.eighties_percent_belmondo = (this.total_viewed_80_belmondo / this.total_movies_80_belmondo * 100).toFixed(0)
        this.nineties_percent_belmondo = (this.total_viewed_90_belmondo / this.total_movies_90_belmondo * 100).toFixed(0)
        this.millenial_percent_belmondo = (this.total_viewed_2000_belmondo / this.total_movies_2000_belmondo * 100).toFixed(0)

        this.total_viewed_belmondo = this.total_viewed_50_belmondo + this.total_viewed_60_belmondo + this.total_viewed_70_belmondo + this.total_viewed_80_belmondo + this.total_viewed_90_belmondo + this.total_viewed_2000_belmondo
        this.total_percent_belmondo = (this.total_viewed_belmondo / this.total_movies_belmondo * 100).toFixed(0)
      },
      calculate_clavier() {

        let total_viewed_70_array_clavier = []
        let total_viewed_80_array_clavier = []
        let total_viewed_90_array_clavier = []
        let total_viewed_2000_array_clavier = []
        let total_viewed_2010_array_clavier = []
        let total_viewed_2020_array_clavier = []

        for(let i = 0; i < this.viewed_movies.length; i++) {
          if(this.viewed_movies[i].decade === 70 && this.viewed_movies[i].actor === 'Clavier') {
            total_viewed_70_array_clavier.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 80 && this.viewed_movies[i].actor === 'Clavier') {
            total_viewed_80_array_clavier.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 90 && this.viewed_movies[i].actor === 'Clavier') {
            total_viewed_90_array_clavier.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 2000 && this.viewed_movies[i].actor === 'Clavier') {
            total_viewed_2000_array_clavier.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 2010 && this.viewed_movies[i].actor === 'Clavier') {
            total_viewed_2010_array_clavier.push(this.viewed_movies[i])
          }else if(this.viewed_movies[i].decade === 2020 && this.viewed_movies[i].actor === 'Clavier') {
            total_viewed_2020_array_clavier.push(this.viewed_movies[i])
          }
        }

        this.total_viewed_70_clavier = total_viewed_70_array_clavier.length
        this.total_viewed_80_clavier = total_viewed_80_array_clavier.length
        this.total_viewed_90_clavier = total_viewed_90_array_clavier.length
        this.total_viewed_2000_clavier = total_viewed_2000_array_clavier.length
        this.total_viewed_2010_clavier = total_viewed_2010_array_clavier.length
        this.total_viewed_2020_clavier = total_viewed_2020_array_clavier.length

        this.seventies_percent_clavier = (this.total_viewed_70_clavier / this.total_movies_70_clavier * 100).toFixed(0)
        this.eighties_percent_clavier = (this.total_viewed_80_clavier / this.total_movies_80_clavier * 100).toFixed(0)
        this.nineties_percent_clavier = (this.total_viewed_90_clavier / this.total_movies_90_clavier * 100).toFixed(0)
        this.millenial_percent_clavier = (this.total_viewed_2000_clavier / this.total_movies_2000_clavier * 100).toFixed(0)
        this.tens_percent_clavier = (this.total_viewed_2010_clavier / this.total_movies_2010_clavier * 100).toFixed(0)
        this.twenties_percent_clavier = (this.total_viewed_2020_clavier / this.total_movies_2020_clavier * 100).toFixed(0)

        this.total_viewed_clavier = this.total_viewed_70_clavier + this.total_viewed_80_clavier + this.total_viewed_90_clavier + this.total_viewed_2000_clavier + this.total_viewed_2010_clavier + this.total_viewed_2020_clavier
        this.total_percent_clavier = (this.total_viewed_clavier / this.total_movies_clavier * 100).toFixed(0)
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
  .flexbox {
    display: flex;
  }
</style>