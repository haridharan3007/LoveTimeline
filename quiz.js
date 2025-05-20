// Quiz data with correct and incorrect image options

const messageMap =  new Map();
messageMap.set("hari quiz.jpeg","Correct Answer! He is handsome and smart");
messageMap.set("hrithik.jpg","He is beautiful but cant be your soulmate");
messageMap.set("tom cruise.jpg", "He is old not bad but not your type");
messageMap.set("Jake.jpeg","He is hot but unakku set aagadhu");
messageMap.set("SRK.jpg","Seriously ! 😡 he is married and has kids");
messageMap.set("musk.jpg","Nope !");
messageMap.set("teresa.jpg","Nope !");
messageMap.set("will.jpeg","Nope !");
messageMap.set("messi.jpeg","Nope !");
messageMap.set("gayathri quiz.jpeg","Correct Answer! she is the best and sweetest in the world");
const quizData = [
    {
        type: "Multiple Text",
        question: "What qualities do you seek in a soulmate?",
        options: [
            "6 feet",
            "Toxic Behaviour",
            "Explores new things",
            "Anger issues",
            "Foodie",
            "Possesive",
            "Disrespect",
            "Handsome",
            "GasLighting",
            "Smart",
            "Short king",
            "Funny"
        ],
        correctAnswers:[0,2,4,5,7,9,11],
        instruction: "Select all correct answers"
    },
    {
        type: "Text",
        question: "From where do you want your soulmate ?",
        options: [
            "Madurai",
            "Chennai",
            "Coimbatore",
            "Trichy"
        ],
        correctAnswers:[0]
    },
    {
        type: "image",
        question: "Who is the most handsome?",
        correctOption: "hari quiz.jpeg",
        incorrectOptions: [
            "hrithik.jpg",
            "tom cruise.jpg",
            "Jake.jpeg",
            "SRK.jpg"
        ]
    },
    {
        type: "image",
        question: "Who is the best person in the world?",
        correctOption: "gayathri quiz.jpeg",
        incorrectOptions: [
            "will.jpeg",
            "teresa.jpg",
            "messi.jpeg",
            "musk.jpg"
        ]
    }
    // Add more questions as needed
];

// DOM elements
const questionText = document.getElementById('question-text');
// const targetImage = document.getElementById('target-image');
const questionInstruction = document.getElementById('question-instruction');
const optionsContainer = document.getElementById('options');
const textOptionsContainer = document.getElementById('text-options');
const questionNumberElement = document.getElementById('question-number');
// const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let currentOptions = [];
let correctAnswers = [];
let usedIncorrectImages = [];

