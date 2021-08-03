const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
require('./db/conn');
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
// app.use(express.urlencoded({ extended: false }));

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
            const studentData = await new StudentModel(req.body);
            const result = studentData.save();
            if(result){
                res.status(201).send(result);
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