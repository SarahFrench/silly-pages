let score;
let highScoresVisible = false;

document.addEventListener('DOMContentLoaded', function () {
    alert("This works best on a Desktop, and audio doesn't play in Safari because they block loading of audio and video files")

    const TEN_SECONDS_IN_MS = 10000;
    const FIVE_SECONDS_IN_MS = 5000;
    const ONE_SECONDS_IN_MS = 1000;

    let game = {
        firstClick: 0,
        numberOfClicks: 0
    }
    let button = document.getElementById('fart-click');

    button.addEventListener('click', function (event) {
        let fartAudio = document.getElementById('audio-1');
        let omgAudio = document.getElementById('audio-2');
        let scoreElement = document.getElementById('player-score');
        if (game.firstClick === 0) {
            game.firstClick = event.timeStamp;
            game.numberOfClicks++;
            showScoreElements();
            updateScoreElement(game.numberOfClicks, scoreElement);
            swapColour(event.target);
        } else {
            if (event.timeStamp - game.firstClick < FIVE_SECONDS_IN_MS) {
                game.numberOfClicks++;
                updateScoreElement(game.numberOfClicks, scoreElement);
                swapColour(event.target);
            } else if (fartAudio.currentTime === 0) {
                liftOff();
                playAudioWithDelayedRepeat(fartAudio, 600, 300, game.numberOfClicks, omgAudio);
                manageTopFiveScores(game.numberOfClicks);
            }
        }
    })
})

function swapColour(target) {
    target.style.backgroundColor = (target.style.backgroundColor === 'black') ? 'red' : 'black';
}

function liftOff() {
    let groundedSVGPaths = document.getElementsByClassName('grounded');
    let flyingSVGPaths = document.getElementsByClassName('flying');
    for (let i = 0; i < groundedSVGPaths.length; i++) {
        groundedSVGPaths[i].setAttribute('opacity', 0);
    }
    for (let i = 0; i < flyingSVGPaths.length; i++) {
        flyingSVGPaths[i].setAttribute('opacity', 1);
    }

}

function showScoreElements() {
    let elements = document.getElementsByClassName('live-score');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
    }
}

function updateScoreElement(score, scoreElement) {
    scoreElement.innerText = score;
}

function wobbleToilet() {
    //I will never make a function with a better name in my life
    let options = ["rotate(-15 250 350)", "rotate(10 200 500)", "rotate(-20 200 300)", "rotate(-5)"]
    let rotator = document.getElementById('rotator');
    rotator.setAttribute('transform', options[3]);
    setTimeout(function () { rotator.setAttribute('transform', options[0]) }, 100);
    setTimeout(function () { rotator.setAttribute('transform', options[2]) }, 200);
    setTimeout(function () { rotator.setAttribute('transform', options[1]) }, 300);
    setTimeout(function () { rotator.setAttribute('transform', "rotate(0)") }, 400);
}

function playAudioWithDelayedRepeat(repeatAudio, delay, repeatDuration, numberRepeats, finalAudio) {
    let audioPlaying = true
    let callback = function () {
        while (audioPlaying) {
            for (let i = 0; i < numberRepeats; i++) {
                setTimeout(function () {
                    repeatAudio.currentTime = 0.6;
                    repeatAudio.play();
                    wobbleToilet();
                }, (repeatDuration * i));
            }
            audioPlaying = false;
        }
    }

    repeatAudio.playbackRate = 0.5;
    repeatAudio.play();
    setTimeout(callback, delay);
    setTimeout(function () { finalAudio.play(); }, delay + (repeatDuration * numberRepeats));
}