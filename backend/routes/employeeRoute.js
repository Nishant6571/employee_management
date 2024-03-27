const express = require("express");
const { EmpModel } = require("../models/EmpModel");

const empRouter = express.Router();

// Add employee
empRouter.post("/", async (req, res) => {
  const { firstname, lastname, email, department, salary, userId } = req.body;
  try {
    const employee = new EmpModel({
      firstname,
      lastname,
      email,
      department,
      salary,
      userId,
    });
    await employee.save();
    res.status(200).json({ msg: "Employee added successfully", employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Employee
empRouter.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 5, department, sortBy, search } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const query = {};
    if (department) {
      query.department = department;
    }
    if (search) {
      query.firstName = { $regex: search, $options: "i" };
    }
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = 1;
    }
    const employees = await EmpModel.find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip((page - 1) * limit);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an employee
empRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await EmpModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ msg: "Employee updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a employee
empRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await EmpModel.findByIdAndDelete({ _id: id });
    return res.status(200).send({ msg: "employee Delete successfully " });
  } catch (error) {
    return res.status(500).send({ msg: "Error Delete employee", error: error });
  }
});

module.exports = {
  empRouter,
};