// Initialize the quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Load current question
function loadQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Update UI
    questionText.textContent = currentQuestion.question;
    // targetImage.src = currentQuestion.targetImage;
    // targetImage.alt = currentQuestion.question;
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}`;
    // scoreElement.textContent = `Score: ${score}`;

    if (currentQuestion.instruction) {
        questionInstruction.textContent = currentQuestion.instruction;
    }
    else{
        questionInstruction.textContent='';
    }
    textOptionsContainer.classList.add('hidden');
    optionsContainer.classList.add('hidden');
    // Prepare options (1 correct + 1 incorrect)
    if(currentQuestion.type === "image")
    {
       const incorrectOption = getRandomIncorrectOption(currentQuestion);
    currentOptions = [
        currentQuestion.correctOption,
        incorrectOption
    ];
    
    // Shuffle options
    currentOptions = shuffleArray(currentOptions);
    usedIncorrectImages = [incorrectOption];
    
    // Display options
    renderOptions();
    optionsContainer.classList.remove('hidden');
    }
    else if (currentQuestion.type === "Multiple Text"){
        // Load text question
        currentOptions = currentQuestion.options;
        correctAnswers = currentQuestion.correctAnswers;
        
        // Display text options
        renderMultipleTextOptions();
        textOptionsContainer.classList.remove('hidden');
    }
    else{
        currentOptions = currentQuestion.options;
        correctAnswers = currentQuestion.correctAnswers;
        
        // Display text options
        renderTextOptions();
        textOptionsContainer.classList.remove('hidden');
    }
}
function renderMultipleTextOptions() {
    textOptionsContainer.innerHTML = '';
    
    currentOptions.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.classList.add('text-option');
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', () => toggleMultipleTextOption(optionElement, index));
        textOptionsContainer.appendChild(optionElement);
    });
}
function renderTextOptions() {
    textOptionsContainer.innerHTML = '';
    
    currentOptions.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = option;
        optionElement.classList.add('text-option');
        optionElement.dataset.index = index;
        optionElement.addEventListener('click', () => toggleTextOption(optionElement, index));
        textOptionsContainer.appendChild(optionElement);
    });
}
function toggleTextOption(optionElement, index) {
    feedbackElement.classList.remove("incorrect");
    feedbackElement.classList.remove("correct");
    if(correctAnswers.indexOf(parseInt(optionElement.dataset.index)) === -1)
    {
      optionElement.classList.add('incorrect');
      feedbackElement.textContent="Nope anga laam ungalukku etha aalu illa!";
      feedbackElement.classList.add("incorrect");
    }
    else{
        optionElement.classList.add('correct');
        optionElement.style.pointerEvents = 'none';
      feedbackElement.textContent="Pattu Mass aah";
      feedbackElement.classList.add("correct");
      correctAnswers.splice(correctAnswers.indexOf(parseInt(optionElement.dataset.index)),1);
    }
    setTimeout(() => {
        resetState();
       }, 2000);
    if(correctAnswers.length === 0)
    {
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 2000);
    }
}
function toggleMultipleTextOption(optionElement, index) {
    feedbackElement.classList.remove("incorrect");
    feedbackElement.classList.remove("correct");
    if(correctAnswers.indexOf(parseInt(optionElement.dataset.index)) === -1)
    {
        optionElement.classList.add('incorrect');
        setTimeout(() => {
        optionElement.classList.add('hidden');
       }, 500);
      feedbackElement.textContent="Nope!";
      feedbackElement.classList.add("incorrect");
    }
    else{
        optionElement.classList.add('correct');
        optionElement.style.pointerEvents = 'none';
      feedbackElement.textContent="Excellent G3";
      feedbackElement.classList.add("correct");
      correctAnswers.splice(correctAnswers.indexOf(parseInt(optionElement.dataset.index)),1);
    }
    setTimeout(() => {
        resetState();
       }, 1000);
    if(correctAnswers.length === 0)
    {
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 2000);
    }
}
// Render option images
function renderOptions() {
    optionsContainer.innerHTML = '';
    
    currentOptions.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option-container');
        optionElement.dataset.option = option;
        
        const img = document.createElement('img');
        img.src = option;
        img.alt = `Option ${index + 1}`;
        img.classList.add('option-img');
        
        optionElement.appendChild(img);
        optionElement.addEventListener('click', () => handleOptionClick(optionElement, option));
        optionsContainer.appendChild(optionElement);
    });
}

// Handle option selection
function handleOptionClick(optionElement, selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctOption;
    
    // Disable all options
    document.querySelectorAll('.option-container').forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    if (isCorrect) {
        // Correct answer
        optionElement.classList.add('correct');
        feedbackElement.textContent = messageMap.get(optionElement.dataset.option);
        feedbackElement.classList.add('correct');
        score++;
        // scoreElement.textContent = `Score: ${score}`;
        
        // Move to next question after delay
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }, 2000);
    } else {
        // Wrong answer
        optionElement.classList.add('incorrect');
        feedbackElement.textContent = messageMap.get(optionElement.dataset.option);
        feedbackElement.classList.add('incorrect');
        
        // Fade out and replace wrong image
        setTimeout(() => {
            optionElement.classList.add('fade-out');
            
            setTimeout(() => {
                replaceWrongOption(optionElement);
            }, 500);
        }, 1500);
    }
}

// Replace wrong option with new random incorrect image
function replaceWrongOption(optionElement) {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Get new incorrect image not already used
    let availableIncorrect = currentQuestion.incorrectOptions.filter(img => 
        !usedIncorrectImages.includes(img)
    );
    if(availableIncorrect.length == 0){
      usedIncorrectImages=[];
      availableIncorrect= currentQuestion.incorrectOptions;
    }
    const newImage = availableIncorrect[Math.floor(Math.random() * availableIncorrect.length)];
    usedIncorrectImages.push(newImage);
    optionElement.classList.remove('incorrect', 'fade-out');
        optionElement.querySelector('img').src = newImage;
        optionElement.dataset.option = newImage;
    feedbackElement.textContent = 'Try again!';
    feedbackElement.classList.remove('incorrect');
    document.querySelectorAll('.option-container').forEach(option => {
             option.style.pointerEvents = 'auto';
          });
}

// Highlight the correct answer
function highlightCorrectAnswer() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.querySelectorAll('.option-container').forEach(option => {
        if (option.dataset.option === currentQuestion.correctOption) {
            option.classList.add('correct');
        }
    });
    
    // Move to next question after delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2500);
}

// Helper functions
function getRandomIncorrectOption(question) {
    return question.incorrectOptions[
        Math.floor(Math.random() * question.incorrectOptions.length)
    ];
}

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function resetState() {
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
    usedIncorrectImages = [];
}

function showResults() {
    resetState();
    window.location.href="match.html";
    sessionStorage.setItem('quizWin','true');
}

const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');
    const openGame = document.getElementById('game');
    const openTimeline = document.getElementById('timeline');
    const openGrievance = document.getElementById('grievance');
    // Open popup
    openGrievance.addEventListener('click', function(event) {
        if(sessionStorage.getItem('quizWin') !== "true"){
            event.preventDefault();
            popup.style.display = 'flex';
        }
    });
    openGame.addEventListener('click', function(event) {
        if(sessionStorage.getItem('quizWin') !== "true"){
            event.preventDefault();
            popup.style.display = 'flex';
        }
    });
    openTimeline.addEventListener('click', function(event) {
        if(sessionStorage.getItem('quizWin') !== "true"){
            event.preventDefault();
            popup.style.display = 'flex';
        }
    });

    // Close popup
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Close when clicking outside content
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            popup.style.display = 'none';
        }
    });
// Initialize the quiz
initQuiz();