const express = require('express');
const path = require('path');
const app = express();
require('./db/conn');
const port = process.env.PORT || 3000;
const staticPath = path.join(__dirname, '../public');
// console.log("== App_staticPath ==>", staticPath);
// ================== MIDDLEWARES using ===============================
app.use(express.static(staticPath));
app.use("view engine", "hbs");

app.get("/", async(req,res,next) => {
    res.render('index'); //render index.hbs
});
// ================== SERVER RUNIING ==================================
app.listen(port, () => {
    console.log(`Server runnig at port number = ${port}`)
});