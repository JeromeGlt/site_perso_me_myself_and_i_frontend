<template>
  <div>
    <section>
      <h1 class="text-shadow">Me, myself and I</h1>
    </section>
    <div id="jerome_image">
      <img title="photo de Jérôme" src="../../public/images/jerome.jpg"/>
    </div>
    <div class="main_roller">
      <div class="roller">
        <span id="rolltext">Jérôme, 31 ans<br>
          Développeur web junior<br>
          J'adore faire des tartes aux pommes alsaciennes,<br>
          mais pas que! J'aime bien coder aussi.<br>
          Ça occupe même une bonne partie de mes journées.
        </span>
      </div>
    </div>
    <h2>C'est qui lui ?</h2>
    <div class="container_presentation sentences">
      <span class="presentation">Je vois le développement web comme un travail de magicien: on crée les tours un à un mineucieusement pour offrir un spectacle à la fin.</span>
      <span class="presentation">Avec des lignes de code, j'ai le pouvoir de donner vie à des idées et c'est ça qui me plaît.</span>
      <span class="presentation">Que vous cherchiez à créer un site web pour votre entreprise ou votre chat, un blog ou une application, j'en ai l'envie</span>
      <span class="presentation">Je cherche un CDI au sein d'une entreprise ouverte et organisée, qui me permettra de compléter mes connaissances.</span>
      <span class="presentation">Bienvenue dans mon monde !</span>
    </div>
    <h2>Il sait faire quoi ?</h2>
    <div class="container_presentation sentences">
      <span class="presentation">J'ai suivi une formation de développeur web chez OpenClassrooms et ai travaillé 9 mois et demi dans une entreprise en tant que dev web.</span>
      <span class="presentation">J'ai créé ce site en utilisant Vue.js (avec vuex).</span>
      <span class="presentation">Côté back, j'ai utilisé Nodejs avec l'ORM Express et une base de données MySQL. Pourquoi faire?<routerLink class="link_presentation" to="/movies"> Allez voir!</routerLink></span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  components: {
    
  },
  methods: {

    }
}
</script>

<style scoped>

  @keyframes slide {
    0% {
      top: 0;
    }
    10% {
      top: 0;
    }
    32% {
      top: -4rem;    
    }
    54% {
      top: -8rem;
    }
    77% {
      top: -12rem;
    }
    100% {
      top: -16rem;
    }
  }

  section {
    color: #fff;
    text-transform: uppercase;
  }
  .text-shadow {
    font-style: italic;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: #fff;
    -webkit-text-stroke-width: 1px;
    transition: all 0.5s ease-in-out;
    letter-spacing: 0.2em;
  }
  .text-shadow:hover {
    color: #fff;
  }
  #jerome_image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 3rem auto 0 auto;
    overflow: hidden;
  }
  #jerome_image img {
    width: 100%;
  }
  .main_roller{
    width: 100%;  
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .roller{
    height: 5rem;
    line-height: 4rem;
    position: relative;
    overflow: hidden; 
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .roller #rolltext {
    position: absolute;
    top: 0;
    animation: slide 10s infinite;  
  }
  .container_presentation {
    max-height: 0px;
    margin-top: 1rem;
    background-color: rgba(0, 0, 0, 0.4);
    transition: max-height 3s;
  }
  /*.container_presentation:hover span{
    opacity: 1;
  }*/
  span {
    display: block;
  }
  h2 {
    margin: 2rem 0 0 1rem;
    font-style: italic;
  }
  h2:hover + .container_presentation{
    max-height: 500px;
  }
  h2:hover + .container_presentation span {
    opacity: 1;
  }
  .sentences span {
    opacity: 0;
    transition: opacity 1300ms;
  }
  .sentences span:nth-child(1)  { transition-delay:  200ms }
  .sentences span:nth-child(2)  { transition-delay:  400ms }
  .sentences span:nth-child(3)  { transition-delay:  600ms }
  .sentences span:nth-child(4)  { transition-delay:  800ms }
  .sentences span:nth-child(5)  { transition-delay:  1000ms }
  /*.sentences span:nth-child(6)  { transition-delay:  600ms }
  .sentences span:nth-child(7)  { transition-delay:  400ms }
  .sentences span:nth-child(8)  { transition-delay:  900ms }
  .sentences span:nth-child(9)  { transition-delay:  700ms }*/
  .presentation {
    margin: 1rem 2rem 0 2rem;
    line-height: 25px;
  }
  .link_presentation {
    color: #fff;
    font-weight: bold;
  }
</style>