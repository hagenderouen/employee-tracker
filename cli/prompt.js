const inquirer = require('inquirer');
const { readAll } = require('../db/query');

const promptMain = async () => {
    try {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                message: 'Select a category:',
                choices: ['Employees', 'Departments', 'Roles'],
                name: 'main'
            },
            {
                type: 'list',
                message: 'Select an employee option:',
                choices: ['Add', 'View', 'Update', 'Delete'],
                name: 'empOptions',
                when: function (answers) {
                    return answers.main = 'Employees'
                }
            },
            {
                type: 'list',
                message: 'Select a deparment option:',
                choices: ['Add', 'View', 'Delete'],
                name: 'depOptions',
                when: function (answers) {
                    return answers.main = 'Departments'
                }
            },
            {
                type: 'list',
                message: 'Select a role option:',
                choices: ['Add', 'View'],
                name: 'roleOptions',
                when: function (answers) {
                    return answers.main = 'Roles'
                }
            }
        ]);
        return answer;
    } catch (err) {
        console.log(err);
    };
};

const promptAddEmp = async () => {
    const roles = [];
    const managers = [];

    readAll('role', (err, res) => {
        if (err) throw err;
        roles = res;
    });

    readAll('manager', (err, res) => {
        if (err) throw err;
        managers = res;
    });

    try {

       const answers = await inquirer.prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'Fname'
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'Lname'
            },
            {
                type: 'list',
                message: "Select the employee's role:",
                choices: roles,
                name: 'role'
            },
            {
                type: 'confirm',
                message: 'Would you like to assign a manager?',
                name: 'hasManager'
            },
            {
                type: 'list',
                message: "Select the employee's manager:",
                choices: managers,
                name: 'manager',
                when: function (answers) {
                    return answers.hasManager;
                }
            }
        ]);

        return answers;

    } catch (err) {
        console.log(err);
    }
};

promptAddEmp();