var img;
chosenImage = localStorage.getItem('item--Image');

count = localStorage.getItem('item--Count');
// recogCount = 0;

var Status;

resultsArray = {};

function preload() {
    // img = loadImage('imgs/acSofaVase-3.png');
    if (chosenImage == "acSofa") {
        img = loadImage('imgs/acSofaVase-3.png');
    } else if (chosenImage == "bedroom") {
        img = loadImage('imgs/bedroom-6.png');
    } else if (chosenImage == "desk") {
        img = loadImage('imgs/desk-7.png');
    } else if (chosenImage == "fruitBasket") {
        img = loadImage('imgs/fruitBasket-8.png');
    } else if (chosenImage == "bottles") {
        img = loadImage('imgs/waterBotles-5.png');
    }
}

function setup() {
    canv = createCanvas(476,383);
    document.getElementById('canvHolder').append(canv.elt);

    objectDetector = ml5.objectDetector('cocossd',()=>{
        console.log('model loaded');
        objectDetector.detect(img,(error,results) => {
            if (error) {
                console.error(error);
            } else {
                resultsArray = results;
                Status = true;
            }
        });
    });
    document.getElementById('statusL').innerHTML = 'Status - Detecting Objects'
}

function draw() {
    image(img,0,0,476,383);

    if (Status) {
        if(resultsArray.length > 1){
            document.getElementById('itemsDetectedL').innerHTML = `Out of ${count} objects cocossd has detected ${resultsArray.length} objects.`;
        } else {
            document.getElementById('itemsDetectedL').innerHTML = `Out of ${count} objects cocossd has detected 1 object.`;
        }
        
        for (let i = 0; i < resultsArray.length; i++) {
            const result = resultsArray[i];
            percentage = round(result.confidence * 100)


            fill(255,0,0,);
            stroke(255,0,0);
            text(`${result.label} ${percentage}%`,(result.normalized.x * 476) + 10 , (result.normalized.y * 383) + 20);
            noFill();
            // rect(result.x,result.y,result.width,result.height);
            rect(result.normalized.x * 476,result.normalized.y * 383,result.normalized.width * 476,result.normalized.height * 383);
        }
    }
}