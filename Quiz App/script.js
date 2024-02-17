// // Retrieve references to HTML elements
// const questionElement = document.getElementById("question");
// const answerButton = document.getElementById("answer-buttons");
// const nextButton = document.getElementById("next-btn");
// const topicButtons = document.querySelectorAll(".topic-btn")

// let currentIndex = 0; // Keep track of the current question index
// let score = 0; // Store the user's score
// let questions = [];

// async function fetchQuestion() {
//   try {
//     const response = await fetch("questions.json");
//     const data = await response.json();

//     questions = data.flatMap((topic) => topic.questions);
//     startQuiz();
//   } catch (error) {
//     console.error("Error fetching question", error);
//   }
// }

// // Function to start the quiz
// function startQuiz() {
//   currentIndex = 0; // Reset current question index
//   score = 0; // Reset user's score
//   nextButton.innerHTML = "Next"; // Set the text of the next button
//   showQuestion(); // Display the first question
// }

// // Function to display the current question
// function showQuestion() {
//   resetState(); // Reset the state of the quiz UI
//   let currentQuestion = questions[currentIndex]; // Get the current question object
//   let questionNo = currentIndex + 1; // Calculate the question number
//   questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question

//   // Iterate through each answer option for the current question
//   currentQuestion.answers.forEach((answer) => {
//     // Create a button element for each answer option
//     const button = document.createElement("button");
//     button.innerHTML = answer.text; // Set the button text
//     button.classList.add("btn"); // Add a CSS class for styling
//     answerButton.appendChild(button); // Append the button to the answer buttons container
//     if (answer.correct) {
//       button.dataset.correct = answer.correct; // Mark the button as correct using a data attribute
//     }
//     button.addEventListener("click", selectAnswer); // Add a click event listener to the button
//   });
// }

// // Function to reset the state of the quiz UI
// function resetState() {
//   nextButton.style.display = "none"; // Hide the next button
//   while (answerButton.firstChild) {
//     answerButton.removeChild(answerButton.firstChild); // Remove all answer buttons
//   }
// }

// // Function to handle the user's answer selection
// function selectAnswer(e) {
//   const selectBtn = e.target; // Get the selected button element
//   const isCorrect = selectBtn.dataset.correct === "true"; // Check if the selected answer is correct
//   if (isCorrect) {
//     selectBtn.classList.add("correct"); // Add a CSS class to indicate a correct answer
//     score++; // Increment the user's score
//   } else {
//     selectBtn.classList.add("incorrect"); // Add a CSS class to indicate an incorrect answer
//   }

//   // Disable all answer buttons after the user has selected an answer
//   Array.from(answerButton.children).forEach((button) => {
//     button.disabled = true; // Disable the button to prevent further selection
//   });

//   nextButton.style.display = "block"; // Display the next button to proceed to the next question
// }

// // Function to show the final score
// function showScore() {
//   resetState(); // Reset the state of the quiz UI
//   questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // Display the final score
//   nextButton.innerHTML = "Play Again"; // Set the text of the next button to "Play Again"
//   nextButton.style.display = "block"; // Display the next button
// }

// // Function to handle the next button click
// function handleNextButton() {
//   currentIndex++; // Move to the next question
//   if (currentIndex < questions.length) {
//     showQuestion(); // Display the next question
//   } else {
//     showScore(); // Show the final score if all questions have been answered
//   }
// }
// topicButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const selectedTopic = button.textContent;
//     const selectedQuestions = questions.find((topic) => topic.topic === selectedTopic).questions;
//     currentQuestions = [...selectedQuestions];
//     currentIndex = 0;
//     showQuestion(currentIndex);
//   });
// });
// // Event listener for the next button click
// nextButton.addEventListener("click", () => {
//   if (currentIndex < questions.length) {
//     handleNextButton(); // Handle next button click
//   } else {
//     startQuiz(); // Restart the quiz if all questions have been answered
//   }
// });

// fetchQuestion();
// // startQuiz(); // Start the quiz when the page loads

document.addEventListener("DOMContentLoaded", function () {
  const topicButtons = document.querySelectorAll(".topic-btn");
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let currentIndex = 0; // Keep track of the current question index
  let score = 0; // Store the user's score
  let questions = [];

  async function fetchQuestions() {
    try {
      const response = await fetch("questions.json");
      const data = await response.json();
      questions = data;
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  function startQuiz() {
    currentIndex = 0; // Reset current question index
    score = 0; // Reset user's score
    nextButton.innerHTML = "Next"; // Set the text of the next button
    showQuestion(); // Display the first question
  }

  function showQuestion() {
    resetState(); // Reset the state of the quiz UI
    let currentQuestion = questions[currentIndex]; // Get the current question object
    let questionNo = currentIndex + 1; // Calculate the question number
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question

    // Iterate through each answer option for the current question
    currentQuestion.answers.forEach((answer) => {
      // Create a button element for each answer option
      const button = document.createElement("button");
      button.innerHTML = answer.text; // Set the button text
      button.classList.add("btn"); // Add a CSS class for styling
      answerButtons.appendChild(button); // Append the button to the answer buttons container
      if (answer.correct) {
        button.dataset.correct = answer.correct; // Mark the button as correct using a data attribute
      }
      button.addEventListener("click", selectAnswer); // Add a click event listener to the button
    });
  }

  function resetState() {
    nextButton.style.display = "none"; // Hide the next button
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild); // Remove all answer buttons
    }
  }

  function selectAnswer(e) {
    const selectBtn = e.target; // Get the selected button element
    const isCorrect = selectBtn.dataset.correct === "true"; // Check if the selected answer is correct
    if (isCorrect) {
      selectBtn.classList.add("correct"); // Add a CSS class to indicate a correct answer
      score++; // Increment the user's score
    } else {
      selectBtn.classList.add("incorrect"); // Add a CSS class to indicate an incorrect answer
    }

    // Disable all answer buttons after the user has selected an answer
    Array.from(answerButtons.children).forEach((button) => {
      button.disabled = true; // Disable the button to prevent further selection
    });

    nextButton.style.display = "block"; // Display the next button to proceed to the next question
  }

  function handleNextButton() {
    currentIndex++; // Move to the next question
    if (currentIndex < questions.length) {
      showQuestion(); // Display the next question
    } else {
      showScore(); // Show the final score if all questions have been answered
      enableTopicButtons();
    }
  }

  function showScore() {
    resetState(); // Reset the state of the quiz UI
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; // Display the final score
    nextButton.innerHTML = "Play Again"; // Set the text of the next button to "Play Again"
    nextButton.style.display = "block"; // Display the next button
  }
  function enableTopicButtons() {
    // Enable all topic buttons
    topicButtons.forEach((button) => {
      button.disabled = false;
    });
  }
  fetchQuestions();

  // Event listeners for topic buttons
  topicButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedTopic = button.textContent;
      const selectedQuestions = questions.find(
        (topic) => topic.topic === selectedTopic
      ).questions;
      questions = selectedQuestions;
      startQuiz();
    });
  });

  // Event listener for the next button click
  nextButton.addEventListener("click", () => {
    if (currentIndex < questions.length) {
      handleNextButton(); // Handle next button click
    } else {
      startQuiz(); // Restart the quiz if all questions have been answered
    }
  });
});
