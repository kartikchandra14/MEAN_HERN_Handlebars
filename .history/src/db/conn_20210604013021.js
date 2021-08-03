const mongoose = require('mongoose');
const mongoDBDatabaseUrl = "mongodb://localhost:27017/herndb";
mongoose.connect(mongoDBDatabaseUrl, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then( () => {
    console.log("DB CONNECTED herndb");
})
.catch((err) => {
    console.log("DB NOT CONNECTED to  herndb ", error);
});