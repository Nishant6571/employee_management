const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoute");
const cors = require("cors");
const { auth } = require("./middlewares/auth");
const { empRouter } = require("./routes/employeeRoute");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/employees", auth, empRouter);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "This is our Homepage." });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.log({ Error: error });
  }
});
