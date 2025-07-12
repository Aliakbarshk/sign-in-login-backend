const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
const EmployeeModel = require("./models/Employee");
const port = process.env.PORT;
const MDB = process.env.MONGODB_URI;
const DBNAME = '/employees';












// console.log(process.env);

app.use(express.json());
app.use(cors());

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`
//     ); // connects DB
//     console.log(
//       `Connected succesfully : ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.log("MongoDB Connection failed ");
//     process.exit(1);
//   }
// };

mongoose.connect(`${process.env.MONGODB_URI}${DBNAME}`)
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err.message));




app.post('/register' , (req , res) => {

    EmployeeModel.create(req.body)
    .then(employees => res.json(employees)
         )
    .catch(err => res.json(err))
    

})



app.post("/login", async (req, res) => {
  const { email, password } = req.body; // 1️⃣  front‑se aaya data

  try {
    const user = await EmployeeModel.findOne({ email }); // 2️⃣  DB query

    if (!user) return res.json("User not found⚠️"); // 3️⃣  email hi galat

    if (user.password !== password)
      // 4️⃣  pwd match check
      return res.json("Password incorrect");

    res.json("Success"); // 5️⃣  sab sahi
  } catch (err) {
    res.status(500).json("Server error"); // 6️⃣  safety
  }
});




app.listen(port || 3000, () => {
  // callback me arg mat do, aur fallback port rakh lo
  console.log(`Server running at http://localhost:${port || 3000}`);
});


