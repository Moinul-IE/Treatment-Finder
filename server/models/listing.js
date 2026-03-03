const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose');

const doctoruserSchema = new Schema({
    image : {
        type: String,
        default : "/image/defaultimg.jpg",
        set: (val) => val === "" ? "/image/defaultimg.jpg" : val,


    },

    name :{
        type:String,
        required: true,
    },

    description:{
        type:String,
        required: true,
        
    },

    specialist : {
        type : String,
        required: true,
    },

    division : {
        type : String,
        required : true,
    },

    location : {
        type: String,
        required: true,
    },

    booking_amount:{
       new: {
        type : Number,
       },
       old: {
        type: Number,
       },
    },

   

    booking: {
        type: Number,
    },

    email: {
        type: String,
        required: true,
        unique: true, // Make sure each doctor has a unique emailno
    }
});

// Use email as the username field for passport-local-mongoose so users authenticate with email

doctoruserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameUnique: false   // 👈 IMPORTANT
});



const Listing = mongoose.model("Listing", doctoruserSchema);

module.exports = Listing;