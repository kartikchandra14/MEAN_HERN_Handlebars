require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const bcryptjs = require('bcryptjs');
const cookieParser = require('cookie-parser');
require('./db/conn');

const StudentModel = require('./models/register');
const auth = require('./middleware/auth');
const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, '../public');
// console.log("== App_staticPath ==>", staticPath);
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
// ================== MIDDLEWARES using ===============================
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.get("/", (req,res) => {
    res.render("index"); //render index.hbs
});
app.get("/register", (req,res) => {
    res.render("register"); //render index.hbs
});
app.post("/register", async (req,res) => {
    try{
        console.log("registerPOST", req.body)
        if(req.body){
            if(req.body?.password == req.body?.confirmPassword){
                // const savedHash = bcryptjs.hash(req.body.password, 10); //bcryptjs.hash(password, salt or NUMBER);
                // const savedHash = bcryptjs.compare(req.body.password, 10); //bcryptjs.compare(password , salt or NUMBER);
                const studentData = new StudentModel(req.body);
                console.log("register_1", studentData);
                const tokenGenerated = await studentData.generateAuthToken();

                const result = await studentData.save();
                if(tokenGenerated){
                    res.status(201).render("index");
                }
                else{
                    res.status(404).send("BAD REQUEST !!");
                }
            }
            else{
                res.status(404).send("password & confirm password not same");
            }
            
        }
    }
    catch(error){
        console.log("error", error);
        res.status(500).send("INTERNAL SERVER ERROR !!");
    }
});
app.get("/login", (req,res) => {
    res.render("login"); //render login.hbs
});
app.post("/login", async(req,res) => {
    try{
        // console.log('POST_login', req.body,req.body.email, req.body.password);
        if(req.body.email && req.body.password){
            const emailPassed = req.body.email;
            const specificStudentData = await StudentModel.findOne({email: emailPassed});
            // console.log('POST_login1',specificStudentData );
            if(specificStudentData){
                const passwordPassed = specificStudentData.password;
                const isPasswordMatch = await bcryptjs.compare(req.body.password, passwordPassed)

                const tokenGeneratd = await specificStudentData.generateAuthToken();// after password match generation of token 

                if(isPasswordMatch){
                    res.cookie("jwt", tokenGeneratd, { 
                        expires: new Date(Date.now() + 50000 ),
                        httpOnly: true, 
                        // secure: true 
                    });
                    res.render('index');
                    // res.status(200).send({message: "login successfull", status: true, token : tokenGeneratd})
                }
                else{
                    res.status(200).send({message: "login unsuccessfull", status: false})
                }
            }
            else{
                res.status(404).send(specificStudentData)
            }
        }
        else{
            res.status(404).send({message: "invalid credentials", status: false}) 
        }
    }
    catch(error){
        res.status(500).send(error);
    }
});
app.get("/secret",auth, (req,res) => {
    // Get COOKIES
    console.log('secretROUTE jwt cookie ==>', req.cookies.jwt);
    res.render("secret"); //render secret.hbs
});
// ================== SERVER RUNIING ==================================
app.listen(port, () => {
    console.log(`Server runnig at port number = ${port}`)
});