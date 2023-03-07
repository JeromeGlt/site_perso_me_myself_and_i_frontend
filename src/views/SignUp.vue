<template>
  <div>
    <div>
      <p>Remplissez les deux champs afin de créer votre compte</p>
      <div>
        <label for='pseudo'>Pseudo</label>
        <input type="text" name="pseudo" v-model="pseudo" @change="pseudoInput">
        <div v-if="alertPseudo">Le pseudo doit contenir entre 5 et 40 caractères. Seuls les lettres, points et tirets sont autorisés</div>
      </div>
      <div>
        <label for='password'>Mot de passe</label>
        <input type="password" name="password" v-model="password" @change="passwordInput">
        <div v-if="alertPassword">Le mot de passe doit contenir entre 8 et 100 caractères dont une minuscule, une majuscule et un chiffre</div>
      </div>
      <p v-if="!this.pseudo || !this.password ||alertPseudo || alertPassword">Veuillez remplir les deux champs</p>
      <button v-if="this.pseudo && this.password && !alertPseudo && !alertPassword" @submit="click">Créer mon compte</button>
      <p >Si vous avez déjà un compte, <router-link to="/login">cliquez ici !</router-link></p>
    </div>
  </div>
</template>

<script>
    // import { mapState } from 'vuex'

  export default {
    name: 'SignUp',
  //     computed: {
  //         ...mapState({
  //             message: state => state.message
  //         }),
  //     },
  //     data: () => ({
  //             pseudo: '',
  //             password: '',
  //             alertEmail: false,
  //             alertPseudo: false,
  //             alertPassword: false
  //     }),
    methods: {
      pseudoInput() {
        if(/[^a-zA-Z-_.]/i.test(this.pseudo)) {
          return this.alertPseudo = true
        } else {
          this.alertPseudo = false
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

  //             let formData = new FormData()
  //             formData.append('pseudo', this.pseudo)
  //             formData.append('password', this.password)
  //             formData.append('imageUrl', this.imageUrl)
  //             formData.append('email', this.email)

        // this.$store.dispatch('submitSignup', formData)
      }
    }
  }
</script>

<style scoped lang='scss'>

</style>