const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applyJob = new Schema({        
        job_id:{type:mongoose.Schema.ObjectId,required:true},
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
