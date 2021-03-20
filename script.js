const button = document.getElementById("talk");
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let perroquet = document.getElementById("perroquet");
let loading = document.getElementById("loading");
loading.style.display = "none";
let talk = new SpeechSynthesisUtterance();

recognition.onstart = function () {
  loading.style.display = "block";
};
recognition.onaudioend = function () {
  loading.style.display = "none";
};

recognition.onresult = function (event) {
  perroquet.innerHTML += event.results[0][0].transcript + "</br>";
  let userSentence = event.results[0][0].transcript;
  parlesMoi(userSentence);
};

button.addEventListener("click", () => {
  recognition.start();
});
// voices qu'on veut = 4
function chargesParams(voicesID) {
  const voices = window.speechSynthesis.getVoices();
  talk.voice = voices[voicesId];
  talk.volume = 1;
  talk.rate = 1.2;
  talk.pitch = 1;
}

function parlesMoi(message) {
  talk.text = message;
  window.speechSynthesis.speak(talk);
}

// test
let check = document.getElementById("test");
check.addEventListener("click", () => {
  parlesMoi("bienvenue");
  chargesParams(4);
});
