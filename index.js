const inquirer = require('inquirer');
const jest = require('jest');
const chalk = require('chalk');
const fs = require('fs');

const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const employeeArray = []

//seting the for loop to loop the selections after making an employee
const HTML = (employeeArray) => {
  var employeeHtml = "";
  for (i = 0; i < employeeArray.length; i++) {
    if (employeeArray[i].getRole() === 'Manager') {
      employeeHtml = employeeHtml + `
      <div class="card managerCard">
            <div class="card-content">
              <div class="content">
                <section class = "topOfCard">  
                  <h2>${employeeArray[i].getRole()}</h2>
                  <a href="#"><h3>${employeeArray[i].getName()}</h3></a>
               <ul> </section>
                
                <hr>
                  <li> ID: ${[employeeArray[i].getId()]}</li>
                  <li> Email: <a href="mailto:${employeeArray[i].getEmail()}" target = "_blank">${employeeArray[i].getEmail()}</a></li>
                  <li> Office #: ${employeeArray[i].getOfficeNumber()}</li>
                </ul>
              </div>
            </div>
          </div>
          `
//set the html for engineer
    } else if (employeeArray[i].getRole() === 'Engineer') {
      employeeHtml = employeeHtml + `
      <div class="card roleCardEngin">
            <div class="card-content">
              <div class="content">
                <section class = "topOfCard">  
                  
                  <a href="#"><h2>${employeeArray[i].getName()}</h2></a>
                  <h3>${employeeArray[i].getRole()}</h3>
                </section><hr>
                <ul>
                  <li> ID: ${[employeeArray[i].getId()]}</li>  
                  <li> Email: <a href="mailto:${employeeArray[i].getEmail()}" target = "_blank">${employeeArray[i].getEmail()}</a></li>
                  <li> Github: <a href="https://github.com/${employeeArray[i].getgitHub()}" target = "_blank">${employeeArray[i].getgitHub()}</a></li>
                </ul>
              </div>
            </div>
          </div>
          `


//set the html for intern
    } else if (employeeArray[i].getRole() === 'Intern') {
      employeeHtml = employeeHtml + `
      <div class="card roleCardIntern">
            <div class="card-content">
              <div class="content">
                <section class = "topOfCard">  
                  <a href="#"><h2>${employeeArray[i].getName()}</h2></a>
                  <h3>${employeeArray[i].getRole()}</h3>
                </section>
                <hr>
                <ul>
                  <li> ID: ${[employeeArray[i].getId()]}</li>
                  <li> Email: <a href="mailto:${employeeArray[i].getEmail()}" target = "_blank">${employeeArray[i].getEmail()}</a></li>
                  <li> Office #: ${employeeArray[i].getSchool()}</li>
                </ul>
              </div>
            </div>
          </div>
          `
    }
  };

//the starting code for html
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <link rel="stylesheet" href="./assets/style.css">
        <title>Document</title>
    </head>
    <body>
        <h1 class="box topBar">Employees</h1>
    
        <section class="container is-fluid">
        ${employeeHtml}
        </section>
    </body>
    </html>`
}



//display style for terminal to use when creating the roles
inquirer.prompt([
  {
    type: "input",
    message: chalk.red.underline('What is your username?\n'),
    name: "username",
  }, {
    type: "input",
    message: chalk.red.underline('What is your email?\n'),
    name: "email",
  }, {
    type: "input",
    message: chalk.red.underline('What is your employee ID?\n'),
    name: "employeeId",
  }, {
    type: "input",
    message: chalk.red.underline('What is your office number?\n'),
    name: "officeNumber",
  }])

  //set the answers
  .then(answers => {
    const newManager = new Manager(answers.username, answers.employeeId, answers.email, answers.officeNumber)
    employeeArray.push(newManager)
    menue()
  });


//set the terminal to prompt the user to create the roles
function menue() {
  inquirer.prompt({ type: "list", message: chalk.red.underline('What would you like to do?\n'), name: "choice", choices: ["Add Engineer", "Add Intern", "Finish"] })
    .then(answers => {
      if (answers.choice === "Add Engineer") {
        inquirer.prompt([
          {
            type: "input",
            message: chalk.red.underline('What is your username?\n'),
            name: "username",
          }, {
            type: "input",
            message: chalk.red.underline('What is your email?\n'),
            name: "email",
          }, {
            type: "input",
            message: chalk.red.underline('What is your employee ID?\n'),
            name: "employeeId",
          }, {
            type: "input",
            message: chalk.red.underline('What is your github?\n'),
            name: "github",
          }]).then(answers => {
            const engineer = new Engineer(answers.username, answers.employeeId, answers.email, answers.github)
            employeeArray.push(engineer)
            menue()
            
          })
      } else if (answers.choice === "Add Intern") {
        inquirer.prompt([
          {
            type: "input",
            message: chalk.red.underline('What is your username?\n'),
            name: "username",
          }, {
            type: "input",
            message: chalk.red.underline('What is your email?\n'),
            name: "email",
          }, {
            type: "input",
            message: chalk.red.underline('What is your employee ID?\n'),
            name: "employeeId",
          }, {
            type: "input",
            message: chalk.red.underline('What is your school?\n'),
            name: "school",
          }]).then(answers => {
            const intern = new Intern(answers.username, answers.employeeId, answers.email, answers.school)
            employeeArray.push(intern)
            menue()
          })
      } else if (answers.choice === "Finish") {
        const genHtml = HTML(employeeArray)
        console.log(genHtml)

        fs.writeFile("index.html", genHtml, (err) =>
          err ? console.log(err) : console.log("File Created"))
      }

    })
}
