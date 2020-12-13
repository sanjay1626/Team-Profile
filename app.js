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
//var name,id, email;
function initApp() {
    addteam();

}

function addteam(name,id,email) {
    inquirer.prompt([{
        message: "Enter team member name",
        name: "name"
    },
    {
        type: "list",
        message: "Select team member role",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
        
    },
    {
        message: "Enter team member id",
        name: "id",
        validate: answer => isNaN(parseInt(answer)) ? 'Not a number!, please re-enter a valid Id' : true
    },
    {
        message: "Enter team member email",
        name: "email"
    }
    ]).then(choicer => {
          name = choicer.name;
          id = choicer.id;
          email = choicer.email;
          
        switch (choicer.role) {
            case "Engineer": createEngineer();
                break;
            case "Intern": createIntern();
                break;
            case "Manager": createManager();
                break;
        }
    })

    function createManager() {
        inquirer.prompt([{
            type: "input",
            name: "managerOfficeNumber",
            message: "Manager Office Number",
            validate: answer => isNaN(parseInt(answer)) ? 'Not a valid office number!, please re-enter a office number' : true
        }]).then(answer => {
            const manager = new Manager(name, id, email, answer.managerOfficeNumber);
            employees.push(manager);
            employeesId.push(answer.id);
            createchoice();

        })

    };

    function createEngineer() {
        inquirer.prompt([{

            type: "input",
            name: "github",
            message: "Engineer Github"
        }
        ]).then(answer => {
            const engineer = new Engineer(name, id, email, answer.github);
            employees.push(engineer);
            employeesId.push(answer.id)
            createchoice();
        })


    };

    function createchoice() {
        inquirer.prompt([{
            type: "list",
            name: "memberChoice",
            message: "Would you like to add more member?",
            choices: ["Yes", "No"]
        }]).then(choicer => {
            switch (choicer.memberChoice) {
                case "Yes": addteam();
                    break;
                case "No": 
                    console.log("Generated Team HTML....//")
                    renderHTML();
                    break;
                default:
                    console.log("Generated Team HTML....//")
                    renderHTML();
            }
        })
    }

    function createIntern() {
        inquirer.prompt([{
            type: "input",
            name: "school",
            message:"What School do you attend to?"
        }]).then(answer => {
            const intern = new Intern(name, id,email, answer.school)
            employees.push(intern);
            employeesId.push(id);
            createchoice();
        })
    }


}
function renderHTML() {
    fs.writeFileSync(outputPath, render(employees), "utf-8");

}



initApp();