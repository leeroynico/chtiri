// récupération du HTML
const button = document.getElementById("talk");
const card = document.getElementById("card");
const loading = document.getElementById("loading");
const addText = document.getElementById("addText");
const chtiriText = document.getElementById("chtiriText");
//définition des recognition et du speechsynthetis
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const talk = new SpeechSynthesisUtterance();

//cacher la card pour le texte utilisateur et le spinner
loading.style.display = "none";
card.style.display = "none";

//tableau de réponses
let commentçavareponse = [
  "quéche chat peu eute foute",
  "cha pourro aller mieux",
  "et tizote",
];
let bonjourReponse = ["hello biloute", "cha va gamin", "quo de neud"];

//tableau de question utilisateurs (mot clés)
//let bonjour = "salut bonjour hello";

//fonctionalités pour la reconnaissance
function start() {
  recognition.start();
}
button.addEventListener("click", () => {
  start(); //Evites bug en console
});
recognition.onstart = function () {
  loading.style.display = "block";
};
function parlesMoi(message) {
  talk.text = message;
  window.speechSynthesis.speak(talk);
  chargesParams(4);
  const voices = window.speechSynthesis.getVoices();
  talk.voice = voices[4];
  talk.volume = 1;
  talk.rate = 1.2;
  talk.pitch = 1;
}

recognition.onresult = function (event) {
  card.style.display = "block";
  addText.innerHTML = event.results[0][0].transcript;
  let userSentence = event.results[0][0].transcript.toLowerCase();
  //chargesParams();
  let sentencesArray = userSentence.split(" ");
  console.log(sentencesArray);
  if (
    sentencesArray.includes("bonjour") ||
    sentencesArray.includes("hello") ||
    sentencesArray.includes("bonsoir") ||
    sentencesArray.includes("salut")
  ) {
    let reponse =
      bonjourReponse[Math.floor(Math.random() * bonjourReponse.length)];
    parlesMoi(reponse);
    chtiriText.innerHTML = reponse;
  } else if (
    (sentencesArray.includes("ça") && sentencesArray.includes("va")) ||
    sentencesArray.includes("forme")
  ) {
    let reponsecava =
      commentçavareponse[Math.floor(Math.random() * commentçavareponse.length)];
    parlesMoi(reponsecava);
    chtiriText.innerHTML = reponsecava;
  } else {
    let erreur = "j'ai ren compris à sque tu me béfes";
    parlesMoi(erreur);
    chtiriText.innerHTML = erreur;
  }
};

recognition.onaudioend = function () {
  loading.style.display = "none";
};

// réglages pour le speak
function chargesParams() {
  const voices = window.speechSynthesis.getVoices();
  talk.voice = voices[4];
  talk.volume = 1;
  talk.rate = 1.2;
  talk.pitch = 1;
}

/* test
let check = document.getElementById("test");
check.addEventListener("click", () => {
  parlesMoi("bienvenue");
  chargesParams(4);
});*/
