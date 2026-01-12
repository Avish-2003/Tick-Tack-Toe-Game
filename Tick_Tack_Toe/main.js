let boxes = document.querySelectorAll('.box');
let btnres = document.querySelector('#reset');
let winner = document.querySelector('.winner');
let btnnew = document.querySelector('#new');

let turn0 = true;
let count = 0;

const winpatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkwinner();

        if (count === 9 && !isWinner) {
            winner.innerText = "It's a Draw!";
            winner.style.backgroundColor = "grey";
            winner.classList.remove("hide");
            disableboxes();
        }
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "white";
    }
};

const resetGame = () => {
    turn0 = true;
    count = 0;             
    enableboxes();
    winner.classList.add("hide");
};

const checkwinner = () => {
    for (let pattern of winpatterns) {
        let pat1 = boxes[pattern[0]].innerText;
        let pat2 = boxes[pattern[1]].innerText;
        let pat3 = boxes[pattern[2]].innerText;

        if (pat1 !== "" && pat2 !== "" && pat3 !== "") {
            if (pat1 === pat2 && pat2 === pat3) {
                winner.innerText = `Congratulations! Player ${pat1} wins!`;
                winner.style.backgroundColor = "green";

                boxes[pattern[0]].style.backgroundColor = "lightgreen";
                boxes[pattern[1]].style.backgroundColor = "lightgreen";
                boxes[pattern[2]].style.backgroundColor = "lightgreen";

                winner.classList.remove("hide");
                disableboxes();
                return true;   
            }
        }
    }
    return false;  
};

btnres.addEventListener("click", resetGame);
btnnew.addEventListener("click", resetGame);
