var basic = require("./BasicCard");
var cloze = require("./ClozeCard");
var inquirer = require("inquirer");

var command = process.argv.slice(2).join(" ");

// if (command === "add basic") {
//   console.log("Would you like to add a new Basic or Cloze flashcard?");
// }
var testing = new basic("Front side question?", "back side answer");

console.log(testing);
//
// function whichCard() {
//
// };
//
// function quizMe() {
//   var answer = process.argv.slice(3).join(" ");
//   if (command === "study") {
//
//   }
// };

// function helpMe() {
//   // if no command after process.argv[1] is entered, run this helper text function that explains which commands do what.
//   // if user enters "study", all the cards already loaded will run. This is defined by quizMe()
//   // if user enters "add", they will be able to make new flashcards. This is defined by addNewCard()
// }
