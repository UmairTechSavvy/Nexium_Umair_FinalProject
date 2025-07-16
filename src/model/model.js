import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

JobPreference: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },







},{Timestamp : true});


const Job = mongoose.models.Job || mongoose.model("Job",jobSchema)
export default Job