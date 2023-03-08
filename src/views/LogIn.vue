<template>
  <div>
    <div>
      <h1>BIENVENUE</h1>
      <div>
        <label for='username'>Pseudo</label>
        <input type="text" name="user_name" v-model="username">
      </div>
      <div>
        <label for='password'>Mot de passe</label>
        <input type="password" name="user_password" v-model="password">
      </div>
      <p v-if="!this.username || !this.password">Veuillez remplir les champs pour vous connecter</p>
      <button v-if="this.username && this.password" @click="login">Connexion</button>
      <p >Si vous n'avez pas encore créé de compte, <router-link to='/signup'>cliquez ici</router-link> !</p>
      <div v-if="message">{{ message }}</div>
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
      }
    }
  }
</script>

<style scoped lang='scss'>

</style>