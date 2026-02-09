import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    company: {
        type: String,
    },
    location: {
        type: String,
    },
    salary: {
        type: String,
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
    },
    experience: {
        type: String,
    },
    level: {
        type: String,
        enum: ['Entry', 'Mid', 'Senior', 'Lead'],
        default: 'Mid'
    },
    skills: [String],
    responsibilities: [String],
    qualifications: [String],
    benefits: [String],
    aboutCompany: {
        type: String,
    },
    postedDate: {
        type: Date,
        default: Date.now,
    },
    deadline: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    applicationsCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema)
