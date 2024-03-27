const mongoose = require("mongoose");

const EmpSchema = mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true },
    department: { type: String },
    salary: { type: Number },
    date: { type: Date, default: Date.now },
    userId: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const EmpModel = mongoose.model("employee", EmpSchema);

module.exports = {
  EmpModel,
};
