// Quiz functionality
const questions = [
    {
        question: "In what year did Gerald Ford become President?", // Question text
        options: ["1972", "1973", "1974", "1975"], // Multiple-choice options
        correct: "1974" // Correct answer
    },
    {
        question: "Which President did Gerald Ford succeed?", 
        options: ["John F. Kennedy", "Lyndon B. Johnson", "Richard Nixon", "Jimmy Carter"],
        correct: "Richard Nixon"
    },
    {
        question: "What was Ford's position before becoming President?",
        options: ["Secretary of State", "Vice President", "Speaker of the House", "Senator"],
        correct: "Vice President"
    },
    {
        question: "Where was Gerald Ford born?",
        options: ["Detroit, Michigan", "Omaha, Nebraska", "Des Moines, Iowa", "Chicago, Illinois"],
        correct: "Omaha, Nebraska"
    },
    {
        question: "What university did Ford attend for his undergraduate degree?",
        options: ["Harvard University", "Yale University", "University of Michigan", "Stanford University"],
        correct: "University of Michigan"
    },
    {
        question: "What sport did Ford play in college?",
        options: ["Basketball", "Baseball", "Football", "Track and Field"],
        correct: "Football"
    },
    {
        question: "What was Ford's highest military rank during World War II?",
        options: ["Captain", "Major", "Lieutenant Commander", "Colonel"],
        correct: "Lieutenant Commander"
    }
];

let currentQuestion = 0; // Keeps track of the current question number
let score = 0; // Keeps track of the score

// Function to display the current question and its options
function displayQuestion() {
    if (!document.getElementById('question')) return; // If there is no 'question' element, do nothing

    const questionData = questions[currentQuestion]; // Get the current question data
    document.getElementById('question').textContent = questionData.question; // Display the question
    const optionsHtml = questionData.options.map(option =>
        `<div class="form-check">
            <input class="form-check-input" type="radio" name="quiz" value="${option}" id="${option}">
            <label class="form-check-label" for="${option}">${option}</label>
        </div>`
    ).join(''); // Generate HTML for each option
    document.getElementById('options').innerHTML = optionsHtml; // Display options
    document.getElementById('feedback').style.display = 'none'; // Hide feedback initially
}

// Function to check if the selected answer is correct and provide feedback
function checkAnswer() {
    const selected = document.querySelector('input[name="quiz"]:checked'); // Get the selected answer
    if (!selected) {
        alert("Please select an answer!"); // If no answer is selected, show an alert
        return;
    }

    const feedback = document.getElementById('feedback'); // Get the feedback element
    if (selected.value === questions[currentQuestion].correct) { // Check if the selected answer is correct
        score++; // Increase score if the answer is correct
        feedback.className = 'feedback alert alert-success'; // Show success feedback
        feedback.textContent = 'Correct!';
    } else {
        feedback.className = 'feedback alert alert-danger'; // Show failure feedback
        feedback.textContent = `Incorrect. The correct answer was ${questions[currentQuestion].correct}`;
    }
    feedback.style.display = 'block'; // Display the feedback
    document.getElementById('score').textContent = score; // Update the score display

    setTimeout(() => {
        currentQuestion++; // Move to the next question
        if (currentQuestion < questions.length) {
            displayQuestion(); // If there are more questions, display the next question
        } else {
            // If all questions are answered, display the final result
            document.getElementById('questionContainer').innerHTML = `
                <div class="text-center p-4">
                    <h3 class="mb-4">Quiz Complete!</h3>
                    <div class="final-score mb-4 p-3 bg-light rounded">
                        <h2>${score} out of ${questions.length}</h2>
                        <p>${(score/questions.length*100).toFixed(0)}% Correct</p>
                    </div>
                    <p class="mb-4">${score === questions.length ? 'Perfect! You really know your Gerald Ford history!' : 
                       score >= questions.length/2 ? 'Good job! You know quite a bit about Gerald Ford.' : 
                       'Keep learning more about Gerald Ford\'s fascinating history!'}</p>
                    <button onclick="resetQuiz()" class="btn btn-primary btn-lg">Try Again</button>
                </div>
            `;
        }
    }, 2000); // Wait 2 seconds before moving to the next question
}

// Function to reset the quiz to the initial state
function resetQuiz() {
    currentQuestion = 0; // Reset the current question to the first one
    score = 0; // Reset the score
    document.getElementById('score').textContent = score; // Update the score display
    displayQuestion(); // Display the first question
}

// Record page functionality
const quotes = [
    'I am a Ford, not a Lincoln.',
    'Truth is the glue that holds government together.',
    'Our constitution works. Our great republic is a government of laws, not of men.',
    'History and experience tells us that moral progress comes not in comfortable and complacent times, but out of trial and confusion.',
    'The political lesson of Watergate is this: Never again must America allow an arrogant, elite guard of political adolescents to bypass the regular party organization and dictate the terms of a national election.'
];

// Function to display a random quote
function displayRandomQuote() {
    const quoteElement = document.getElementById('quoteDisplay'); // Get the quote display element
    if (!quoteElement) return; // If there is no quote display element, do nothing

    const randomIndex = Math.floor(Math.random() * quotes.length); // Get a random index for the quotes array
    quoteElement.textContent = `"${quotes[randomIndex]}"`; // Display the selected quote
}

// Function to expand a box when clicked
function expandBox(box) {
    if (!box.classList.contains('expanded')) {
        box.classList.add('expanded'); // Add the 'expanded' class to the box
    }
}

// Function to close a box when the close button is clicked
function closeBox(event, btn) {
    event.stopPropagation(); // Prevent event propagation
    btn.parentElement.classList.remove('expanded'); // Remove the 'expanded' class to close the box
}

// Initialize functions when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('quoteDisplay')) {
        displayRandomQuote(); // Display a random quote when the DOM is loaded
    }
    if (document.getElementById('question')) {
        displayQuestion(); // Display the first question when the DOM is loaded
    }
});
