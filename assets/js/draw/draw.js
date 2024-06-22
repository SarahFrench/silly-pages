document.addEventListener('DOMContentLoaded', function () {
    let brushSize = 10;
    let brushColour = "#000000";

    const brushDial = document.getElementById('brush-size');
    const brushSizeDisplay = document.getElementById('brush-size-display');
    let downloadButton = document.getElementById('download-button');
    let undoButton = document.getElementById('undo-button');

    const colourSwatches = document.getElementsByClassName('draw__colour-swatch');
    for (let i = 0; i < colourSwatches.length; i++) {
        colourSwatches[i].addEventListener('click', function (event) {
            brushColour = event.target.id;
        })
    }

    brushDial.addEventListener('change', function () {
        brushSize = brushDial.value;
        brushSizeDisplay.innerText = brushDial.value;
    })

    downloadButton.addEventListener('click', function () {
        download();
    })

    undoButton.addEventListener('click', function () {
        undo();
    })

    const canvas = document.getElementsByTagName('canvas')[0];
    let context = canvas.getContext('2d');
    let lastVersion = context.getImageData(0, 0, canvas.width, canvas.height);
    let currentlyDrawing = false;


    canvas.addEventListener('mousedown', function (event) {
        currentlyDrawing = true;
        saveUndoState();
        drawWithBrush(event);
    })
    canvas.addEventListener('mousemove', function (event) {
        if (currentlyDrawing) {
            drawWithBrush(event);
        }
    })
    canvas.addEventListener('mouseup', function (event) {
        currentlyDrawing = false;
    })

    function drawWithBrush(event) {
        // set brush position, based on mouse and take canvas offset into account
        let brushX = (event.x - (brushSize / 2) - canvas.offsetLeft)
        let brushY = (event.y - (brushSize / 2) - canvas.offsetTop)

        //create the brushstroke on the canvas
        context.beginPath();
        context.arc(brushX, brushY, brushSize, 0, 360);
        context.strokeStyle = brushColour;
        context.fillStyle = brushColour;
        context.fill();
        context.stroke();
        context.closePath();
    }

    function undo() {
        context.putImageData(lastVersion, 0, 0);
    }

    function saveUndoState() {
        lastVersion = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    function download() {
        let data = canvas.toDataURL();
        downloadButton.href = data;
        downloadButton.download = "mypainting.png";

    }

})

// function saveNewDrawing() {
//     let title = document.getElementById('image-title').value;
//     let description = document.getElementById('image-description').value;
//     let imageData = document.getElementsByTagName('canvas')[0].toDataURL();

//     let response = POSTRequest(title, description, imageData);

//     response.then(json => {
//         let date = new Date;
//         let time = `${date.getHours()}:${date.getMinutes()}`;
//         if (!jsonIsError(json)) {
//             document.getElementById('drawing-save-feedback').innerText = `Image saved at ${time}!`;
//         } else if (json.base64_png[0] === "can't be blank") {
//             document.getElementById('drawing-save-feedback').innerText = `You can't save a blank image!`;
//         } else {
//             document.getElementById('drawing-save-feedback').innerText = `Something went wrong with the save at ${time}!`;
//         }
//     }).catch(err => {
//         document.getElementById('drawing-save-feedback').innerText = `Something went wrong, there was an error`;
//     })
// }


function jsonIsError(json) {
    return (
        (json.title === undefined || json.description === undefined || json.base64_png === undefined)
    )
}


async function POSTRequest(title, description, imageData) {
    let csrfToken = document.querySelectorAll('meta[name=csrf-token]')[0].content;

    const response = await fetch('/drawings.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 'X-CSRF-Token': `${csrfToken}`
        },
        body: `{"drawing":{"title":"${title}", "description":"${description}", "base64_png":"${imageData}"}}`
    });

    return await response.json();
}
