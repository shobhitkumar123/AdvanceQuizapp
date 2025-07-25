const quizData = [
  {
    question: "What is the capital of France?",
    a: "Berlin",
    b: "Madrid",
    c: "Paris",
    d: "Lisbon",
    correct: "c"
  },
  {
    question: "What does HTML stand for?",
    a: "Hyper Text Markup Language",
    b: "Home Tool Markup Language",
    c: "Hyperlinks and Text Markup Language",
    d: "None of the above",
    correct: "a"
  },
  {
    question: "Which company developed JavaScript?",
    a: "Mozilla",
    b: "Netscape",
    c: "Google",
    d: "Microsoft",
    correct: "b"
  },
  // Add more questions for longer quiz support
];

let currentQuiz = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const answerForm = document.getElementById("answer-form");
const resultEl = document.getElementById("result");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const timeDisplay = document.getElementById("time");

function loadQuiz() {
  deselectAnswers();
  resetTimer();

  const currentData = quizData[currentQuiz];
  questionEl.textContent = currentData.question;
  a_text.textContent = currentData.a;
  b_text.textContent = currentData.b;
  c_text.textContent = currentData.c;
  d_text.textContent = currentData.d;
}

function deselectAnswers() {
  const answers = document.querySelectorAll('input[name="answer"]');
  answers.forEach(answer => answer.checked = false);
}

function getSelected() {
  const answers = document.querySelectorAll('input[name="answer"]');
  let selected = undefined;
  answers.forEach(answer => {
    if (answer.checked) selected = answer.value;
  });
  return selected;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timeDisplay.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoSubmit();
    }
  }, 1000);
}

function autoSubmit() {
  const selected = getSelected();
  if (selected && selected === quizData[currentQuiz].correct) {
    score++;
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showResults();
  }
}

function showResults() {
  clearInterval(timer);
  questionEl.innerHTML = `You answered ${score} out of ${quizData.length} questions correctly!`;
  answerForm.style.display = "none";
}

answerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selected = getSelected();
  if (!selected) {
    resultEl.textContent = "Please select an answer.";
    return;
  }
  if (selected === quizData[currentQuiz].correct) {
    score++;
  }
  nextQuestion();
});

loadQuiz();
