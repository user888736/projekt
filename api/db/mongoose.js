const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/taskManager', {useNewUrlParser: true}).then(()=>{
    console.log("Connected to MongoDB successfully");
}).catch((e)=>{
    console.log("Error connecting to MongoDB");
    console.log(e);
});


module.exports = {
    mongoose
};