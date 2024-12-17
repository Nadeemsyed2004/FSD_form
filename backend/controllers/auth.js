
const express = require("express");
const connection = require("../db/db.js");
const nodemailer = require("nodemailer");

require("dotenv").config();
const router = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
transport.verify((error, success) => {
  if (error) {
    console.error("Error with transport setup:", error);
  } else {
    console.log("Server is ready to send emails");
  }
});
router.get('/test',(req,res)=>{
    res.send("succes");
})
router.post("/addEmployee", async (req, res) => {
  const {
    firstName,
    lastName,
    employee_id,
    email,
    phone_number,
    department,
    date_of_joining,
    roles,
  } = req.body;
  
  try {
    const connectDB = await connection();
    const [existingEmp] = await connectDB.query(
      "SELECT * FROM employee_details WHERE employee_id = ?",
      [employee_id]
    );

    if (existingEmp.length) {
      console.log("already");
      return res
        .status(401)
        .json({ messege: "Already there is a Employee with the same ID" });
    }
    connectDB.query(
      "INSERT INTO employee_details (first_name,last_name,employee_id,email,phone_number,department,date_of_joining,roles) VALUES (?,?,?,?,?,?,?,?)",
      [
        firstName,
        lastName,
        employee_id,
        email,
        phone_number,
        department,
        date_of_joining,
        roles,
      ]
    );
    res.status(200).json({ messege: "Employee Details successfully added!" });


    const mailoption = {
      from:'process.env.MAIL_USER',
      to:email,
      subject:'Employee Registration',
      html:`welcome to CIT Employees, Thanks for Sharing your details with us ${firstName} ${lastName}`
    };
    transport.sendMail(mailoption, (err, result) => {
      if (err) {
        console.log("error while sending mail", err.message);
      } else {
        console.log(`Email sent Succesfully to ${email}`, result.response);
        connectDB.query('UPDATE employee_details SET notified=? WHERE employee_id=?',[1,employee_id]);
      }
    });

  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ messege: "Error while adding a new employee" });
  }
});

// router.get('/updateemployee',(req,res)=>{
//   try{
//     const connectDB
//   }catch(err){
//     console.log("err in getting id catched");
//   }
// })

module.exports = router;
