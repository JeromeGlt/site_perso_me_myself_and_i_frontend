<template>
  <div>
    <h1>Me, myself and I</h1>
    <p id="rule_signup">Remplissez les deux champs et ajoutez une image afin de créer votre compte.</p>
    <div class="form">
      <div class="input">
        <input type="text" name="username" v-model="username" @input="usernameInput" @focus="clear_alert" placeholder="Pseudo">
        <div class="alert" v-if="alertUsername">Le pseudo doit contenir entre 5 et 40 caractères. Seuls les lettres, points et tirets sont autorisés.</div>
      </div>
      <div class="input">
        <input type="password" name="password" v-model="password" @input="passwordInput" placeholder="Mot de passe">
        <div class="alert" v-if="alertPassword">Le mot de passe doit contenir entre 8 et 100 caractères dont une minuscule, une majuscule et un chiffre.</div>
      </div>
      <div class="input_image">
        <label>Choisir une image...
          <input type="file" name="imageUrl" @change="uploadFile($event)" @unfocus="verification_image">
        </label>
      </div>
      <p class="alert" v-if="this.message">Pseudo déjà utilisé</p>
      <button id="submit_signup" v-if="this.username && this.password && this.imageUrl && !alertUsername && !alertPassword" @click="submit">Créer mon compte</button>
      <p class="link">Si vous avez déjà un compte, <router-link to="/login">cliquez ici !</router-link></p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'SignUp',
    computed: {
      ...mapState({
        message: state => state.message
      }),
    },
    data: () => ({
      username: '',
      password: '',
      imageUrl: '',
      alertUsername: false,
      alertPassword: false
    }),
    methods: {
      usernameInput() {
        if(/[^a-zA-Z-.âàäçéêèëîïôöûü]/i.test(this.username) || this.username.length < 5 || this.username.length > 40) {
          return this.alertUsername = true
        } else {
          this.alertUsername = false
        }
      },
      passwordInput() {
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z-_.!?,;:^"'()=+ç@âàäçéêèëîïôöûü\d]{8,100}$/.test(this.password)) {
          return this.alertPassword = true
        } else {
          this.alertPassword = false
        }
      },
      clear_alert() {
        this.$store.commit('UPDATE_MESSAGE', '')
      },
      submit() {

        let signupData = new FormData()
        signupData.append('username', this.username)
        signupData.append('password', this.password)
        signupData.append('imageUrl', this.imageUrl)

        console.log(signupData)

        this.$store.dispatch('submitSignup', signupData)
      },
      uploadFile(event) {
        this.imageUrl = event.target.files[0]
      }
    }
  }
</script>

<style scoped>
  #rule_signup {
    margin-top: 2rem;
    text-align: center;
  }

  #submit_signup {
    margin-top: 1rem;
  }

</style>