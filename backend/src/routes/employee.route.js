module.exports = app => {
    const employee = require("../controllers/employee.controller.js");

    var router = require("express").Router();

    // Create a new Employee
    router.post("/", employee.create);

    // Retrieve all Employees
    router.get("/", employee.findAll);

    // Retrieve a single Employee by ID
    router.get("/:id", employee.findOne);

    // Update an Employee by ID
    router.put("/:id", employee.update);

    // Delete an Employee by ID
    router.delete("/:id", employee.delete);

    // Add router to the app
    app.use('/api/employees', router);
};
