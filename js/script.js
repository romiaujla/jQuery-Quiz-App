'use strict';

//This function handles the button click on Let's Begin button on the 
//first page that appears for the user. It begins the quiz for the user and
//takes him to the questions page.
function handlesBeginingTheQuiz(){

    $('.start-quiz-button').on("click", function(event){
        
        //stop page from submitting and refreshing automatically
        event.preventDefault();
        console.log("Let's Begin Clicked");
        
        //hide the current page and make it ready to load the questions
        $('.first-screen').fadeOut(200);











        $('.quiz-page').delay(200).fadeIn(200);
    });

}

//This function handles the button click on Submit Answer on the
//question page and taked the user to the answer page
function handlesSubmitAnswer(){

    $('.submit-answer').on("click", function(event){

        

        event.preventDefault();
        console.log("Submit Answer Clicked");
        $('.quiz-page').fadeOut(200);
        $('.quiz-answer').delay(200).fadeIn(200);

    });

}


//This function handles the functionality to continue the quiz
//once the user has seen the answer and proceed to the next question
//if quiz is completed will take the user to the result screen
function handleContinueToNextQuestion(){

    $('.next-question').on("click", function(event){

        event.preventDefault();
        console.log("Continue Button Clicked");
        $('.quiz-answer').fadeOut(200);
        $('.quiz-result').delay(200).fadeIn(200);

    });

}

//This function will handle the click on the Retake Quiz Button on the result page.
//If the user chooses to Retake the Quiz, he will be taken to the first page
//where the application begins.
function handleRetakeQuiz(){

    $('.retake').on("click", function(event){

        event.preventDefault();
        console.log("Continue Button Clicked");
        $('.quiz-result').fadeOut(200);
        $('.first-screen').delay(200).fadeIn(200);

    });
}

//The handleQuizApp will all the funnctions for handling the user clicks
//and all the Quiz app realted functionality will be called here and this will be the
//main callback function when the page loads. 
function handleQuizApp(){

    handlesBeginingTheQuiz();
    handlesSubmitAnswer();
    handleContinueToNextQuestion();
    handleRetakeQuiz();
    
}

$(handleQuizApp);