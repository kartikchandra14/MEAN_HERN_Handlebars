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

app.get("/", (req,res) => {
    res.render("index"); //render index.hbs
});
app.get("/register", (req,res) => {
    res.render("register"); //render index.hbs
});
// ================== SERVER RUNIING ==================================
app.listen(port, () => {
    console.log(`Server runnig at port number = ${port}`)
});