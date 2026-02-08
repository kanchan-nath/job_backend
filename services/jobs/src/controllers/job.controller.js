import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/job.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find().sort({ postedDate: -1 });
    return res
        .status(200)
        .json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});

const createNewJob = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        company,
        location,
        salary,
        jobType,
        experience,
        level,
        skills,
        responsibilities,
        qualifications,
        benefits,
        aboutCompany,
        deadline
    } = req.body;

    const job = await Job.create({
        title: title ? title : "",
        description: description ? description : "",
        company: company ? company : "",
        location: location ? location : "",
        salary: salary ? salary : "",
        jobType: jobType ? jobType : "",
        experience: experience ? experience : "",
        level: level ? level : "",
        skills: Array.isArray(skills) ? skills : [],
        responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
        qualifications: Array.isArray(qualifications) ? qualifications : [],
        benefits: Array.isArray(benefits) ? benefits : [],
        aboutCompany: aboutCompany ? aboutCompany : "",
        deadline: deadline ? deadline : "",
    });


    return res.status(201).json(new ApiResponse(201, job, "New Job added"));
});

const deleteJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
        return res.status(404).json(new ApiResponse(404, null, "Job not found"));
    }

    return res.status(200).json(new ApiResponse(200, null, "Job deleted successfully"));
});

const getJobById = asyncHandler(async(req, res) => {
    const job = await Job.findById(req.params.id)
        .populate('createdAt', 'name email company');
    
    if (!job) {
        return res.status(404).json(new ApiResponse(404, null, "Job not found"));
    }

    return res.status(200).json(new ApiResponse(200, job, "Job found successfully"));
});

const updateJob = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const job = await Job.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
    );

    if (!job) {
        return res.status(404).json(new ApiResponse(404, null, "Job not found"));
    }

    return res.status(200).json(new ApiResponse(200, job, "Job updated successfully"));
});

export {
    createNewJob,
    getAllJobs,
    deleteJob,
    getJobById,
    updateJob
};
