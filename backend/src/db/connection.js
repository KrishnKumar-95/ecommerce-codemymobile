const mongoose = require("mongoose");
const uri = `mongodb://localhost:27017/ecommerce1`;

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`Connection Successful...`);
}).catch((err)=>{
    console.log(`Error Occured : ${err}`);
});