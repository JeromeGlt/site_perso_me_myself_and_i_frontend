<template>
  <div>
    <section>
      <h1 class="text-shadow">Me, myself and I</h1>
    </section>
    <showErrors/>
    <div id="jerome_image">
      <img title="photo de Jérôme" src="../../public/images/jerome.jpg"/>
    </div>
    <div class="main_roller">
      <div class="roller">
        <span id="rolltext">Jérôme, 31 ans, développeur web junior<br>
          J'adore faire des tartes aux pommes alsaciennes!<br>
          J'aime bien coder aussi.<br>
          Ça occupe même une bonne partie de mes journées.<br>
          <routerLink class="link_head" to="/signup">Cliquez ici et laissez-vous guider à la découverte d'une de mes passions!</routerLink>
        </span>
      </div>
    </div>
    <div id="my_presentation">
      <div class="rubric" @click="show_text($event)">
        <h2>C'est qui lui ?</h2>
        <div class="container_presentation sentences">
          <p class="presentation">Venant du monde du spectacle, je vois le développement web comme un travail de magicien: on crée les tours un à un, mineucieusement, pour offrir un show à la fin.</p>
          <p class="presentation">Avec des lignes de code, j'ai le pouvoir de donner vie à des idées et c'est ça qui me plaît. Plus je découvre, plus je peux créer et plus j'adore ça.</p>
          <p class="presentation">Que vous cherchiez à créer un site web pour votre entreprise ou votre chat, un blog ou une application, j'en ai l'envie.</p>
        </div>
      </div>
      <div class="rubric" @click="show_text($event)">
        <h2>Son expérience</h2>
        <div class="container_presentation sentences">
          <p class="presentation">J'ai validé une formation de développeur web chez OpenClassrooms avec 7 projets et ai travaillé 9 mois et demi dans une entreprise en tant que dev web.</p>
          <p class="presentation">En plus de maintenir des sites existants, j'y ai géré le développement d'un gros projet. C'était évidemment stressant pour un junior, mais je l'ai amené à terme.</p>
          <p class="presentation">J'ai quitté l'entreprise car la vision du poste ne me correspondait pas ainsi que les technologies utilisées et le salaire.</p>
        </div>
      </div>
      <div class="rubric" @click="show_text($event)">
        <h2>Ses hard skills</h2>
        <div class="container_presentation sentences">
          <p class="presentation">J'ai créé ce site en utilisant Vue.js (avec vuex), un framework que j'affectionne.</p>
          <p class="presentation">Envie de tester mes connaissances en back ?<routerLink class="link_presentation" to="/signup"> C'est ici.</routerLink></p>
          <p class="presentation">J'y ai créé une API REST avec Node.js (Sequelize), l'ORM Express ainsi qu'une base de données MySQL.</p>
          <p class="presentation">J'ai également des notions de JQuery, PHP, Python, Sass, SQL, Mongoose.</p>
        </div>
      </div>
      <div class="rubric" @click="show_text($event)">
        <h2>Ses soft skills</h2>
        <div class="container_presentation sentences">
          <p class="presentation">Je suis perfectionniste. J'aime le code propre, logique.</p>
          <p class="presentation">Je suis organisé. Je sais gérer mes tâches et atteindre mes objectifs.</p>
          <p class="presentation">Je suis curieux. Intéressé par tout ce qui est partagé avec passion, je ne demande qu'à être nourri de nouvelles choses.</p>
        </div>
      </div>
      <div class="rubric" @click="show_text($event)">
        <h2>Sa recherche</h2>
        <div class="container_presentation sentences">
          <p class="presentation">Je cherche un CDI au sein d'une entreprise ouverte et organisée qui me permettra de compléter mes connaissances.</p>
          <p class="presentation">Idéalement, j'aimerais pouvoir coder du back et du front. Je ne souhaite pas choisir entre les deux actuellement. Je veux être le plus complet possible.</p>
          <p class="presentation">Le long terme ne me fait pas peur, au contraire. Construire l'avenir de l'entreprise, mener à bien des projets, c'est ce que je souhaite faire.</p>
        </div>
      </div>
      <div class="rubric" @click="show_text($event)">
        <h2>Ses passions</h2>
        <div class="container_presentation sentences">
          <p class="presentation">Outre un développeur, vous avez affaire à un musicien et à un passionné de cinéma français.</p>
          <p class="presentation">Je vous invite d'ailleurs à aller voir ce que j'ai créé <routerLink class="link_presentation" to="/signup">ici!</routerLink></p>
          <p class="presentation">Nous pouvons ajouter à cela ma chienne qui représente beaucoup pour moi et les balades en nature qui, après quelques heures de code, me font toujours un bien fou.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import showErrors from '../components/error.vue'

  export default {
    name: 'HomePage',
    components: {
      showErrors
    },
    data: () => ({
      innerWidthMobile: false
    }),
    methods: {
      show_text(event) {
        event.target.querySelector('.container_presentation').classList.toggle('show_content')
      }
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
  #my_presentation {
    padding-bottom: 4rem;
  }
  .container_presentation {
    margin-top: 1rem;
    background-color: #fff;
    color: #070761;
    clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
    transition: all ease-in-out 1s;
  }
  h2 {
    margin: 2rem 0 0 1rem;
    font-style: italic;
    cursor: pointer;
    pointer-events: none;
  }
  .show_content {
    padding: 0.1rem 0 0.1rem 0.1rem;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
  .show_content .presentation {
    height: auto !important;
    opacity: 1 !important;
    transition: all 1s;
  }
  .sentences p:nth-child(1)  { transition-delay:  400ms }
  .sentences p:nth-child(2)  { transition-delay:  200ms }
  .sentences p:nth-child(3)  { transition-delay:  600ms }
  .sentences p:nth-child(4)  { transition-delay:  800ms }
  .presentation {
    height: 0px;
    opacity: 0;
    line-height: 25px;
    margin: 1rem 1rem;
    transition: height 1s;
  }
  .link_presentation {
    color: #070761;
    font-weight: bold;
  }
  .link_head {
    color: #fff;
  }

  @media screen and (min-width: 1200px) {
    h2 {
      cursor: default;
    }
    #my_presentation {
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
      margin: 1rem 0 0 3rem;
      padding-bottom: 0;
    }
    .rubric {
      width: 16.6%;
      margin-bottom: 8rem;
    }
  }
</style>