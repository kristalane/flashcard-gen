var basic = require("./BasicCard");
var clozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");

var command = process.argv.slice(2).join(" ");

// where I will store data.
var trivia = [];

// here we use a switch to decide where to go next in the program based on user input.
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

  });
}

function quizMe() {
  var count = 0;
  if (count < trivia.length) {
    // loop through array, perhaps using inquirer?
    checkAnswer();
    count++;
  }
  else {
    whatNext();
  }
  quizMe();
};

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

function checkAnswer() {
  var userAnswer = process.argv.slice(3).join(" ");
  if (userAnswer === basicA || cloze) {
    console.log("Yeehaw, you got it right!")
  }
  else { console.log("Whoopsies! That's the wrong answer. The right one is:\n");
  return this.cloze;
  }
};

function helpMe() {
  console.log("You must be new here... How about you try one of these commands:" +
  "\n--Type 'study' to be quizzed." +
  "\n--Type 'add' to create new flashcards.");
};
