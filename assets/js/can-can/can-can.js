function start() {
  let overlay = document.getElementById('overlay');
  document.body.removeChild(overlay);

  let audio = document.getElementsByTagName('audio')[0];
  audio.play();
}

document.addEventListener('DOMContentLoaded', function () {
  let audio = document.getElementsByTagName('audio')[0];
  let curtain = document.getElementById('curtain');
  let dancers = document.getElementsByClassName('can-can__image');
  audio.addEventListener('timeupdate', function () {
    // console.log(audio.currentTime);
    if (audio.currentTime > 9.5 && audio.currentTime < 11) {
      curtain.classList.add('curtain--up');
      for (let i = 0; i < dancers.length; i++) {
        dancers[i].classList.remove('hidden');
      }
    }
    // 1
    if (audio.currentTime > 20.5 && audio.currentTime < 21.0) {
      swapToSpin(dancers);
    }
    if (audio.currentTime > 22.0 && audio.currentTime < 22.5) {
      swapToDance(dancers);
    }

    // 2
    if (audio.currentTime > 23.5 && audio.currentTime < 24.0) {
      swapToSpin(dancers);
    }
    if (audio.currentTime > 24.6 && audio.currentTime < 26.2) {
      swapToDance(dancers);
    }

    // 3
    if (audio.currentTime > 26.2 && audio.currentTime < 27.0) {
      swapToSpin(dancers);
    }
    if (audio.currentTime > 27.4 && audio.currentTime < 28.6) {
      swapToDance(dancers);
    }

    // 4
    if (audio.currentTime > 28.6 && audio.currentTime < 29.2) {
      swapToSpin(dancers);
    }
    if (audio.currentTime > 30.0 && audio.currentTime < 30.6) {
      swapToDance(dancers);
    }

    if (audio.currentTime > 36.0 && audio.currentTime < 36.5) {
      // correct timing for a big change
      //Need to use boolean to enforce once only, or make upper limit 36.2?
      showCymbals();
    }
    if (audio.currentTime > 36.0) {
      document.body.style.backgroundColor = (document.body.style.backgroundColor == "orange") ? "teal" : "orange";
    }

  })
})

function showCymbals() {
  let cymbals = document.getElementsByClassName('can-can__cymbal--hidden');
  while (cymbals[0]) {
    cymbal = cymbals[0]
    cymbal.classList.remove('can-can__cymbal--hidden');
    cymbal.classList.add('can-can__cymbal--visible');
  }
}

function swapToSpin(dancers) {
  dancers[0].classList.remove('can-can__image--dance')
  dancers[0].classList.add('can-can__image--spin')
  dancers[1].classList.remove('can-can__image--dance')
  dancers[1].classList.add('can-can__image--spin')
  dancers[2].classList.remove('can-can__image--dance')
  dancers[2].classList.add('can-can__image--spin')
  dancers[3].classList.remove('can-can__image--dance')
  dancers[3].classList.add('can-can__image--spin')
}

function swapToDance(dancers) {
  dancers[0].classList.remove('can-can__image--spin')
  dancers[0].classList.add('can-can__image--dance')
  dancers[1].classList.remove('can-can__image--spin')
  dancers[1].classList.add('can-can__image--dance')
  dancers[2].classList.remove('can-can__image--spin')
  dancers[2].classList.add('can-can__image--dance')
  dancers[3].classList.remove('can-can__image--spin')
  dancers[3].classList.add('can-can__image--dance')
}
