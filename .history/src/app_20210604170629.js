const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const bcryptjs = require('bcryptjs');

require('./db/conn');

const StudentModel = require('./models/register');

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
            // if(req.body?.password === req.body?.confirmPassword){
                // const savedHash = bcryptjs.hash(req.body.password, 10); //bcryptjs.hash(password, salt or NUMBER);
                // const savedHash = bcryptjs.compare(req.body.password, 10); //bcryptjs.compare(password , salt or NUMBER);
            // }
            // else{
            //     res.status(404).send("password & confirm password not same");
            // }
            const studentData = new StudentModel(req.body);

            const tokenGenerated = await StudentModel.generateAuthToken();

            // const result = await studentData.save();
            if(tokenGenerated){
                res.status(201).render("index");
            }
            else{
                res.status(404).send("BAD REQUEST !!");
            }
        }
    }
    catch(error){
        console.log("error", error);
        res.status(500).send("INTERNAL SERVER ERROR !!");
    }
});

// ================== SERVER RUNIING ==================================
app.listen(port, () => {
    console.log(`Server runnig at port number = ${port}`)
});