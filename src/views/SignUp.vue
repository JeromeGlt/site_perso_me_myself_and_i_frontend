<template>
  <div>
    <div>
      <p>Remplissez les deux champs afin de créer votre compte</p>
      <div>
        <label for='username'>Pseudo</label>
        <input type="text" name="username" v-model="username" @input="usernameInput">
        <div v-if="alertUsername">Le pseudo doit contenir entre 5 et 40 caractères. Seuls les lettres, points et tirets sont autorisés</div>
      </div>
      <div>
        <label for='password'>Mot de passe</label>
        <input type="password" name="password" v-model="password" @input="passwordInput">
        <div v-if="alertPassword">Le mot de passe doit contenir entre 8 et 100 caractères dont une minuscule, une majuscule et un chiffre</div>
      </div>
      <p v-if="!this.username || !this.password || alertUsername || alertPassword">Veuillez remplir les deux champs</p>
      <button v-if="this.username && this.password && !alertUsername && !alertPassword" @click="submit">Créer mon compte</button>
      <p >Si vous avez déjà un compte, <router-link to="/login">cliquez ici !</router-link></p>
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
      alertUsername: false,
      alertPassword: false
    }),
    methods: {
      usernameInput() {
        if(/[^a-zA-Z-_.]/i.test(this.username) || this.username.length < 5 || this.username.length > 40) {
          return this.alertUsername = true
        } else {
          this.alertUsername = false
        }
      },
      passwordInput() {
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,100}$/.test(this.password)) {
          return this.alertPassword = true
        } else {
          this.alertPassword = false
        }
      },
      submit() {

        let signupData = {
          username: this.username,
          password: this.password
        }
        console.log(signupData)

        this.$store.dispatch('submitSignup', signupData)
      }
    }
  }
</script>

<style scoped lang='scss'>

</style>