const questions = [
    {
        question: "Which language is used to style a web page?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Python", correct: false },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "Which language is used to add interactivity to a website?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },

    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false },
            { text: "Home Text Markup Language", correct: false }
        ]
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "##", correct: false },
            { text: "<!-- -->", correct: false },
            { text: "**", correct: false }
        ]
    },

    {
        question: "Which one is used to store data in a database?",
        answers: [
            { text: "SQL", correct: true },
            { text: "CSS", correct: false },
            { text: "HTML", correct: false },
            { text: "Photoshop", correct: false }
        ]
    }
];


const questionElement = document.getElementById("question");

const answerButtons = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-btn");

const quizElement = document.getElementById("quiz");

const resultElement = document.getElementById("result");

const scoreElement = document.getElementById("score");


let currentQuestionIndex = 0;

let score = 0;


function startQuiz() {

    currentQuestionIndex = 0;

    score = 0;

    nextButton.innerHTML = "Next";

    showQuestion();

}


function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.innerHTML =
        (currentQuestionIndex + 1) +
        ". " +
        currentQuestion.question;


    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer.text;

        button.classList.add("answer-btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });

}


function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {

        answerButtons.removeChild(answerButtons.firstChild);

    }

}


function selectAnswer(event) {

    const selectedButton = event.target;

    const isCorrect = selectedButton.dataset.correct === "true";


    if (isCorrect) {

        selectedButton.classList.add("correct");

        score++;

    } else {

        selectedButton.classList.add("wrong");

    }


    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {

            button.classList.add("correct");

        }

        button.disabled = true;

    });


    nextButton.style.display = "block";

}


function showScore() {

    quizElement.classList.add("hide");

    resultElement.classList.remove("hide");

    scoreElement.innerHTML =
        "Your score is " +
        score +
        " out of " +
        questions.length;

}


function handleNextButton() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showScore();

    }

}


nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < questions.length) {

        handleNextButton();

    }

});


function restartQuiz() {

    quizElement.classList.remove("hide");

    resultElement.classList.add("hide");

    startQuiz();

}


startQuiz();
