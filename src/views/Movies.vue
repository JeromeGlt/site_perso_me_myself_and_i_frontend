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
        <p>Par exemple, voici mes visionnages de la filmographie de Gérard Depardieu:</p>
      </div>
      <table class="table">
        <tr>
          <td>Décennies</td>
          <td>Films tournés</td>
          <td>Films vus</td>
        </tr>
        <tr>
          <td>Années 70</td>
          <td>37</td>
          <td>32 - 86%</td>
        </tr>
        <tr>
          <td>Années 80</td>
          <td>29</td>
          <td>26 - 90%</td>
        </tr>
        <tr>
          <td>Années 90</td>
          <td>31</td>
          <td>26 - 84%</td>
        </tr>
        <tr>
          <td>Années 2000</td>
          <td>50</td>
          <td>37 - 74%</td>
        </tr>
        <tr>
          <td>Années 2010</td>
          <td>44</td>
          <td>28 - 63%</td>
        </tr>
        <tr>
          <td>Années 2020</td>
          <td>10</td>
          <td>8 - 80%</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>201</td>
          <td>157 - 78%</td>
        </tr>
      </table>
      <p class="link" v-if="!userId_url">Vous voulez créer les vôtres ? <router-link to="/login">Connectez-vous</router-link> ou <router-link to="/signup">créez un compte</router-link>.</p>
    </div>

    <!-- Select pour choisir l'acteur -->
    <div v-if="userId_url" id="actor_choice">
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

    <!-- Affichage des tableaux -->
    <div id="container_arrays">
      <!-- Tableau Belmondo -->
      <div v-if="array_belmondo" class="show_tables" >
        <table class="table">
          <h3>Belmondo</h3>
          <div class="cancel_array">
            <img class="icons" src="../../public/images/delete.svg" title="Fermer le tableau" @click="close_belmondo"/>
          </div>
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
        <!-- films Belmondo -->
        <div class="movies_container">
          <ul>
            <li v-for="movie in movies_belmondo" :key="movie.title">
              <showMovies :movieData="movie" :calculate="this.calculate_belmondo()"/>
            </li>
          </ul>
        </div>
      </div>
      <!-- Tableau Clavier -->
      <div v-if="array_clavier" class="show_tables">
        <table class="table">
          <h3>Clavier</h3>
          <div class="cancel_array">
            <img class="icons" src="../../public/images/delete.svg" title="Fermer le tableau" @click="close_clavier"/>
          </div>
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
        <!-- films Clavier -->
        <div class="movies_container">
          <ul>
            <li v-for="movie in movies_clavier" :key="movie.title">
              <showMovies :movieData="movie" :calculate="this.calculate_clavier()"/>
            </li>
          </ul>
        </div>
      </div> 
    </div>
    <footerComponent/>
  </div>
</template>

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
    margin-top: 4rem;
  }
  .show_tables table {
    width: 80%;
    margin-left: 2rem;
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
    left: -40px;
    padding: 0.38rem 0.4rem;
    border: 1px solid rgba(255, 255, 255, 0);
    border-radius: 10px 0px 0px 10px;
  }
  .cancel_array img {
    display: none;
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
    margin-left: 2rem;
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
    }
    button {
      color: #fff;
    }
  }

</style>

<script>
  import { mapState } from 'vuex'
  import showMovies from '../components/showMovies.vue'
  import footerComponent from '../components/footer.vue'

  export default {
    name: 'WatchedMovies',
    components: {
      showMovies,
      footerComponent
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
      userId_url:'',
      icon_modify_username: true,
      modify_username_section: false,
      icon_modify_image: true,
      modify_image_section: false,
      icon_delete_user: true,
      delete_user_section: false,
      alertUsername: false,
      array_belmondo: false,
      array_clavier: false,
      imageUrl_modify: '',
      actor: '',
      title: '',
      director: '',
      year: null,
      decade: null,

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
      total_percent_clavier: 0
    }),
    methods: {

      // get functions
      getUser() {
        this.$store.dispatch('getUser')
      },
      get_viewed_movies() {

        let url = window.location.href.split('http://localhost:8080/#/movies/')

        this.userId_url = url[1]

        this.$store.dispatch('verification_user_id', this.userId_url)
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
    created() {
      this.get_viewed_movies(),
      this.getUser()
    }
  }
</script>

