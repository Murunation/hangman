//Initial Ref hiij baigaa
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Hariultiin utguud
let options = {
  Жимс: [
    "Apple",
    "Blueberry",
    "Orange",
    "Pineapple",
    "Watermelon",
  ],
  Амьтан: ["Dog", "Cat", "Horse", "Camel", "Sheep", "Zebra"],
  улс: [
    "India",
    "America",
    "Mongolia",
    "Russia",
    "China",
  ],
};

let winCount = 0;
let count = 0;

let chosenWord = "";

//Delgetsen deerh buttonguud
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Сэдэв Сонгох</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Buttong block
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //Songoltiig disable hiih
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //Usegnuudiig disable
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//Vg Generator hiih
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //Button goo todruulh
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //Useg hide hiih
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //Random vg songoh
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();

  //vg replace hiih 
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display span hiih
  userInputSection.innerHTML = displayItem;
};

//Initial Function hiij baigaa togloom shineer ehleh uyd new game button darwal
const initializer = () => {
  winCount = 0;
  count = 0;

  //Initial hij baigaa new game iig darwal ghdee content oo
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //Vseg vvsgeh button
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Ascii toonuud [A-Z]
    button.innerText = String.fromCharCode(i);
    //button towchnii characters
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //herwee array iin darsan vseg n arrayte taarch bwelzuraasiig usger solih
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Баяр хүргэе. Чи яллаа!!</h2><p>The word was <span>${chosenWord}</span></p>`;
              blocker();
            }
          }
        });
      } else { 
        //Hangman ee zurah
        count += 1;
        drawMan(count);
        //6 tai tentsuu bol
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Уучлаарай. Чи хожигдлоо!!</h2><p>The word was <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawLine(10, 130, 130, 130);
    drawLine(10, 10, 10, 131);
    drawLine(10, 10, 70, 10);
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;