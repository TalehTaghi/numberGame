// Dəyişənlər
let attempts;
let maxAttempts;
let correctNumber;
let maxNumber;
let numberInp = document.getElementById("number");
let enterButton = document.getElementById("confirm");
let disappearingElements = document.getElementsByClassName("disappear");

// Köməkçi funksiyalar
function generateRandomNumber(number) {
    return Math.floor(Math.random() * number) + 1;
}

function informUser(attempts, enteredNumber, correctNumber) {
    let current = document.getElementById("currentResult");
    let ending = `${attempts} cəhdiniz qalıb.`;

    if (!(enteredNumber && correctNumber)) current.innerText = ending;
    else if (attempts == 0 && enteredNumber != correctNumber) current.innerText = `Tapmadınız və uduzdunuz!\nDoğru cavab ${correctNumber} idi.`;
    else if (enteredNumber < correctNumber) current.innerText = "Daha böyük ədəd daxil edin. " + ending;
    else if (enteredNumber > correctNumber) current.innerText = "Daha kiçik ədəd daxil edin. " + ending;
    else if (enteredNumber == correctNumber) current.innerText = `Düz tapdınız! ${maxAttempts - attempts} cəhd istifadə etdiniz.`;
}

function gameOver() {
    return correctNumber == numberInp.value || attempts === 0;
}

function startGameAgain() {
    disappearingElements[1].style.display = "block";
    disappearingElements[2].style.display = "flex";

    enterButton.removeAttribute("disabled");
    numberInp.removeAttribute("disabled");
    numberInp.value = "1";
}

function closeTheWindow() {
    document.getElementById("farewell").style.display = "block";

    setTimeout(function () { window.close(); }, 2300);
}

// Əsas funksiyalar
function startGame(button) {
    let condition = document.getElementById("condition");

    document.getElementById("game").style.display = "flex";

    for (let element of disappearingElements) {
        element.style.display = "none";
    }

    if (button.value == "easy") {
        maxAttempts = 3;
        maxNumber = 10;
    }
    else if (button.value == "difficult") {
        maxAttempts = 5;
        maxNumber = 25;
    }

    attempts = maxAttempts;
    condition.innerText = `1-${maxNumber} aralığında ədəd daxil edin:`;
    numberInp.setAttribute("max", maxNumber);
    informUser(attempts, 0, 0);
    correctNumber = generateRandomNumber(maxNumber);
}

function playGame() {
    attempts--;
    informUser(attempts, numberInp.value, correctNumber);

    if (gameOver()) {
        enterButton.setAttribute("disabled", "disabled");
        numberInp.setAttribute("disabled", "disabled");

        document.getElementById("end").style.display = "block";
    }
}

function endGame(button) {
    document.getElementById("game").style.display = "none";
    document.getElementById("end").style.display = "none";

    if (button.value == "yes") startGameAgain();
    else if (button.value == "no") closeTheWindow();
}