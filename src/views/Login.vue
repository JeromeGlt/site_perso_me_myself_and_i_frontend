<template>
  <div>
    <h1>Me, myself and I</h1>
    <h2 class="rule">Merci de renseigner votre nom d'utilisateur ainsi que votre un mot de passe afin de vous connecter.</h2>
    <div class="form">
      <div class="input">
        <input type="text" name="user_name" v-model="username" placeholder="Pseudo" @focus="clear_alert">
        <div class="alert" v-if="message === 'Username not found'">Nom d'utilisateur introuvable</div>
      </div>
      <div class="input">
        <input type="password" name="user_password" v-model="password" placeholder="Mot de passe" @focus="clear_alert">
        <div class="alert" v-if="message === 'incorrect password'">Mot de passe incorrect</div>
      </div>
      <button v-if="this.username && this.password && !this.message" @click="login">Connexion</button>
      <p v-else class="link">Si vous n'avez pas encore créé de compte, <router-link to='/signup'>cliquez ici.</router-link></p>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'LogIn',
    computed: {
      ...mapState({
        message: state => state.message
      }),
    },
    data: () => ({
      username: '',
      password: ''
    }),
    methods: {
      login() {

        let loginData = {
          username: this.username,
          password: this.password
        }

        this.$store.dispatch('submitLogin', loginData)
      },
      clear_alert() {
        this.$store.commit('UPDATE_MESSAGE', '')
      }
    },
    mounted() {
      this.clear_alert()
    }
  }
</script>

<style scoped lang='scss'>

</style>