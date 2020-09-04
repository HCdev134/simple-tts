var pop_voices = document.querySelector("#voices-btn");


pop_voices.onclick = function () {


  location.reload(true);

}
// Elements 
var voiceList = document.querySelector("#voicelist");
var tts_input = document.querySelector("#tts");
var tts_button = document.querySelector("#tts-btn");

// Range elements 
var pitch = document.querySelector('#pitch');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');


// Update Slider Value 
pitch, rate;

pitchValue.innerHTML = pitch.value;
rateValue.innerHTML = rate.value;

pitch.oninput = function () {


  console.log(`Pitch Input Adjusted ${this.value}`);
  pitchValue.innerHTML = this.value;
}
rate.oninput = function () {
  console.log(`Rate Input Adjusted ${this.value}`);
  rateValue.innerHTML = this.value;
}

// TTS API , TTS Object Instance 
var tts_main = window.speechSynthesis;

// Voices Go in this array, which will be used in function getVoices()
var voices = [];


tts_button.addEventListener("click", () => {

  //#region old setting with forEach
  // var toSpeak = new SpeechSynthesisUtterance(tts_input.value);
  // var selectedOption = voiceList.selectedOptions[0].getAttribute("data-name");
  // for (i = 0; i < voices.length; i++) {
  //     if (voices[i].name === selectedOption) {
  //         toSpeak.voice = voices[i];
  //     }
  // }
  // //   toSpeak.pitch = pitch.value;
  // //   toSpeak.rate = rate.value;
  // if (tts_input.value == null) {
  //     console.log("condition met input null")
  //     tts_input.style.border = '2px solid #FF0000';
  // }
  // tts_main.speak(toSpeak);
  //#endregion old setting with forEach

  speechSynthesis.getVoices().forEach(function (voice) {
    console.log(voice.name, voice.default ? voice.default : '');
  });
  speak();

});

function speak() {
  if (tts_main.speaking) {

    console.error('speechSynthesis.speaking');
    return;
  }
  if (tts_input.value !== '') {

    var toSpeak = new SpeechSynthesisUtterance(tts_input.value);
    toSpeak.onend = function (event) {
      console.log('SpeechSynthesisUtterance.onend');
      tts_input.style.opacity = 1;
    }
    toSpeak.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceList.selectedOptions[0].getAttribute('data-name');
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        toSpeak.voice = voices[i];
        break;
      }
    }
    tts_input.style.opacity = 0.7;
    toSpeak.pitch = pitch.value;
    toSpeak.rate = rate.value;
    tts_main.speak(toSpeak);
  }
}

getVoices();


if (speechSynthesis == "undefined") {
  speechSynthesis.onvoiceschanged = getVoices;
}

function getVoices() {
  voices = tts_main.getVoices()



  voiceList.innerHTML = "";

  speechSynthesis.getVoices().forEach(function (voice) {
    console.log(voice.name, voice.default ? voice.default : '');
  });
  voices.forEach((voice) => {
    var listItem = document.createElement("option");
    listItem.textContent = voice.name;

    listItem.setAttribute("data-lang", voice.lang);
    listItem.setAttribute("data-name", voice.name);
    console.log(listItem);
    voiceList.appendChild(listItem);
  });

  voiceList.selectedOptions = 0;
}
pitch.onchange = function () {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function () {
  rateValue.textContent = rate.value;
}

voiceList.onchange = function () {
  speak();
}
// #region 2nd call
// document.getElementById("hello-btn").onclick = function speaker() {

//     if (window.speechSynthesis.speaking) {
//         window.speechSynthesis.cancel();
//     }
//     var tts_string_instance = "Here is a string of text"
//     var msg = new SpeechSynthesisUtterance(tts_string_instance);
//     // msg.text = "Hello World"; 
//     window.speechSynthesis.speak(msg);
// }
// #endregion 2nd call 

