<template>
  <router-view/>
  <footer>
    <div class="link_container" @click="link_linkedin">
      <img src="../public/images/linkedin.svg" title ="Lien Linkedin" class="icons"/>
      <p>Mon Linkedin</p>
    </div>
    <div class="link_container" @click="link_github">
      <img src="../public/images/github.svg" title="Lien Github" class="icons"/>
      <p>Mon Github</p>
    </div>
    <div class="link_container">
      <img src="../public/images/download.svg" title="Télécharger mon CV" class="icons"/>
      <a href="/docs/cv_jerome_gallot.pdf" download="cv_jerome_gallot">Télécharger mon CV</a>
    </div>
    <div class="link_container">
      <img src="../public/images/mail.svg" title="Contactez-moi" class="icons"/>
      <a href="mailto:jeromegallot.devweb@gmail.com">Contactez-moi !</a>
    </div>
  </footer>
</template>

<script>
  import './assets/style/style.css'
  export default {
    name: 'App',
    methods: {
      link_linkedin() {
        window.open('https://www.linkedin.com/in/jérôme-gallot/')
      },
      link_github() {
        window.open('https://github.com/JeromeGlt')
      }
    }
  }
</script>

<style scoped>
  a {
    color: #fff;
  }
  a:visited {
    color: #fff;
  }
  .link_container {
    height: 50px;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .link_container img{
    margin: 1rem;
  }
  .link_container p {
    margin-left: 0.5rem;
  }

  @media screen and (min-width: 1200px) {
    footer {
      width: 100%;
      height: 100px;
      flex-direction: row;
      justify-content: space-around;
      position: fixed;
      bottom: 0px;
      z-index: -1;
    }
    .link_container img {
      margin-left: 0;
    }
  }
</style>
