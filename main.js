var basic = require("./BasicCard");
var clozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");

var command = process.argv.slice(2).join(" ");

// where I will store data.
var trivia = [];

// here we use a switch to decide where to go in the program based on user input.
switch (command) {
  case 'study':
    quizMe();
    break;
  case 'add':
    inquirer.prompt([
      {type: 'rawlist',
      name: 'cardstart',
      message: 'Which type of card would you like to make?',
      choices: ['Basic', 'Cloze']
      }
    ]).then(function (response) {
      if (response['cardstart'] === 'Basic') {
        basicCreate();
      }
      if (response['cardstart'] === 'Cloze') {
        clozeCreate();
      }
    });
    break;
  default:
    helpMe();
}

// function to create basic flashcards using the constructor from BasicCard.js and inquirer for user input.
function basicCreate() {
  inquirer.prompt([
    {type: 'input',
    name: 'basicQ',
    message: 'What is the question?'
    },
    {type: 'input',
    name: 'basicA',
    message: 'OK, now what is the answer?'
    }
  ]).then(function (response) {
    var newBasic = new basic(response['basicQ'], response['basicA']);
    trivia.push(newBasic);
    whatNext();
  });
};

// function to create the cloze card using the constructor defined in ClozeCard.js and inquirer to get input from the user.
function clozeCreate() {
  inquirer.prompt([
    {type: 'input',
    name: 'clozeFull',
    message: 'What is the full statement?'
    },
    {type: 'input',
    name: 'clozePart',
    message: 'OK, now which part of the statement do you want to remove?'
    }
  ]).then(function (data) {
    var newCloze = new clozeCard(data['clozeFull'], data['clozePart']);
    var partial = data['clozeFull'].replace(data['clozePart'], '...');
    trivia.push(newCloze, partial)
    whatNext();
  });
}

// Quizzing function
function quizMe() {
  // for (var i = 0; i < trivia.length; i++) {
  //    this should (in theory) loop through and display each question. Not sure if this will work as expected, since I'm not stopping to get answers. I originally wanted to build a recursive function with inquirer, but have run out of time and thought the loop would be faster.
  //     checkAnswer();
  //   }
  // if (i === trivia.length) {
  //   console.log("You are all out of questions.")
    console.log("This function is not working at the moment.")
    whatNext();
  // }
  // quizMe();
};

// function to check whether the user's answer is correct
function checkAnswer() {
  var userAnswer = process.argv.slice(3).join(" ");
  if (userAnswer === basicA || cloze) {
    console.log("Yeehaw, you got it right!")
  }
  else { console.log("Whoopsies! That's the wrong answer. The right one is:\n");
  return this.cloze;
  }
};

// helper function to keep the program running when called (when another function completes).
function whatNext() {
  inquirer.prompt([
    {type: 'rawlist',
    name: 'whatNext',
    message: 'What do you want to do next?',
    choices: ['Add new basic', 'Add new cloze', 'Quiz']
    }
  ]).then(function(data) {
    if (data['endOfQuiz'] === 'Add new basic') {
      basicCreate();
    }
    if (data['endOfQuiz'] === 'Add new cloze') {
      clozeCreate();
    }
    if (data['endOfQuiz'] === 'Quiz') {
      quizMe();
    }
  });
}

// helper function which is called if user enters an empty string or an unrecognized command.
function helpMe() {
  console.log("You must be new here... How about you try one of these commands:" +
  "\n--Type 'study' to be quizzed." +
  "\n--Type 'add' to create new flashcards.");
};
