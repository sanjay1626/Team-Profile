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

function initApp() {
   render();
   
}

//Function created to add team members
function addteam(){
inquirer.prompt([
    {
        type:'input',
        message:"Enter Name:",
        name: 'name',
        

    },
        {
            type: 'list',
            message: "Select employpment type to add to the team:",
            choices: ['Manager','Engineer','Intern'],
            name: 'role'
        },
        
        {
            type:'input',
            message: "Enter team member's id",
            name: "id",
        
        },
        {
            type:'input',
            message: "Enter team member's email",
            name: "email",
        
            
        }
    ]).then (function({role,name,id,email}){
            let roleInfo = "";
            if(role === "Engineer"){
                roleInfo = "GitHub username";
            }else if (role === "Intern") {
                roleInfo = "school name";
            } else {
                roleInfo = "office phone number";
            }

            inquirer.prompt([{
                message: `Enter team member's ${roleInfo}`,
                name: "roleInfo"
            },
            {
                type: "list",
                message: "Would you like to add more team members?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "moreMembers"
            }])
           

        })            
}
addteam();   
            
   
 



