const button = document.getElementById("talk");
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let card = document.getElementById("card");
let loading = document.getElementById("loading");
loading.style.display = "none";
card.style.display = "none";
let addText = document.getElementById("addText");
let talk = new SpeechSynthesisUtterance();

let howareyou = ["quéche chat peu eute foute", "quo que ché que che go"];

function start() {
  recognition.start();
}

recognition.onstart = function () {
  loading.style.display = "block";
};
button.addEventListener("click", () => {
  start();
});

recognition.onaudioend = function () {
  loading.style.display = "none";
};

recognition.onresult = function (event) {
  card.style.display = "block";
  addText.innerHTML += event.results[0][0].transcript + "</br>";
  let userSentence = event.results[0][0].transcript.toLowerCase();
  chargesParams();
  let sentencesArray = userSentence.split(" ");
  console.log(sentencesArray);
  if (sentencesArray.includes("salut")) {
    parlesMoi("salut ça va ?");
  } else {
    parlesMoi("j'ai rein compris à sque tu m béfes");
  }
};

// voices qu'on veut = 4
function chargesParams() {
  const voices = window.speechSynthesis.getVoices();
  talk.voice = voices[4];
  talk.volume = 1;
  talk.rate = 1.2;
  talk.pitch = 1;
}

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

/* test
let check = document.getElementById("test");
check.addEventListener("click", () => {
  parlesMoi("bienvenue");
  chargesParams(4);
});*/
