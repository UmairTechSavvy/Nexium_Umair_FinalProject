
import mongoose from "mongoose"


const userSchema = mongoose.Schema({

Username:{

type: String,
required: true,
},

Email:{
type:String,
required: true
},

Password: {

type: String,
required: true

},

  verifyToken: {
    type: String
  },
  verifyTokenExpiry: {
    type: Date
  }


},{
timestamps: true})


const User = mongoose.models.User || mongoose.model("User",userSchema)
export default User