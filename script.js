const quizData = [
    {
      question: 'Why does a person sitting in a moving bus suddenly move forward when the bus suddenly stops?',
      options: ['Due to inertia', 'Due to brakes', 'Due to negative acceleration', 'Due to the force exerted by the machine'],
      answer: 'Due to inertia',
    },
    {
      question: ' During the neutralization process of base Sodium Hydroxide (NaOH) and acid Hydrochloride (HCl), water (H₂O) and what other substance are produced?',
      options: ['Sodium Fluoride', 'Sodium Chloride', 'Sodium Hydroxide', ' Calcium Sulfate'],
      answer: 'Sodium Chloride',
    },
    {
      question: 'What is the function of the mitochondria in a cell?',
      options: ['Synthesizing proteins', 'Storing genetic information', 'Producing energy (ATP)', ' Regulating cell division'],
      answer: 'Producing energy (ATP)',
    },
    {
      question: 'What is the SI unit of electric current?',
      options: ['Volt', ' Ampere', ' Ohm', ' Watt'],
      answer: 'Ampere',
    },
    {
      question: 'Which of the following metals forms an amalgam with other metals?',
      options: [
        'Tin',
        'Mercury',
        'Lead',
        'Zinc',
      ],
      answer: 'Mercury',
    },
    {
      question: 'Nissl bodies are mainly composed of?',
      options: ['Proteins and lipids', 'DNA and RNA', 'Free Ribosomes and RER', 'Nucleic acids and SER'],
      answer: 'Free Ribosomes and RER',
    },
    {
      question: 'Which part of the  brain is responsible for thermoregulation?',
      options: [
        'Cerebrum',
        'Hypothalamus',
        'Corpus callosum',
        'Medulla oblongata',
      ],
      answer: 'Hypothalamus',
    },
    {
      question: 'Galvanised iron sheets have a coating of?',
      options: ['Lead', 'Chromium', 'Zinc', 'Tin'],
      answer: 'Zinc',
    },
    {
      question: 'The average salinity of water is ?',
      options: [
        '3%',
        '3.5%',
        '2.5%',
        '2%',
      ],
      answer: '3.5%',
    },
    {
      question: 'The property of a substance to absorb moisture from the air on exposure is called?',
      options: ['Osmosis', 'deliquescence', 'efforescence', 'dessication'],
      answer: 'deliquescence',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();
  