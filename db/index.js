const connection = require("./connection");

class employeeTrackerDB {
  constructor(connection) {
    this.connection = connection;
  }

  //* DEPARTMENT SECTION //

  // Show departments
  allDepartments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  // Add department
  addDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }

  // Delete department
  removeDepartment(department) {
    return this.connection
      .promise()
      .query("DELETE FROM department WHERE id = ?", department);
  }

  //* ROLE SECTION //

  // Show roles
  allRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;"
      );
  }

  // Add role
  addRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  // Delete role
  removeRole(role) {
    return this.connection
      .promise()
      .query("DELETE FROM role WHERE id = ?", role);
  }

  //* EMPLOYEE SECTION //

  // Show employees
  allEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
  }

  // Add employee
  addEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }

  // Update employee role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        roleId,
        employeeId,
      ]);
  }

  // View employee by department
  viewEmployeeDepartment() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id"
      );
  }
  // Delete employee
  removeEmployee(employee) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employee);
  }

  // View budget
  viewBudget() {
    return this.connection
      .promise()
      .query(
        "SELECT department_id AS id, department.name AS department, SUM(salary) AS budget FROM  role JOIN department ON role.department_id = department.id GROUP BY  department_id"
      );
  }
}

module.exports = new employeeTrackerDB(connection);