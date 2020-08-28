class Citation {
  constructor() {
      this.currentIndex1 = 0;
      this.currentIndex2 = 0;
      this.currentIndex3 = 0;

      this.rangeSelector = document.getElementById("citation");
      this.rangeActive = document.querySelector(".js-citationValue");
      this.sentenceWrapper = document.getElementById("citationRange");
      this.sentences = document.getElementsByClassName('citation__sentence');

      this.wordsSelection = document.querySelector(".words__wrapper");
      this.citationSelector = document.querySelector(".citation__choice");

      this.rickContent = document.querySelectorAll(".js-elementRick");
      this.mortyContent = document.querySelectorAll(".js-elementMorty");

      this.morty = document.getElementById("profilMorty");
      this.rick = document.getElementById("profilRick");

      ////                  ////
      //  Répliques de Rick  //
      ////                ////

      this.sentenceStartRick = ["Hey ", "Wooooooo ", "BBBuuuurp, ", "Wubadubaleluba ", "Oh merde, ", "Mais non, ", "C'est pas moi ", "Mais qu'est-ce que tu fabriques, "];

      this.sentenceMiddleRick = ["non, ne fais pas ça", "t'es beaucoup trop con morty", "tu vas finir comme ton père", "en réalité tu as été adopté", "si tu continue comme ça", "n'hésites pas à pas hésiter", "bon sang, regarde"];

      this.sentenceEndRick = [" il faut que tu m'oublis maintenant.", " je vais allez couler un bronze.", " raaah mais quel con !", " bordel ! Tu m'as tiré dessus !", " ne t'aventure jamais sur ce sujet...", " c'est comme ça, c'est tout.", " tu veux avoir l'impression d'être important !"];


      ////                   ////
      //  Répliques de Morty  //
      ////                 ////

      this.sentenceStartMorty = ["Dis moi Rick... ", "Trop cool, ", "Super ça, ", "Tu penses que ", "Tu ne comprend pas, ", "Dis moi que c'est une blague ", "Mon bras me fait mal, ", "Comme d'habitude, "];

      this.sentenceMiddleMorty = ["mes parents vont me tuer", "je sent que mes jambes me lache", "c'est normal que je vois double ?", "mon père est un conard", "on pourrait pas partir sur une planète remplis de fille ?", "je peux quand même conduire le vaisseau ?", "ces gens n'ont pas l'air de nous apprécier..."];

      this.sentenceEndMorty = [" je préfère m'enfuir !", " et le pire, c'est que je sais que ce n'est pas normal", " putain, je suis qu'un gamin !", " qu'est-ce qui ne tourne pas rond chez toi Rick ?", " je vais mourir je pense", " la prochaine fois, je choisis !", " je sent quelque chose qui bouge dans mon ventre..."];

      this.bindEvents();
  }
  bindEvents() {

      ////                   ////
      //  Sélection de Morty  //
      ////                 ////

    this.morty.addEventListener("click", () => {

      // Réinitialise les phrases
      this.refreshWords();

      // Cache le contenu de Rick
      this.rickContent.forEach(function(index){
        index.classList.toggle("js-hidden");
      });

      // Affiche la séléction de mot et séléction de phrase
      this.hiddenFunction(this.wordsSelection);
      this.hiddenFunction(this.citationSelector);

      // Boutton qui génére aléatoirement une citation Morty
      document.getElementById("buttonRandom").addEventListener("click", () => {
        for (let item of this.sentences) {
          item.innerHTML = '';
          item.innerHTML = item.innerHTML.concat(
            this.randomWords(this.citationStart, this.sentenceStartMorty),
            this.randomWords(this.citationMiddle, this.sentenceMiddleMorty),
            this.randomWords(this.citationEnd, this.sentenceEndMorty)
          );
        }
      });
    });


      ////                   ////
      //  Sélection de Rick   //
      ////                 ////

    this.rick.addEventListener("click", () => {

      // Réinitialise les phrases
      this.refreshWords();

      // Cache le copntenu de Morty
      this.mortyContent.forEach(function(index){
        index.classList.toggle("js-hidden");
      });

      // Affiche la séléction de mot et séléction de phrase
      this.hiddenFunction(this.wordsSelection);
      this.hiddenFunction(this.citationSelector);
  
      // Boutton qui génére aléatoirement une citation Rick
      document.getElementById("buttonRandom").addEventListener("click", () => {
        for (let item of this.sentences) {
          item.innerHTML = '';
          item.innerHTML = item.innerHTML.concat(
            this.randomWords(this.citationStart, this.sentenceStartRick),
            this.randomWords(this.citationMiddle, this.sentenceMiddleRick),
            this.randomWords(this.citationEnd, this.sentenceEndRick)
          );
        }
      });
    });


    // Input type Range qui va générer le nombre de citation entre 1 et 5
    this.rangeSelector.addEventListener("change", () => {
      var currentSentenceNumber = this.sentenceWrapper.childElementCount;
      var value = Math.floor(this.rangeSelector.value);
      this.rangeActive.innerText = value;
      
      while (value < currentSentenceNumber) {
        // supprimer des citations
        this.sentenceWrapper.removeChild(this.sentenceWrapper.lastChild);
        --currentSentenceNumber;
      }

      while (value > currentSentenceNumber) {
        // Ajoute des citations
        var $p = document.createElement("p");
        $p.classList.add("citation__sentence");
        $p.innerText = "...";
        this.sentenceWrapper.appendChild($p);
        ++currentSentenceNumber;
      }
    });
  }

  // Fonction qui choisis aléatoirement une citation compléte
  randomWords(word, phrase) {
    let tips = phrase; 
    let picked = Math.floor(Math.random() * tips.length);

    return tips[picked];
  };

  // Fonction qui réinitialise une citation lorsqu'on change de personnage
  refreshWords() {
    for (let item of this.sentences) {
      item.innerHTML = '...';
    }
  }

  // Fonction JS qui permet de caché/rendre visible un élément souhaité
  hiddenFunction(zone) {
    zone.classList.toggle("js-hidden");
  };
}
new Citation();