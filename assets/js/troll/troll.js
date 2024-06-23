document.addEventListener('DOMContentLoaded', function () {

    let bar = document.getElementById('troll');
    let initiateStepTwo = true;
    const SPEED = 10;

    const stageOne = function (delay) {
        //adjust progress bar value
        setTimeout(function () {
            if (bar.value < 90) {
                bar.value = bar.value + Math.floor(SPEED * Math.random());
            } else {
                bar.value = bar.value * 1.01;
            }

            if (bar.value >= 100 && initiateStepTwo) {
                initiateStepTwo = false;
                stageTwo();
            }
        }, delay)
    };

    const stageTwo = function () {
        //rm progress and add bootstrap spinner in its place
        let el = document.createElement('div');
        el.id = "progress_2";
        el.classList.add('flex-column-centered');
        el.innerHTML = `<div id="spinner-border" class="mb-3" role="status"><span class="sr-only">Loading...</span></div>
    <p>Compiling...</p>`;
        bar.parentNode.parentNode.appendChild(el);
        bar.parentNode.parentNode.removeChild(bar.parentNode);
        setTimeout(function () { el.children[1].innerHTML = '<p> Just a second longer... </p>' }, 3000);
        setTimeout(function () { el.children[1].innerHTML = '<p> ...one more second...</p>' }, 6000);
        setTimeout(function () { el.children[1].innerHTML = '<p> ...until you realise nothing\'s loading</p>' }, 9000);
        setTimeout(function () { stageThree(el); replaceSpinnerWithHeart(); }, 11000);
    };

    const stageThree = function (node) {
        // lol
        let el = document.createElement('p');
        el.classList.add('troll-bar__apology');
        el.innerText = "LOVE YOU XXXXX";
        node.appendChild(el);
    }

    function replaceSpinnerWithHeart() {
        //being cheeky
        const HEART = `<svg id="heart" class="troll-bar__heart" viewBox="0 0 225 225" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#dc3545"  stroke="none" opacity="1" d="M 68.5 31 Q 93.6 33.9 105 50.5 L 112.5 61 Q 119.5 49.5 129.5 41 Q 139.3 32.3 156.5 31 Q 158.2 33.7 164.5 32 L 173.5 35 Q 184.6 39.9 192 48.5 Q 204.8 62.8 204 90.5 L 202 100.5 L 197 113.5 Q 188.1 129.6 174.5 141 L 132.5 173 L 116 188.5 L 112.5 193 L 100.5 180 L 56.5 146 L 39 129.5 Q 30.4 119.6 25 106.5 L 21 90.5 L 21 78.5 L 25 62.5 Q 29.5 50.5 38.5 43 L 51.5 35 L 60.5 32 Q 66.8 33.7 68.5 31 Z "/></svg>`;

        let spinner = document.getElementById('spinner-border');
        let el = document.createElement('div');
        el.innerHTML = HEART;

        spinner.parentNode.insertBefore(el, spinner);
        spinner.parentNode.removeChild(spinner);
    }

    for (let i = 0; i < 1000; i++) {
        //loop that increments progress. Need overkill due to random values used
        if (bar.value < 100) {
            stageOne(i * 1000);
        }
    }

});
