const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");


const MONGO_URL = process.env.MONGO_URL ;
main().then(() =>{
    console.log("connection Successfull")
}).catch((err) =>{
    console.log(err);
});
async function main(){
     await mongoose.connect(MONGO_URL); // whatsapp is database 
}


 const initSDT= async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data is inittializing");
 }
 initSDT();

 
