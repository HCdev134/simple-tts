var pop_voices = document.querySelector("#voices-btn");


pop_voices.onclick = function () {


    location.reload(true);

}
// Elements 
var voiceList = document.querySelector("#voicelist");
var tts_input = document.querySelector("#tts");
var tts_button = document.querySelector("#tts-btn");


// TTS API 
var tts_main = window.speechSynthesis;

// Voices Go in this array, which will be used in function getVoices()
var voices = [];


tts_button.addEventListener("click", () => {

    var toSpeak = new SpeechSynthesisUtterance(tts_input.value);
    var selectedOption = voiceList.selectedOptions[0].getAttribute("data-name");
    for(i = 0; i < voices.length ; i++) {
        if(voices[i].name === selectedOption) {
          toSpeak.voice = voices[i];
        }
      }
    //   toSpeak.pitch = pitch.value;
    //   toSpeak.rate = rate.value;
      tts_main.speak(toSpeak);
    
});


getVoices();


if (speechSynthesis == "undefined") {
    speechSynthesis.onvoiceschanged = getVoices;
}
function getVoices() {
    voices = tts_main.getVoices()
    voiceList.innerHTML = "";
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

