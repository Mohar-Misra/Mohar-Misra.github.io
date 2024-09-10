const startButton = document.getElementById('start-btn')
var score = 0;
const scoreinc = document.getElementById('sc')
const paragraph = document.getElementById('para')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  paragraph.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  if (correct){
    score+=1
  }
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    scoreinc.innerText  = 'Score: '  + score  + '/9'
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    paragraph.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'When were the Sustainable Development Goals (SDGs) established?',
    answers: [
      { text: 'The SDGs were established in 2015 by the United Nations', correct: true },
      { text: 'The SDGs were established in 2013 by the United Nations', correct: false }
    ]
  },
  {
    question: 'What are the three primary dimensions that the SDGs aim to address?',
    answers: [
      { text: 'The SDGs aim to address economic growth, social inclusion, and environmental sustainability.', correct: true },
      { text: 'The SDGs aim to address economic downfall, social exclusion, and environmental sustainability.', correct: false}
    ]
  },
  {
    question: 'What is SDG 13 about?',
    answers: [
      { text: 'The SDGs aim to address economic downfall, social polarisation and environmental downfall.', correct: false },
      { text: 'SDG 13 focuses on Climate Action, aiming to reduce greenhouse gas emissions and build resilience to climate change through sustainable approaches.', correct: true },
  
    ]
  },
  {
    question: 'Name two SDGs that focus on social issues.',
    answers: [
      { text: 'SDG 13 and 15', correct: false },
      { text: 'SDG 4 and  5',correct: true }
    ]
  },
  {
    question: 'How do countries monitor progress on the SDGs?',
    answers: [
      { text: 'Countries monitor their progress on the SDGs by making people aware about propaganda and fake reports of conduction.', correct: false },
      { text: 'Countries monitor their progress on the SDGs by setting measurable targets and conducting regular reports to track accountability and highlight areas for improvement.', correct: true }
    ]
  },
  {
    question: ' What is the primary aim of SDG 1?',
    answers: [
      { text: 'The main goal of SDG 1 is to eliminate global warming in its simplest forms in specific areas.', correct: false },
      { text: 'The main goal of SDG 1 is to eliminate poverty in all its forms, everywhere.', correct: true }
    ]
  },
  {
    question: 'How are SDGs interconnected?',
    answers: [
      { text: 'The SDGs are interconnected because progress in one area often positively affects others. For example, reducing poverty can lead to better health outcomes, and climate action can support sustainable development across different sectors.', correct: true },
      { text: 'The SDGs are interconnected because all SDGs have the same goal as SDG 1.', correct: false}
    ]
  },
  {
    question: 'What role does civil society play in achieving the SDGs?',
    answers: [
      { text: 'Civil society plays a crucial role in achieving the SDGs by advocating for policy reforms, ensuring government accountability, and engaging in grassroots activities that promote sustainable development.', correct: true },
      { text: 'Civil society plays a minor role in achieving SDGs by engaging in global warming causes. ', correct: false }
    ]
  },
  {
    question: 'What is the target year for achieving the SDGs?',
    answers: [
      { text: 'The target year for achieving the SDGs is 2050.', correct: false },
      { text: 'The target year for achieving the SDGs is 2030.', correct: true }
    ]
  },

]
