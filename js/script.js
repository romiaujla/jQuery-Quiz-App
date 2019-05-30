'use strict';

//Global Variables 
//questionNum - will hold the current question number, which will be the index for the QUIZDATA
//questionNum will go from 0 to 9.
let questionNum = 0;
//score = will hold the current score and will be incremented every time there is a correct answer
let score = 0;
//userAnswer = will hold the answer selected by the user
let userAnswer = "";

//Returns the HTML to be added to the question page,
//depending on the what question numnber it was
function getQuestion(qNum){
    return ` <div class="top-section" role="question-info">
                <div class="question-num">
                    Question ${qNum+1}/10
                </div>
                <div class="quiz-score">
                    Score ${score}
                </div>
            </div>

            <div class="question">
                ${QUIZDATA[qNum].question}
            </div>
            <form action="" class="quiz-question">
                <fieldset>
                    <label for="option-a" class="options-list-item" id="a">
                    <input type="radio" name="answer-option" id="option-a" value="${QUIZDATA[qNum].options[0]}" required>
                    <span class="option-text">${QUIZDATA[qNum].options[0]}</span>
                    </label>
                    <label for="option-b" class="options-list-item" id="b">
                    <input type="radio" name="answer-option" id="option-b" value="${QUIZDATA[qNum].options[1]}" required>
                    <span class="option-text">${QUIZDATA[qNum].options[1]}</span>
                    </label>
                    <label for="option-c" class="options-list-item" id="c">
                    <input type="radio" name="answer-option" id="option-c" value="${QUIZDATA[qNum].options[2]}" required>
                    <span class="option-text">${QUIZDATA[qNum].options[2]}</span>
                    </label>
                    <label for="option-d" class="options-list-item" id="d">
                    <input type="radio" name="answer-option" id="option-d" value="${QUIZDATA[qNum].options[3]}" required>
                    <span class="option-text">${QUIZDATA[qNum].options[3]}</span>
                    </label>
                    <button type="submit" class="submit-answer app-buttons">Submit Answer</button>
                    <div class="no-selection-error">
                    Error: Please make one selection to proceed to the next question
                    </div>
                </fieldset>
            </form>`;

}

//adds question HTML to the .quiz-page section
function renderQuestion(){
    const question = getQuestion(questionNum);
    $('.quiz-page').html(question);
}


//This function handles the button click on Let's Begin button on the 
//first page that appears for the user. It begins the quiz for the user and
//takes him to the questions page.
function handlesBeginingTheQuiz(){

    $('.start-quiz-button').on("click", function(event){
        
        //stop page from submitting and refreshing automatically
        event.preventDefault();
        
        //hide the current page and then call the renderQuestion to 
        //make the page ready for the question to be asked
        //and fadeIn the question. 
        $('.first-screen').fadeOut(200);
        renderQuestion();
        $('.quiz-page').delay(200).fadeIn(200);
    });

}

//This function toggles the style for the selected input radio button.
//changes the background of the label element so the user is aware
//of what his/her selection is
function handleUserAnswerSelection(){
    
    $('.quiz-page').on("click", "label", function(event){
        if($(this).find('input[type="radio"]').is(':checked')){
            $('.quiz-page label').removeClass('options-list-item-selected');
            $(this).addClass('options-list-item-selected');

            //Sets the the selected answer value as per the users selection
            userAnswer = $(this).find('.option-text').text();
        }
    });
}

//returns HTML text to include on the answer page
function getAnswerText(classTxt){
    return `<h1 class="answer-heading ${classTxt}-answer">
                ${classTxt}
            </h1>
            <div class="answer">
                    ${QUIZDATA[questionNum].answertext}
            </div>
            <button class="next-question app-buttons">Continue</button>`;
}

