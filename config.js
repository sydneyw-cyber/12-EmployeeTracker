const connection = require("./connection.js");

const config = {
    theDepartments: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM departments", (err, res) => {
                if (err) {return reject(err);}
                console.table(res);
                return resolve();
            });
        });
    },

    theEmployees: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, roles.title, roles.salary, departments.name FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id", (err, res) => {
                if (err) {return reject(err);}
                let employeeObjArr = [];
                for (let i = 0; i < res.length; i++) {
                    const employeeObj = {
                        "First Name": res[i].first_name,
                        "Last Name": res[i].last_name,
                        "Title": res[i].title,
                        "Salary": res[i].salary,
                        "Department": res[i].name,
                        "Manager ID": res[i].manager_id,
                        "ID": res[i].id
                    };
                    employeeObjArr.push(employeeObj);
                }
                console.table(employeeObjArr);
                return resolve();
            });
        });
    },

    theEmployeeRoles: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM roles", (err, res) => {
                if (err) {return reject(err);}
                console.table(res);
                return resolve();
            });
        });
    },

    theManagers: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT managers.id, managers.first_name, managers.last_name, managers.salary, departments.name FROM managers LEFT JOIN departments on managers.department_id = departments.id", (err, res) => {
                if (err) {return reject(err);}
                let managerObjArr = [];
                for (let i = 0; i < res.length; i++) {
                    const managerObj = {
                        "First Name": res[i].first_name,
                        "Last Name": res[i].last_name,
                        "Salary": res[i].salary,
                        "Department": res[i].name,
                        "ID": res[i].id
                    };
                    managerObjArr.push(managerObj);
                }
                console.table(managerObjArr);
                return resolve();
            });
        });
    },

    addEmployee: (firstName, lastName, roleId, managerId) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId})`, (err, res) => {
                if (err) {return reject(err);}
                console.log("\n Success!");
                return resolve();
            })
        })
    },

    addEmployeeRole: (roleTitle, roleSalary, departmentId) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${roleTitle}", ${roleSalary}, ${departmentId})`, (err, res) => {
                if (err) {return reject(err);}
                console.log("\n Success!");
                return resolve();
            })
        })
    },

    addDepartment: (departmentName) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO departments (name) VALUES ("${departmentName}")`, (err, res) => {
                if (err) {return reject(err);}
                console.log("\n Success!");
                return resolve();     
            })
        })
    },

    addManager: (firstName, lastName, managerSalary, departmentId) => {
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO managers (first_name, last_name, salary, department_id) VALUES ("${firstName}", "${lastName}", ${managerSalary}, ${departmentId})`, (err, res) => {
                if (err) {return reject(err);}
                console.log("\n Success!");
                return resolve();
            })
        })
    },

    updateEmployee: (changeKey, changeVal, employeeFirst, employeeLast) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE employees SET ${changeKey} = ${changeVal} WHERE first_name = "${employeeFirst}" AND last_name = "${employeeLast}"`, (err, res) => {
                if (err) {return reject(err);}
                console.log("\n Success!");
                return resolve();
            })
        })
    },

    updateEmployeeRole: (changeKey, changeVal, roleTitle) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE roles SET ${changeKey} = ${changeVal} WHERE title = "${roleTitle}"`, (err, res) => {
                if (err) {return reject(err);}
                console.log("\n Success!");
                return resolve();
            })
        })
    },

    updateManager: (changeKey, changeVal, managerFirst, managerLast) => {
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE managers SET ${changeKey} = ${changeVal} WHERE first_name = "${managerFirst}" AND last_name = "${managerLast}"`, (err, res) => {
                if (err) {return reject();}
                console.log("\n Success!");
                return resolve();
            })
        })
    },

    allEmployeeRoles: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM roles", (err, res) => {
                if (err) {return reject(err);}
                let rolesTitleArr = [];
                for (let i = 0; i < res.length; i++) {
                    rolesTitleArr.push(res[i].title);
                }
                return resolve(rolesTitleArr);
            })
       })
    },

    allDepartments: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM departments", (err, res) => {
                if (err) {return reject(err);}
                let departmentsNameArr = [];
                for (let i = 0; i < res.length; i++) {
                    departmentsNameArr.push(res[i].name);
                }
                return resolve(departmentsNameArr);
            })
       })
    },

    allEmployees: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employees", (err, res) => {
                if (err) {return reject(err);}
                let employeesObjArr = [];
                for (let i = 0; i < res.length; i++) {
                    const employeesObj = {
                        "First Name": res[i].first_name,
                        "Last Name": res[i].last_name,
                        "Department ID": res[i].department_id,
                        "Manager ID": res[i].manager_id,
                        "Employee ID": res[i].id
                    };
                    employeesObjArr.push(employeesObj);
                }
                return resolve(employeesObjArr);
            })
       })
    },

    allManagers: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM employees", (err, res) => {
                if (err) {return reject(err);}
                let managersObjArr = [];
                for (let i = 0; i < res.length; i++) {
                    const managersObj = {
                        "First Name": res[i].first_name,
                        "Last Name": res[i].last_name,
                        "Salary": res[i].salary,
                        "Department ID": res[i].department_id,
                        "Manager's ID": res[i].manager_id
                        };
                    managersObjArr.push(managersObj);
                }
                return resolve(managersObjArr);
            })
        })
    }
}


module.exports = config;