import mongoose from "mongoose";

const PRSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  repoTag: {
    type: String,
    required: true,
  },
});

export default mongoose.models.PR || mongoose.model("PR", PRSchema);