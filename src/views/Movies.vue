<template>
  <div>
    <div>
      <h1>Cinéma français</h1>
      <div id="user" v-if="userId_url">
        <div class="user_image" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
        <div id="container_icons">
          <img v-if="icon_modify_username" class="icons" src="../../public/images/rewrite.svg" title="Modifier le pseudo" @click="modify_username_input"/>
          <img v-if="icon_modify_image" class="icons" src="../../public/images/image.svg" title="Modifier l'image" @click="modify_image_input"/>
          <img v-if="icon_delete_user" class="icons" src="../../public/images/delete.svg" title="Supprimer le profil" @click="deleteUser_alert"/>
        </div>
      </div>
      <!-- Suppression du compte -->
      <div v-if="delete_user_section && userId_url" id="question_delete_user">
        <div id="question">
          <p>Êtes-vous sûr ?</p>
        </div>
        <div class="choice_delete">
          <p @click="deleteUser(userId)">Oui</p>
        </div>
        <div class="choice_delete">
          <p @click="no_deleteUser_alert">Non</p>
        </div>
      </div>
      <!-- Modification de l'image d'utilisateur -->
      <div id="modify_image_section" v-if="modify_image_section && userId_url">
        <div class="input_image">
          <label>Choisir une image...
            <input type="file" name="imageUrl_modify" @change="commitImageProfile">
          </label>
          <button class="change_border" title="Annuler" @click="no_modify_image_section">X</button>
        </div>
        <button id="submit_modify_image" v-if="this.imageUrl_modify" @click="modifyImage(userId)">Envoyer</button>
      </div>
      <!-- Modification du nom d'utilisateur -->
      <div v-if="modify_username_section && userId_url">
        <div class="input">
          <div class="flexbox">
            <input type="text" name="username" v-model="username" @input="commitUsername">
            <button class="change_border" title="Annuler" @click="no_modify_username_section">X</button>
          </div>
          <div class="alert" v-if="alertUsername">Doit contenir entre 5 et 40 caractères. Seuls les lettres, points et tirets sont autorisés</div>
          <button class="change_border" id="submit_modify_username" v-else @click="modifyUsername(userId)">Enregistrer</button>
        </div>
      </div>
      <!-- Explications de la création des tableaux -->
      <div id="movies_explication">
        <p v-if="!userId_url">Ici, vous pouvez créer vos propres tableaux de visionnages.</p>
        <p v-if="userId_url">{{ username }}, vous pouvez créer ici vos propres tableaux de visionnages.</p>
        <p>Je vous donne la possibilité de le faire pour Jean-Paul Belmondo et Christian Clavier.</p>
        <p>Le principe est de cliquer sur les films que vous avez vus, ce qui créera les tableaux.</p>
      </div>
      <p class="link" v-if="!userId_url">Vous voulez créer les vôtres ? <router-link to="/login">Connectez-vous</router-link> ou <router-link to="/signup">créez un compte</router-link>.</p>
    </div>

    <!-- Select pour choisir l'acteur -->
    <div v-if="userId_url" id="actor_choice">
      <label>Choisissez votre acteur</label>
      <select v-model="actor" @input="get_datas">
        <option v-for="actor in actors" :key="actor">{{ actor }}</option>
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
    <!-- Tableau -->
    <div class="show_tables" v-if="this.stats">
      <table class="table">
        <h3>{{ this.actor }}</h3>
        <div class="cancel_array">
          <img class="icons" src="../../public/images/delete.svg" title="Fermer le tableau" @click="close"/>
        </div>
        <tr>
          <td>Décennies</td>
          <td>Films tournés</td>
          <td>Films vus</td>
        </tr>
        <tr v-for="(value, decade) in stats" :key="decade">
          <td>Années {{ decade }}</td>
          <td>{{ value.producedMovies }}</td>
          <td>{{ value.viewedMovies }} - {{ value.percent }}%</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{{  }}</td>
          <td></td>
        </tr>
      </table>
      <!-- films -->
      <div class="movies_container">
        <ul>
          <li v-for="movie in movies" :key="movie.title">
            <showMovies :movieData="movie" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import showMovies from '../components/showMovies.vue'

  export default {
    name: 'WatchedMovies',
    components: {
      showMovies
    },
    computed: {
      ...mapState({
        username: state => state.username,
        userId: state => state.userId,
        imageUrl: state => state.imageUrl,
        isAdmin: state => state.isAdmin,
        movies: state => state.movies,
        viewed_movies: state => state.viewed_movies,
        actors: state => state.actors
      })
    },
    data: () => ({      
      userId_url:'',
      icon_modify_username: true,
      modify_username_section: false,
      icon_modify_image: true,
      modify_image_section: false,
      icon_delete_user: true,
      delete_user_section: false,
      alertUsername: false,
      imageUrl_modify: '',
      actor: '',
      title: '',
      director: '',
      year: null,
      decade: null,
      stats: null
    }),
    methods: {

      // get functions
      getUser() {
        this.$store.dispatch('getUser')
      },
      get_viewed_movies() {

        let url = window.location.href.split(process.env.VUE_APP_URL)

        this.userId_url = url[1]

        this.$store.dispatch('verification_user_id', this.userId_url)
      },
      getActors() {
        this.$store.dispatch('getActors')
      },
      get_datas(event) {
        this.actor = event.target.value

        this.$store.dispatch('getAllMovies', this.actor)
      },
      close() {
        this.stats = null
      },
      calculate() {

        if(this.movies.length === 0){
          return null
        }

        const result = this.movies.reduce((acc, curr) => {

          const hasDecade = Object.prototype.hasOwnProperty.call(acc, curr.decade)

          if(!hasDecade) {
            const viewedMovies = this.checkViewedMovie(curr.id) ? 1 : 0

            acc[curr.decade] = {
              producedMovies: 1,
              viewedMovies,
              percent: viewedMovies * 100
            }
          }else{
            const previousProducedMovies = acc[curr.decade].producedMovies
            const producedMovies = previousProducedMovies + 1
            const previousViewedMovies = acc[curr.decade].viewedMovies
            const viewedMovies = this.checkViewedMovie(curr.id) ? previousViewedMovies + 1 : previousViewedMovies
        
            acc[curr.decade] = {
              producedMovies,
              viewedMovies,
              percent: viewedMovies / producedMovies * 100
            }
          }

          return acc

        }, {})

        console.log({result})

        this.stats = result
      },
      checkViewedMovie(movieId) {
        return this.viewed_movies.find(viewed_movie => viewed_movie.movieId === movieId)
      },

      //user modifications functions
      modify_username_input() {
        this.modify_username_section = true
        this.icon_modify_username = false
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
        this.icon_modify_image = false
        this.modify_username_section = false
        this.delete_user_section = false
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
        this.icon_modify_username = true
      },
      modifyImage(userId) {
        let modifyImage = new FormData()
        modifyImage.append('imageUrl', this.imageUrl)

        this.$store.dispatch('modifyImage', { modifyImage, userId })
        this.$store.dispatch('getUser')
        this.modify_image_section = !this.modify_image_section
        this.icon_modify_image = true
      },
      no_modify_image_section() {
        this.modify_image_section = false
        this.icon_modify_image = true
      },
      no_modify_username_section() {
        this.modify_username_section = false
        this.icon_modify_username = true
      },

      // user deletion functions
      deleteUser_alert() {
        this.delete_user_section = true
        this.icon_delete_user = false
        this.modify_image_section = false
        this.modify_username_section = false
      },
      no_deleteUser_alert() {
        this.delete_user_section = false
        this.icon_delete_user = true
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
    watch: {
      movies() {
        this.calculate()
      },
      viewed_movies() {
        this.calculate()
      }
    },
    created() {
      this.get_viewed_movies(),
      this.getActors(),
      this.getUser()
    }
  }
</script>

<style scoped>
  .link {
    margin-top: 3rem;
    padding-left: 2rem;
  }
  .link a {
    color: #fff;
  }
  .flexbox {
    display: flex;
  }
  .input {
    width: 70%;
    margin: 2rem auto 0 auto;
    background-color: #0c0c44;
  }
  .input input {
    width: 100%;
  }
  .alert {
    color: #fff;
  }
  #submit_modify_username {
    border-radius: 0px;
  }
  .change_border {
    border-left: none;
    border-top: none;
    border-right: none;
    border-radius: 0px;
  }
  #modify_image_section {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto 0 auto;
  }
  .input_image {
    padding: 0;
    margin: 0 auto;
    flex-direction: row;
  }
  .input_image label {
    margin-bottom: 0;
  }
  #submit_modify_image {
    width: 100%;
    border-radius: 0px;
  }
  #question_delete_user {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 55%;
    background-color: rgba(255, 0, 0, 0.4);
    color: #fff;
    margin: 2rem auto 0 auto;
    padding-left: 0.3rem;
    border-radius: 10px;
    text-align: center;
    transition: 0.5s ease-in-out;
  }
  #question {
    width: 50%;
  }
  .choice_delete {
    width: 25%;
    padding: 0.8rem 0;
    border: 1px solid rgba(255, 0, 0, 0);
    border-radius: 10px;
    cursor: pointer;
  }
  .choice_delete:hover {
    background-color: #0c0c44;
    border: 1px solid rgba(255, 0, 0, 0.4);
    border-radius: 10px;
    transition: 0.5s ease-in-out;
  }
  #actor_choice {
    margin: 2rem 0 2rem 2rem;
  }
  #actor_choice select {
    width: 25%;
    height: 25px;
    margin-left: 1rem;
  }
  #actor_choice select>option {
    font-size: 1.5em;
    color: #0c0c44;
  }
  .show_tables {
    margin: 4rem auto 0 auto;
    padding-bottom: 150px;
  }
  .show_tables table {
    width: 80%;
  }
  .show_tables table:hover img {
    display: block;
  }
  .show_tables table:hover .cancel_array {
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
  .cancel_array {
    position: absolute;
    width: 40px;
    height: 43px;
    left: 8px;
    padding: 0.38rem 0.4rem;
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 10px 0px 0px 10px;
  }
  .cancel_array img {
    display: none;
  }
  #container_arrays {
    margin-left: 1rem;
  }
  .show_tables button {
    margin: 2rem 0 2rem 2rem;
    background-color: #0c0c44;
    border: 1px solid #fff;
    border-radius: 0px;
    transition: 1s ease-in-out;
  }
  .show_tables button:hover {
    background-color: #fff;
    color: #0c0c44;
    transition: 1s ease-in-out;
  }
  .show_tables ul {
    list-style: none;
  }
  .movies_container {
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (min-width: 1200px) {
    #actor_choice select {
      width: 15%;
    }
    #container_arrays {
      display: flex;
    }
    .show_tables {
      width: 50%;
      padding-bottom: 200px;
    }
    button {
      color: #fff;
    }
  }

</style>