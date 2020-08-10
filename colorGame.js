let numSquares = 6;
let colors = []

let pickedColor;
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.getElementById("message");
let header = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");

init();

// Configuring the reset button
resetButton.addEventListener("click", function() {
    reset();
});

function changeColors(color) {
    //Loop through each square, change their color to match the parameter color
    for (var i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    //Generate a random number from 0..length of color array
    //and return colors[randomly generated index]
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function generateRandomColors(size) {
    let colorArray = []
    for (var i = 0; i < size; i++) {
        colorArray.push(randomColor());
    }
    return colorArray;
}

function randomColor() {
    // Pick red from 0-255
    const redValue = Math.floor(Math.random() * 256);
    // Pick red from 0-255
    const greenValue = Math.floor(Math.random() * 256);
    // Pick red from 0-255\
    const blueValue = Math.floor(Math.random() * 256);
    //Generate the rgb string with generated color values and return it
    return "rgb(" + redValue + ", " + greenValue + ", " + blueValue + ")";
}

// Resets the page
function reset() {
    // Generate new colors
    colors = generateRandomColors(numSquares);
    // Pick a generated color to be the answer
    pickedColor = pickColor();
    // Update the display
    colorDisplay.textContent = pickedColor
    // Update the colors of the squares to reflect the newly generated ones
    for (var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    header.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    this.textContent = "New Colors";
}

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setupSquares() {
    //Apply the colors
    for (var i = 0; i < squares.length; i++) {
        //Add click listeners to squares
        squares[i].addEventListener("click", function() {
            //Get the color of the clicked square
            const clickedColor = this.style.backgroundColor;
            //Compare the clicked color to the winning color
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                header.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play again?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again!";
            }
        });
    }
}
