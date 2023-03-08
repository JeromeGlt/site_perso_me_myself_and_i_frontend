<template>
  <div>
    <div>
      <h1>Cinéma français</h1>
      <div>
        <p>Vous pouvez créer ici vos tableaux de visionnages</p>
        <p>Voici le mien :</p>
        <p>TABLEAU</p>
      </div>
      <p v-if="!userId">Vous voulez créer le vôtre ? Faut se co et tout</p>
    </div>
    <div v-if="userId">
        Choisissez votre acteur
    </div>
    <div v-if="isAdmin">
        <label></label>
        <input>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'WatchedMovies'
  }
</script>

<style scoped lang='scss'>

</style>