const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const retryButton = document.getElementById("retry-btn");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=18&type=multiple"
  );
  const data = await response.json();
  questions = data.results;
  startQuiz();
}

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  scoreContainer.classList.remove("active");
  quizContainer.classList.add("active");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  const answers = [...currentQuestion.incorrect_answers];
  answers.splice(
    Math.floor(Math.random() * (answers.length + 1)),
    0,
    currentQuestion.correct_answer
  );

  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answer-btn");
    button.addEventListener("click", () =>
      selectAnswer(button, currentQuestion.correct_answer)
    );
    answersElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  answersElement.innerHTML = "";
}

function selectAnswer(button, correctAnswer) {
  const isCorrect = button.innerText === correctAnswer;
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
    Array.from(answersElement.children).forEach((btn) => {
      if (btn.innerText === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }
  Array.from(answersElement.children).forEach((btn) => (btn.disabled = true));
  nextButton.classList.remove("hide");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  quizContainer.classList.remove("active");
  scoreContainer.classList.add("active");
  scoreElement.innerText = `Your score: ${score} / ${questions.length}`;
}

retryButton.addEventListener("click", fetchQuestions);

fetchQuestions();
