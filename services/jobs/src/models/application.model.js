import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String },
    phone: { type: String },
    resume: { type: String },
    coverLetter: { type: String },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    appliedAt: { type: Date, default: Date.now }
});

const Application = mongoose.model("Application", applicationSchema);

export  {Application};
