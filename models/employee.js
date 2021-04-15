class Employee {
    constructor(id, fName, lName, roleId, managerId) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.roleId = roleId;
        this.managerId = managerId;
    }
}

module.exports = Employee;