//This function handles the button click on Let's Begin button on the 
//first page that appears for the user. It begins the quiz for the user and
//takes him to the questions page.
function handlesBeginingTheQuiz(){

    $('.start-quiz-button').on("click", function(event){
        
        //stop page from submitting and refreshing automatically
        event.preventDefault();
        console.log("Let's Begin Clicked");
        $('.first-screen').css("display", "none");
        $('.quiz-page').css("display", "block");
    });

}

//This function handles the button click on Submit Answer on the
//question page and taked the user to the answer page
function handlesSubmitAnswer(){

    $('.submit-answer').on("click", function(event){

        event.preventDefault();
        console.log("Submit Answer Clicked");
        $('.quiz-page').css("display", "none");
        $('.quiz-answer').css("display", "block");

    });

}


//This function handles the functionality to continue the quiz
//once the user has seen the answer and proceed to the next question
//if quiz is completed will take the user to the result screen
function handleContinueToNextQuestion(){

    $('.next-question').on("click", function(event){

        event.preventDefault();
        console.log("Continue Button Clicked");
        $('.quiz-answer').css("display", "none");
        $('.quiz-result').css("display", "block");

    });

}

function handleRetakeQuiz(){

    $('.retake').on("click", function(event){

        event.preventDefault();
        console.log("Continue Button Clicked");
        $('.quiz-result').css("display", "none");
        $('.first-screen').css("display", "block");

    });
}

function handleQuizApp(){

    handlesBeginingTheQuiz();
    handlesSubmitAnswer();
    handleContinueToNextQuestion();
    handleRetakeQuiz();
    
}

$(handleQuizApp);