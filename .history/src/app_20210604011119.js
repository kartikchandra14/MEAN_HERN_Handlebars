const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
require('./db/conn');
// ================== MIDDLEWARES using ===============================
app.use(express.static());
app.use("views", "");

// ================== SERVER RUNIING ==================================
app.listen(port, () => {
    console.log(`Server runnig at port number = ${port}`)
}, (error) => {
    console.error('========ERROR=============>', error);
})