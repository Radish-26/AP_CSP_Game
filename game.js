// creates variables 
var presidentNames = getColumn("US Presidents", "President"); var presidentOrder = getColumn("US Presidents", "Presidency"); var userAnswers = [];
var wrongQuestions = [];
var wrongAnswers = [];
var questions = [];
var answers = [];
var questionCurrent = 0;
var slider = getNumber("questionSlider");
//The list of president names and their presidencies are used later in the code to generate // lists of quiz questions and answers
generateQuestions();
questions = shufflequestions(questions, answers)[0];
answers = shufflequestions(questions, answers)[1];
// when the user clicks the start button, they are moved to the next screen onEvent("startchoice", "click", function( ) {
setScreen("questionSelect");
});
onEvent("questionSlider", "input", function() {
slider = getNumber("questionSlider");
console.log(slider);
});
onEvent("startTest", "click", function( ) {
setScreen("test");
setText("questionBox", questions[questionCurrent]);
hideElement("nextQuestion");
});
onEvent("submitQuestion", "click", function( ) { appendItem(userAnswers, getText("userInput")); questionCurrent = questionCurrent +1 ; showElement("nextQuestion");
});
onEvent("nextQuestion", "click", function( ) {
console.log(questionCurrent)); if (questionCurrent == slider) {
console.log(slider);
setScreen("score");
var indexes = checkAnswers(userAnswers, answers)[1];
setText("scoreBox", checkAnswers(userAnswers, answers)[0] + ("/" + slider)); for (var i = 0; i < indexes.length; i++) {
appendItem(wrongAnswers, answers[indexes[i]]);
appendItem(wrongQuestions, questions[indexes[i]]); }
setText("questionsMissed", showincorrectanswers(wrongAnswers, wrongQuestions)); } else {
setText( "questionBox", questions[questionCurrent]);
hideElement("nextQuestion"); }
});
function generateQuestions() {
for (var i = 0; i < 45; i++) {
var Question = ("Who was president number " + presidentOrder[i]);
var Answer = presidentNames[i];
//Creates a question about each president in order and an answer to that question
appendItem(questions, Question);
appendItem(answers, Answer);
//Adds each question and answer to a respective list so that they have a corresponding index
} }
//This function was modified from the Fisher-Yeates shuffle to shuffle the questions //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array function shufflequestions(questionArray, answerArray) {
var currentIndex = questionArray.length, temporaryValue, randomIndex, temporaryValue1;
// While there remain elements to shuffle... while (0 !== currentIndex) {
// Pick a remaining element...
randomIndex = Math.floor(Math.random() * currentIndex); currentIndex -= 1;
// And swap it with the current element
temporaryValue = questionArray[currentIndex];
questionArray[currentIndex] = questionArray[randomIndex];
questionArray[randomIndex] = temporaryValue;
//AnswersArray shuffles in the same way as the questions arrray temporaryValue1 = answerArray[currentIndex];
answerArray[currentIndex] = answerArray[randomIndex];
answerArray[randomIndex] = temporaryValue1;
}
return([questionArray, answerArray]);
}
function showincorrectanswers(incorrectanswerslist, incorrectquestionslist) { var wrongs = "";
for (var i = 0; i < incorrectanswerslist.length; i++) {
wrongs = wrongs + (("\n" + incorrectquestionslist[i]) + (" " + incorrectanswerslist[i])); }
return wrongs ;
}

function checkAnswers(User, Key) {
var score = 0;
var questionsWrong = [];
for (var i = 0; i < User.length; i++) {
if (User[i] == Key[i] ) { score ++;
} else { appendItem(questionsWrong, i);
} }
var total = [score, questionsWrong];
  
return total; }
