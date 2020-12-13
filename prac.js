const { stdout } = require("process");

//Internal modules
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

//
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { get } = require("http");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const employees = [];
const employeesId = [];



//Function created to add team members

function createTeam() {

    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "Manager Name"
            },
            {
                type: "input",
                name: "managerId",
                message: "Manager Id",
                validate: answer => isNaN(parseInt(answer)) ? 'Not a number!, please re-enter a valid Id' : true
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Manager Email"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "Manager Office Number",
                validate: answer => isNaN(parseInt(answer)) ? 'Not a valid office number!, please re-enter a office number' : true
            }
        ]).then(answer => {
            const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.mangerOfficeNumber);
            employees.push(manager);
            employeesId.push(answer.managerId);
            createTeam();
        });
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "choose type of member",
                choices: ["Engineer", "Intern", "I am finished"]
            }
        ]).then(choicer => {
            switch (choicer.memberChoice) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    console.log("Generated Team HTML....//")
                    renderHTML();
            }
        });

    }

    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "Engineer Name"
            },
            {
                type: "input",
                name: "engineerId",
                message: "Engineer Id",
                validate: answer => isNaN(parseInt(answer)) ? 'Not a number!, please re-enter a valid Id' : true,

            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Engineer Email"
            },
            {
                type: "input",
                name: "engineerOfficeNumber",
                message: "Engineer Office Number",
                validate: answer => isNaN(parseInt(answer)) ? 'Not a valid office number!, please re-enter a office number' : true
            }
        ]).then(answer => {
            const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerOfficeNumber);

            employees.push(engineer);
            employeesId.push(answer.engineerId);
            createTeam();
        });

    }

    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "Intern Name"
            },
            {
                type: "input",
                name: "internId",
                message: "Intern ID",
                validate: answer => isNaN(parseInt(answer)) ? 'Not a number!, please re-enter a valid Id' : true
            },
            {
                type: "input",
                name: "internEmail",
                message: "Intern Email"
            },
            {
                type: "input",
                name: "internOfficeNumber",
                message: "Intern Office Number",
                validate: answer => isNaN(parseInt(answer)) ? 'Not a valid office number!, please re-enter a office number' : true
            }
        ]).then(answer => {
            const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internOfficeNumber);
            employees.push(intern);
            employeesId.push(answer.internId);
            createTeam();
        });

    }

    function renderHTML() {
        fs.writeFileSync(outputPath, render(employees), "utf-8");
    }

    createManager();

}



createTeam();
