let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let message = document.querySelector("#message");
let newBtn = document.querySelector("#new-btn");

let turnX = true; // playerX, playerY
let isWinner = false; // any player won?
let count = 0; // to keep track of boxes clicked.

// player can win in below patterns.
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // only play if box is empty and nobody wins.
        if (box.innerHTML === "" && !isWinner) {
            // X turn
            if (turnX) {
                box.style.color = "#b0413e";
                box.innerHTML = "X";
                turnX = false;
            }
            // O turn
            else {
                box.style.color = "#fdd835";
                box.innerHTML = "O";
                turnX = true;
            }

            // check if any player win.
            checkWinner();
        }
    });
});

// Reset the game.
resetBtn.addEventListener("click", () => {
    boxes.forEach(box => box.innerHTML = "");
    message.innerHTML = "";
    turnX = true;
    isWinner = false;
    count = 0;
});

// New game (reloads the page)
newBtn.addEventListener("click", () => {
    location.reload();
});

// check winner.
const checkWinner = () => {
    count++;

    // all boxes marked still no winner.
    if (count == 9) {
        message.innerHTML = "Game Tied!";
        resetBtn.classList.add("hide");
        newBtn.classList.remove("hide");
    }

    for (pattern of winPatterns) {
        const pos1Val = boxes[pattern[0]].innerHTML;
        const pos2Val = boxes[pattern[1]].innerHTML;
        const pos3Val = boxes[pattern[2]].innerHTML;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                message.innerHTML = `${pos1Val} Wins!`;
                resetBtn.classList.add("hide");
                newBtn.classList.remove("hide");
                isWinner = true;
            }
        }
    }
};
