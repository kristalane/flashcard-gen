var basic = require("./BasicCard");
var clozeCard = require("./ClozeCard");
var inquirer = require("inquirer");
var fs = require("fs");

var command = process.argv.slice(2).join(" ");

var questions = [];
var answers = [];

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
    // figure out where to store this. Into an array? or log file?
    // let data = {
    //
    // };
    // question.push(data);
  });
};

function clozeCreate() {
  inquirer.prompt([
    {type: 'input',
    name: 'clozeFull',
    message: 'What is the full statement?'
    },
    {type: 'input',
    name: 'clozeA',
    message: 'OK, now what is the answer?'
    }
  ]).then(function (response) {
    var newCloze = new cloze(response['basicQ'], response['basicA']);
    // figure out where to store this. Into an array? or log file?
    // let data = {
    //
    // };
    // question.push(data);
  });
}

function quizMe() {
  var answer = process.argv.slice(3).join(" ");
  console.log("yay got to quizme");

};

function helpMe() {
  console.log("You must be new here... How about you try one of these commands:" +
  "\n--Type 'study' to be quizzed." +
  "\n--Type 'add' to create new flashcards.");
};

function logData() {
  fs.appendFile("./log.txt", data, function(err) {
    if (err) {
      return console.log(err);
    }
  });
};
