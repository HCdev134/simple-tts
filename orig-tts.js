$(function () {

  // Elements 
  var voiceList = document.querySelector("#voicelist");
  var tts_input = document.querySelector("#tts");
  var tts_button = document.querySelector("#tts-btn");

  // Range elements 
  var pitch = document.querySelector('#pitch');
  var pitchValue = document.querySelector('.pitch-value');
  var rate = document.querySelector('#rate');
  var rateValue = document.querySelector('.rate-value');
  var pop_voices = document.querySelector("#voices-btn");

  pop_voices.onclick = function () {

    location.reload(true);

  }

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

  // Original Event Listener
  var animRoot = $(".lds-ellipsis");

  // hide animation on page start
  animRoot.hide(); 

  tts_button.addEventListener("click", () => {

    // 
    animRoot.fadeIn(1000).show();
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

      // showcasing small animation same as opacity 
      $("select").css({
        background: "#ccc"
      });


      var toSpeak = new SpeechSynthesisUtterance(tts_input.value);
      toSpeak.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');

        // Style Elements after speech synthesis end
        $("select").css({
          background: "#fff"
        });

        // hide animation after speaking
        animRoot.fadeOut(4000).hide();

        tts_input.style.border = "2px solid #111111";
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


      tts_input.style.border = "2px solid #000000";
      console.log("style changed");
      tts_input.style.opacity = 0.4;
      toSpeak.pitch = pitch.value;
      toSpeak.rate = rate.value;

      console.log("Speaking...");
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
    console.log("is this really whwere its changing");
    speak();
  }



});
