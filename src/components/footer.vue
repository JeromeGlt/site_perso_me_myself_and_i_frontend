<template>
  <div id="footer">
    <div class="laptop_footer">
      <div class="link_container" @click="link_linkedin">
        <img src="../../public/images/linkedin.svg" title ="Lien Linkedin" class="icons"/>
        <p>Mon Linkedin</p>
      </div>
      <div class="link_container" @click="link_github">
        <img src="../../public/images/github.svg" title="Lien Github" class="icons"/>
        <p>Mon Github</p>
      </div>
      <div class="link_container">
        <img src="../../public/images/download.svg" title="Télécharger mon CV" class="icons"/>
        <a href="/docs/CV_jerome_gallot.pdf" download="cv_jerome_gallot">Télécharger mon CV</a>
      </div>
      <div class="link_container">
        <img src="../../public/images/mail.svg" title="Contactez-moi" class="icons"/>
        <a href="mailto:jeromegallot.devweb@gmail.com">Contactez-moi!</a>
      </div>
      <div class="link_container">
        <img src="../../public/images/cinema.svg" title="Découvrez mon backend" class="icons"/>
        <routerLink to="signup">Créez un compte</routerLink>
      </div>
    </div>
    <div class="link_container credits">
      <p>Merci à SumberRejeki, riajulislam, Pixel perfect, Icongeek26 et Freepik pour les icônes.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'footerComponent',
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
  .credits {
    cursor: default;
    font-size: 0.7em;
    color: rgba(250, 250, 250, 0.8)
  }
  #footer {
    background-color: black;
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    #footer {
      height: 100px;
      flex-direction: column;
      justify-content: space-around;
      position: absolute;
      bottom: 0;
    }
    .link_container img {
      margin-left: 0;
    }
    .laptop_footer {
      display: flex;
      justify-content: space-around;
    }
  }
</style>