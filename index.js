const inquirer = require("inquirer");
const db = require("./db");
const consoleTable = require("console.table");

const choices = [
  {
    type: "list",
    name: "options",
    message: "Please select an action:",
    choices: [
      {
        name: "View Departments",
        value: "view_departments",
      },
      {
        name: "View Roles",
        value: "view_roles",
      },
      {
        name: "View Employees",
        value: "view_employees",
      },
      {
        name: "Add Department",
        value: "add_department",
      },
      {
        name: "Add Role",
        value: "add_role",
      },
      {
        name: "Add Employee",
        value: "add_employee",
      },
      {
        name: "Update Role",
        value: "update_role",
      },
      {
        name: "Remove Department",
        value: "remove_department",
      },
      {
        name: "Remove Role",
        value: "remove_role",
      },
      {
        name: "Remove Employee",
        value: "remove_employee",
      },
      {
        name: "View Budgets",
        value: "view_budgets",
      },
      {
        name: "View Employee by Department",
        value: "view_employee_by_department",
      },
      {
        name: "Exit",
        value: "exit",
      },
    ],
  },
];

const init = () => {
  inquirer
    .prompt(choices)
    .then((res) => {
      let options = res.options;

      switch (options) {
        case "view_departments":
          viewDepartments();
          break;
        case "add_department":
          addDepartment();
          break;
        case "remove_department":
          removeDepartment();
          break;
        case "view_roles":
          viewRoles();
          break;
        case "add_role":
          addRole();
          break;
        case "remove_role":
          removeRole();
          break;
        case "view_employees":
          viewEmployees();
          break;
        case "add_employee":
          addEmployee();
          break;
        case "remove_employee":
          removeEmployee();
          break;
        case "update_role":
          updateRole();
          break;
        case "view_employee_by_department":
          viewEmployeeByDepartment();
          break;
        case "view_budgets":
          viewBudgets();
          break;
        default:
          exitTracker();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const viewDepartments = () => {
  db.allDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => init());
}

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        message: "Provide department name:",
      },
    ])
    .then((res) => {
      let name = res;
      db.addDepartment(name)
        .then(() =>
          console.log(`${name.name} department added!`)
        )
        .then(() => console.log("\n"))
        .then(() => init());
    })
    .catch((err) => {
      console.log(err);
    });
}

const removeDepartment = () => {
  db.allDepartments().then(([rows]) => {
    let departments = rows;
    const departmentOptions = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "department",
          message: "Select department to remove:",
          choices: departmentOptions,
        },
      ])
      .then((res) => {
        let department = res.department;

        db.removeDepartment(department)
          .then(() =>
            console.log(`Department removed successfully!`)
          )
          .then(() => console.log("\n"))
          .then(() => init());
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

const viewRoles = () => {
  db.allRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => init());
}

const addRole = () => {
  db.allDepartments().then(([rows]) => {
    let departments = rows;
    const departmentOptions = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    inquirer
      .prompt([
        {
          name: "title",
          message: "Provide name of the role!",
        },
        {
          name: "salary",
          message: "Provide salary rate!",
        },
        {
          type: "list",
          name: "department_id",
          message: "Provide department of role!",
          choices: departmentOptions,
        },
      ])
      .then((role) => {
        db.addRole(role)
          .then(() =>
            console.log(`${role.title} role added to database!`)
          )
          .then(() => console.log("\n"))
          .then(() => init());
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

const removeRole = () => {
  db.allRoles().then(([rows]) => {
    let roles = rows;
    const roleOptions = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));

    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Select role to remove!",
          choices: roleOptions,
        },
      ])
      .then((res) => {
        let role = res.role;

        db.removeRole(role)
          .then(() =>
            console.log(`Role removed successfully!`)
          )
          .then(() => console.log("\n"))
          .then(() => init());
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

const viewEmployees = () => {
  db.allEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => init());
}

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "Provide employee first name!",
      },
      {
        name: "last_name",
        message: "Provide employee last name!",
      },
    ])
    .then((res) => {
      let firstName = res.first_name;
      let lastName = res.last_name;

      db.allRoles().then(([rows]) => {
        let roles = rows;
        const roleOptions = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));

        inquirer
          .prompt({
            type: "list",
            name: "roleId",
            message: "Select Employee Role!",
            choices: roleOptions,
          })
          .then((res) => {
            let roleId = res.roleId;

            db.allEmployees()
              .then(([rows]) => {
                let employees = rows;
                const managerOptions = employees.map(
                  ({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id,
                  })
                );

                managerOptions.unshift({ name: "None", value: null });

                inquirer
                  .prompt({
                    type: "list",
                    name: "managerId",
                    message: "Provide employee's manager",
                    choices: managerOptions,
                  })
                  .then((res) => {
                    let employee = {
                      manager_id: res.managerId,
                      role_id: roleId,
                      first_name: firstName,
                      last_name: lastName,
                    };

                    db.addEmployee(employee);
                  })
                  .then(() =>
                    console.log(`${firstName} ${lastName}, employee added to database!`)
                  )
                  .then(() => console.log("\n"))
                  .then(() => init());
              })
              .catch((err) => {
                console.log(err);
              });
          });
      });
    });
}

const updateRole = () => {
  db.allEmployees().then(([rows]) => {
    let employees = rows;
    const employeeOptions = employees.map(
      ({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      })
    );
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Provide employee's role to update!",
          choices: employeeOptions,
        },
      ])
      .then((res) => {
        let employeeId = res.employeeId;

        db.allRoles().then(([rows]) => {
          let roles = rows;
          const roleOptions = roles.map(({ id, title }) => ({
            name: title,
            value: id,
          }));

          inquirer
            .prompt([
              {
                type: "list",
                name: "roleId",
                message: "Provide new role of employee!",
                choices: roleOptions,
              },
            ])
            .then((res) => db.updateEmployeeRole(employeeId, res.roleId))
            .then(() =>
              console.log(`Employee role updated at database!`)
            )
            .then(() => console.log("\n"))
            .then(() => init())
            .catch((err) => {
              console.log(err);
            });
        });
      });
  });
}

const viewEmployeeByDepartment = () => {
  db.viewEmployeeDepartment()
    .then(([rows]) => {
      let employee = rows;
      console.log("\n");
      console.table(employee);
    })
    .then(() => init())
    .catch((err) => {
      console.log(err);
    });
}

const removeEmployee = () => {
  db.allEmployees().then(([rows]) => {
    let employees = rows;
    const employeeOptions = employees.map(
      ({ id, first_name, last_name }) => ({
        name: first_name + " " + last_name,
        value: id,
      })
    );

    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Select employee to remove!",
          choices: employeeOptions,
        },
      ])
      .then((res) => {
        let employee = res.employee;

        db.removeEmployee(employee)
          .then(() =>
            console.log(`Employee removed successfully!`)
          )
          .then(() => console.log("\n"))
          .then(() => init());
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

const viewBudgets = () => {
  db.viewBudget()
    .then(([rows]) => {
      let budgets = rows;
      console.log(`\nBUDGET BY DEPARTMENT\n`);
      console.table(budgets);
    })
    .then(() => init())
    .catch((err) => {
      console.log(err);
    });
}

const exitTracker = () => {
  process.exit();
}

init();