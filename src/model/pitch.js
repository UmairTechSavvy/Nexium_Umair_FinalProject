const { default: mongoose } = require("mongoose");




const pitchSchema = new mongoose.Schema({


CompanyName:{
  type:String,
  required:true
},
Idea:{
  type:String,
  required:true
},
TargetAudience:{
  type:String,
  required:true
},
Problem:{
  type:String,
  required:true
},
Unique:{
  type:String,
  required:true
},
AI_Response:{
type:String
}


},{timestamps:true})

const Pitch = mongoose.models.Pitch || mongoose.model("Pitch",pitchSchema)
export default Pitch