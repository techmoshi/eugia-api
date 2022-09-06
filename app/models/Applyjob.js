const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applyJob = new Schema({        
        Job_id:String ,
        name:String,
        contact_no:String,
        email:String,
        description:String,
        image:String,
        category:String,        
    },{
    versionKey: false,
    timestamps: true
})
module.exports = Apply = mongoose.model("Applyjob",applyJob)
