/*
    Sketch op basis van csdosc-master,
    aangepast voor CSD2C eindopdracht
*/


let client;
let connect;
let x, y;
let touching = false;

function setup() {
    createCanvas(windowWidth < 640 ? windowWidth -18 : 622, windowWidth < 640 ? windowWidth : 480);
    //maak een connect-object aan dat zorgt voor de communicatie met oscServer.js
    connect = new Connect();

    //maak verbinding met oscServer.js, en voer code tussen {} uit zodra deze verbinding tot stand is gekomen.
    connect.connectToServer(function () {
        //maak een nieuwe client-object aan.
        client = new Client();

        //start de client en laat deze berichten sturen naar het ip-adres 127.0.0.1 en poort 9000
        client.startClient("localhost", 7777);
    });

    x = 0;
    y = 0;
}

function draw() {
    background(40, 40, 50, 30);
    //
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        touching = mouseIsPressed;
    } else {
        touching = false;
    }
    //
    drawGrid();
}

// on mouse move (mouseDragged and mousePressed should all trigger mouseMoved)
mouseDragged = () => mouseMoved();
mousePressed = () => mouseMoved();
function mouseMoved() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {

        x = map(mouseX, 0, width, 0, 1);
        y = map(mouseY, 0, height, 0, 1); 

        //stuur een bericht naar het adres /x met als waarde de x-positie van de muis
        client.sendMessage("/x", x);

        //stuur een bericht naar het adres /y met als waarde de y-positie van de muis.
        client.sendMessage("/y", 1-y); // reverse y so 1 is up and 0 is down

    }
}


// set effect switch function
function setEffect(event, effect) {
    // send /effect message
    client.sendMessage("/effect", effect);
    console.log("Set effect to: " + effect);

    // set tab activeness
    let buttons = document.getElementById('switch').childNodes;
    for (let b of buttons) {
        if (b.classList) b.classList.remove("active");
    }
    event.currentTarget.className += " active";
}

const gridSize = 7;

function drawGrid() {
    // i and j as x and y grid
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {

            const pos = {
                x: i * (width/gridSize),
                y: j * (height/gridSize)
            }

            // draw grid lines
            push();
                stroke('#445');
                strokeWeight(2);
                noFill();

                rect(pos.x, pos.y, width/gridSize, height/gridSize);
            pop();

            if (touching) {
                const gridpos = {
                    x: int(x * gridSize),
                    y: int(y * gridSize)
                }
                // draw red squares around mouse/touch position
                if (
                    (gridpos.x-1 == i && gridpos.y == j) ||
                    (gridpos.x+1 == i && gridpos.y == j) ||
                    (gridpos.y-1 == j && gridpos.x == i) ||
                    (gridpos.y+1 == j && gridpos.x == i)
                    ) {
                        push();
                            noStroke();
                            fill('#f33');
                            rect(pos.x, pos.y, width/gridSize, height/gridSize);
                        pop();
                    }
            }

        }
    }
}
