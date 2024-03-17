const mongoose=require('mongoose');

const chatSchema=mongoose.Schema({
    from:{type:String,
        required:true},  
    to:{type:String,
            required:true},
    mess:{type:String,
        required:true}
    
})

module.exports=mongoose.model("Chat",chatSchema);