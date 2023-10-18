let startBtn = document.querySelector("#start_game .start"),
    timeSeconds = document.querySelector("header .time .seconds"),
    mainCount = document.querySelector("header .time"),
    showHighscoreBtn = document.querySelector("header .high_score"),
    scoreCard = document.querySelector("#all_done");

let infoGame = document.querySelector("#start_game");

let questionCard = document.querySelector("#question_card"),
    optionsAnswers = document.querySelector("#question_card .answers"),
    question = document.querySelector("#question_card h2"),
    correctIncorrect = document.querySelector("#question_card .check_answer");

let submitScore = document.querySelector("#all_done #submit_score"),
    score = document.querySelector("#all_done #score");

let highscoreCard = document.querySelector("#highscore"),
    scoreList = document.querySelector("#highscore .scores"),
    clearScore = document.querySelector("#highscore .clear_score"),
    goBack = document.querySelector("#highscore .go_back");

let startingSeconds = 100;
let shuffleQuestions, currentQuestion;
let history = [];
//////////////////////////////////////////// Variables /////////////////////////////////////////////////////////////////

const questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts",
        correctAnswer: (index) => {
            if (index === 2) {
                correctIncorrect.innerText = "Correct!";
                setTimeout(() => {
                    nextQuestion();
                }, 400);
            } else {
                correctIncorrect.innerText = "Incorrect!";
                setTimeout(() => {
                    nextQuestion();
                    startingSeconds -= 10;
                }, 400);
            }
        }
    },
    {
        questionText: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above",
        ],
        answer: "4. all of the above",
        correctAnswer: (index) => {
            if (index === 3) {
                correctIncorrect.innerText = "Correct!";
                setTimeout(() => {
                    nextQuestion();
                }, 400);
            } else {
                correctIncorrect.innerText = "Incorrect!";
                setTimeout(() => {
                    nextQuestion();
                    startingSeconds -= 10;
                }, 400);
            }
        }
    },
    {
        questionText:
            "String values must be enclosed within _____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
        answer: "3. quotes",
        correctAnswer: (index) => {
            if (index === 2) {
                correctIncorrect.innerText = "Correct!";
                setTimeout(() => {
                    nextQuestion();
                }, 400);
            } else {
                correctIncorrect.innerText = "Incorrect!";
                setTimeout(() => {
                    nextQuestion();
                    startingSeconds -= 10;
                }, 400);
            }
        }
    },
    {
        questionText:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. JavaScript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log",
        ],
        answer: "4. console.log",
        correctAnswer: (index) => {
            if (index === 3) {
                correctIncorrect.innerText = "Correct!";
                setTimeout(() => {
                    nextQuestion();
                }, 400);
            } else {
                correctIncorrect.innerText = "Incorrect!";
                setTimeout(() => {
                    nextQuestion();
                    startingSeconds -= 10;
                }, 400);
            }
        }
    },
    {
        questionText:
            "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
        options: ["1. break", "2. stop", "3. halt", "4. exit"],
        answer: "1. break",
        correctAnswer: (index) => {
            if (index === 0) {
                correctIncorrect.innerText = "Correct!";
                setTimeout(() => {
                    nextQuestion();
                }, 400);
            } else {
                correctIncorrect.innerText = "Incorrect!";
                setTimeout(() => {
                    nextQuestion();
                    startingSeconds -= 10;
                }, 400);
            }
        }
    },
];

//////////////////////////////////////////////// Questions ////////////////////////////////////////////////////////////////////////


let timer = () => {
    let countDown = setInterval(() => {
        if (startingSeconds > 0) {
            startingSeconds--;
            timeSeconds.innerHTML = startingSeconds
        }
        else {
            clearInterval(countDown);
            questionCard.classList.add("hide")
            scoreCard.classList.remove("hide")
        }
    }, 1000)
}

let generateQuestion = (index = 0) => {
    for (let i = 0; i <= 3; i++) {
        optionsAnswers.innerHTML +=
            `
            <p onClick="questions[${index}].correctAnswer(${i})">${questions[index].options[i]}</p>
        `
    }
}

let clearDom = () => {
    question.innerHTML = "";
    optionsAnswers.innerHTML = "";
    correctIncorrect.innerHTML = "";
}

let nextQuestion = () => {
    clearDom();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        question.innerHTML = questions[currentQuestion].questionText;
        generateQuestion(currentQuestion);
    }
    else {
        questionCard.classList.add("hide");
        scoreCard.classList.remove("hide");
        score.innerHTML = startingSeconds;
        mainCount.innerHTML = "Test Completed!"
    }
}

let startGame = () => {
    clearDom();
    infoGame.classList.add("hide");
    questionCard.classList.remove("hide");
    currentQuestion = 0;

    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    question.innerHTML = questions[currentQuestion].questionText;

    generateQuestion(currentQuestion);
    timer();

}


let generateScoreList = () => {
    scoreList.innerHTML = "";
    for (let i = 0; i < history.length; i++) {
        scoreList.innerHTML +=
            `
            <p><span>${i + 1}. </span> ${history[i].initials} - ${history[i].score}</p>
            `
    }
}


const emptyHightScore = () => history.length = 0;

startBtn.addEventListener("click", startGame)

submitScore.addEventListener("click", (e) => {
    e.preventDefault();
    history.push({
        score: startingSeconds,
        initials: initials.value
    });
    localStorage.setItem("highScore", JSON.stringify(history));
    history = JSON.parse(localStorage.getItem("highScore"));
    scoreCard.classList.add("hide");
    highscoreCard.classList.remove("hide");
    generateScoreList();
});

clearScore.addEventListener("click", () => {
    highscoreCard.classList.add("hide");
    scoreCard.classList.add("hide");
    infoGame.classList.remove("hide");
    localStorage.clear();
    emptyHightScore();
});

goBack.addEventListener("click", () => {
    highscoreCard.classList.add("hide");
    infoGame.classList.remove("hide");
});

showHighscoreBtn.addEventListener("click", () => {
    if (!questionCard.classList.contains("hide") || !scoreCard.classList.contains("hide")) {
        return;
    }
    else {
        highscoreCard.classList.remove("hide");
        infoGame.classList.add("hide");
    }
})


