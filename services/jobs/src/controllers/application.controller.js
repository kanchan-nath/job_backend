import { asyncHandler } from "../utils/asyncHandler.js";
import { Application } from "../models/application.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createApplication = asyncHandler(async(req, res) => {
    const { fullName, email, phone, resume, coverLetter, jobId } = req.body;

    const existingApplication = await Application.findOne({ jobId, email });
    if (existingApplication) {
        return res.status(400).json(new ApiResponse(400, null, "You have already applied for this job"));
    }

    const newApplication = await Application.create({
        fullName,
        email,
        phone,
        resume,
        coverLetter,
        jobId
    });

    return res
    .status(201)
        .json(new ApiResponse(201, newApplication, "Application submitted successfully"));
});

// const getAllApplications = asyncHandler(async(req, res) => {
//     const { jobId } = req.params;

//     const applications = await Application.find({ jobId })
//         .populate('jobId', 'title company')
//         .populate('userId', 'email name')
//         .sort({ appliedDate: -1 });

//     return res.status(200).json(new ApiResponse(200, applications, "Applications fetched successfully"));
// });

// const getApplicationsByUser = asyncHandler(async(req, res) => {
//     const applications = await Application.find({ userId: req.user.sub })
//         .populate('jobId', 'title company location salary')
//         .sort({ appliedDate: -1 });

//     return res.status(200).json(new ApiResponse(200, applications, "User applications fetched successfully"));
// });

// const updateApplicationStatus = asyncHandler(async(req, res) => {
//     const { id } = req.params;
//     const { status, adminNotes } = req.body;

//     if (!['pending', 'reviewed', 'rejected', 'accepted'].includes(status)) {
//         return res.status(400).json(new ApiResponse(400, null, "Invalid status"));
//     }

//     const application = await Application.findByIdAndUpdate(
//         id,
//         { status, adminNotes },
//         { new: true }
//     ).populate('jobId userId');

//     if (!application) {
//         return res.status(404).json(new ApiResponse(404, null, "Application not found"));
//     }

//     return res.status(200).json(new ApiResponse(200, application, "Application status updated"));
// });

export {
    createApplication,
    // getAllApplications,
    // getApplicationsByUser,
    // updateApplicationStatus
}