//This function renders the page depending if the answer is 
//correct or incorrect 
function renderAnswerPage(correct){
    let answerClassName = "correct";
    if(correct){
        $('.quiz-answer').removeClass("incorrect");
        $('.quiz-answer').addClass(answerClassName);
    }else{
        answerClassName = "incorrect";
        $('.quiz-answer').removeClass("correct");
        $('.quiz-answer').addClass(answerClassName);
    }
    const answerPageText = getAnswerText(answerClassName);

    //this will add a correct / incorrect class to get the border for the correct color.
    $('.quiz-answer').html(answerPageText);
    
}

//This function handles the button click on Submit Answer on the
//question page and takes the user to the answer page
//Increments the 'score' if the answer is correct 
function handlesSubmitAnswer(){

    $('.quiz-page').on("submit", "form",function(event){
        
        event.preventDefault();
        let correct = true; 
        $('.quiz-page').fadeOut(200);

        //if the answer is correct increment score
        if(userAnswer === QUIZDATA[questionNum].answer)
        {
            score++;
        }else{
            correct = false;
        }

        //Will render the answer page depending if the user has correct or wrong aswer
        renderAnswerPage(correct);
        $('.quiz-answer').delay(200).fadeIn(200);

    });

}

//Returns the User a Text based on thier performance with the quiz
function resultBasedText(){
    if(score === 0)
        return `Whoaaa!!! Did you do that on Purpose?? <br>
                Why don't you give it a real try this time.`;
    
    if(score >= 1 && score <= 4)
        return `You can definitely do better <br>
                Why not give it another try?`;

    if(score >=5 && score <=7)
        return `You performance was decent <br>
                But there is definitely room for improvement <br>
                Want to try again?`;

    if(score >= 8 && score <=9)
        return `You almost made it to Perfection <br>
                Want to try again to get a perfect 10?`;
    
    if(score === 10)
        return `CONGRATULATIONS !!! You nailed the quiz <br>
                It's a perfet 10 for you. <br>
                Would you like to retake the quiz?`;
}

//setting text for the result page with the 
//score attained by the user.
function getResultText(){
    return `<h1 class="result-heading">You Scored</h1>
                
    </div>
    <div class="overall-score">
        
        <div class="score-circle">
            <p class="score">${score}</p>
            <p class="total-score">10</p>
        </div>
    </div>
    <div class="retake-text">
        ${resultBasedText()}
    </div>
    <button class="retake app-buttons">Retake Quiz</button>`;
}

//add the HTML for hte result page 
function renderQuizResult(){
    const resulText = getResultText();
    $('.quiz-result').html(resulText);
}

//This function handles the functionality to continue the quiz
//once the user has seen the answer and proceed to the next question
//if quiz is completed will take the user to the result screen
function handleContinueToNextQuestion(){

    $('.quiz-answer').on("click", ".next-question", function(event){

        //Increment the questionNum so the next question
        //can be displayed.
        questionNum++;

        event.preventDefault();
        $('.quiz-answer').fadeOut(200);

        //if the questionNum index is less that or equal to 9
        //take the user to the next question else take the user
        //to their quiz result 
        if(questionNum <= 9){
            renderQuestion();
            $('.quiz-page').delay(200).fadeIn(200);
        }else{
            renderQuizResult();
            $('.quiz-result').delay(200).fadeIn(200);
        } 
    });

}

//This function will handle the click on the Retake Quiz Button on the result page.
//If the user chooses to Retake the Quiz, he will be taken to the first page
//where the application begins.
function handleRetakeQuiz(){

    $('.quiz-result').on("click", ".retake", function(event){

        event.preventDefault();
        $('.quiz-result').fadeOut(200);

        // Set Global Values to thier defaults
        questionNum = 0;
        score = 0;
        userAnswer = "";

        //Go to the first screen
        $('.first-screen').delay(200).fadeIn(200);

    });
}


//The handleQuizApp will all the funnctions for handling the user clicks
//and all the Quiz app realted functionality will be called here and this will be the
//main callback function when the page loads. 
function handleQuizApp(){

    handlesBeginingTheQuiz();
    handleUserAnswerSelection();
    handlesSubmitAnswer();
    handleContinueToNextQuestion();
    handleRetakeQuiz();
    
}

$(handleQuizApp);