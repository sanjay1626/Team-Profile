//Internal modules
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

//
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { get } = require("http");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const employees = [];
const employeesId = [];
const name =[];

//create a function to ask what type:Manager, Engineer, intern

function createTeam() {
    inquirer.prompt([
       
        {
        type: 'list',
        name: 'userchoice',
        message: "Select Team Type:",
        choices: ['Manager', 'Engineer', 'Intern']

    }]).then(usrchoice => {
        
        //console.log(name)
        //create switch statement to give function to each array
        switch (usrchoice.userchoice) {
            case 'Manager':
                
                createManager();
                break;
            case 'Engineer':
                createEngineer();
                break;
            case 'Intern':
                createIntern();
        }
        //name.push(usrchoice.name);
    })

   
}
function createManager() {
    inquirer.prompt([
        {
            type:'input',
            message: "Enter manager name:",
            name: "managerName",
           
        },
        {
            type:'input',
            message: "Enter manager member's id",
            name: "managerId",
           
        },
        {
            type:'input',
            message: "Enter manager  email",
            name: "managerEmail",
          
            
        },
        {
            type:'input',
            message: "Enter manager email office number",
            name: "managerNumber",
          
            
        }
        
    ]).then(answer=>{
        const manager = new Manager(answer.managerName, answer.managerId,answer.managerEmail,answer.managerNumber);
        employees.push(manager)
        employeesId.push(answer.managerId)
        createTeam();
       
        
    });
}

function createEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter engineer name",
            name: "engineerName",

        },
        {
            type: 'input',
            message: "Enter engineer id",
            name: "engineerId",

        },
        {
            type: 'input',
            message: "Enter engineer email",
            name: "engineerEmail",

        },
        {
            type: 'input',
            message: "Enter engineer GitHub username",
            name: "gitHub",

        },
        {
            type: 'list',
            name: 'addmore',
            message: "Would you like to add more team members?",
            choices: [ "yes", "I am Finished"]
        }

]).then(answer=>{
    const engineer = new Engineer(answer.engineerName, answer.engineerId,answer.engineerEmail,answer.gitHub);
        employees.push(engineer)
        employeesId.push(answer.engineerId)
    //console.log(engineer)
    switch(answer.addmore){
        case 'yes':
            createTeam();
        break;
       
        default:
            renderHTML();
    }
});
}

function createIntern(){
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter team member's name",
            name: "internName",

        },
            {
                type: 'input',
                message: "Enter team member's id",
                name: "internId",
    
            },
            {
                type: 'input',
                message: "Enter team member's email",
                name: "internEmail",
    
            },
            {
                type: 'input',
                message: "Enter team member's school",
                name: "internSchool",
    
            },
            {
                type: 'list',
                name: 'addmore',
                message: "Would you like to add more team members?",
                choices: [ "yes", "I am Finished"]
            }

        
]).then(answer=>{
    const intern = new Intern(answer.internName, answer.internId,answer.internEmail,answer.internSchool);
        employees.push(intern)
        employeesId.push(answer.internId)
    //console.log(engineer)
    switch(answer.addmore){
        case 'yes':
            createTeam();
        break;
        case 'I am Finished':
            renderHTML();
        break;
        default:
            renderHTML();
    }
});
//function to renderHTML based on given output
function renderHTML(){
    fs.writeFileSync(outputPath,render(employees), "utf-8")
}
createTeam();
    
}



createTeam();