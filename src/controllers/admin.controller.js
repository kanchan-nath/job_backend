import { asyncHandler } from "../utils/asyncHandler.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Job Management
const getAllJobsAdmin = asyncHandler(async(req, res) => {
    const { page = 1, limit = 10, status } = req.query;
    
    let filter = {};
    if (status) {
        filter.isActive = status === 'active';
    }

    const jobs = await Job.find(filter)
        .populate('createdBy', 'name email')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

    const total = await Job.countDocuments(filter);

    return res.status(200).json(new ApiResponse(200, {
        jobs,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
    }, "Jobs fetched"));
});

const updateJobStatus = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;

    const job = await Job.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
    );

    if (!job) {
        return res.status(404).json(new ApiResponse(404, null, "Job not found"));
    }

    return res.status(200).json(new ApiResponse(200, job, "Job status updated"));
});

const getJobStats = asyncHandler(async(req, res) => {
    const totalJobs = await Job.countDocuments({ isActive: true });
    const totalApplications = await Application.countDocuments();
    const totalUsers = await User.countDocuments();
    
    const recentApplications = await Application.find()
        .sort({ appliedDate: -1 })
        .limit(5)
        .populate('jobId', 'title')
        .populate('userId', 'email name');

    return res.status(200).json(new ApiResponse(200, {
        totalJobs,
        totalApplications,
        totalUsers,
        recentApplications
    }, "Stats fetched"));
});

// Application Management
const getAllApplicationsAdmin = asyncHandler(async(req, res) => {
    const { page = 1, limit = 10, status } = req.query;

    let filter = {};
    if (status) {
        filter.status = status;
    }

    const applications = await Application.find(filter)
        .populate('jobId', 'title company')
        .populate('userId', 'email name')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ appliedDate: -1 });

    const total = await Application.countDocuments(filter);

    return res.status(200).json(new ApiResponse(200, {
        applications,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
    }, "Applications fetched"));
});

const getApplicationsByJobAdmin = asyncHandler(async(req, res) => {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId })
        .populate('userId', 'email name phone')
        .sort({ appliedDate: -1 });

    return res.status(200).json(new ApiResponse(200, applications, "Job applications fetched"));
});

const updateApplicationStatusAdmin = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const application = await Application.findByIdAndUpdate(
        id,
        { status, adminNotes },
        { new: true }
    ).populate('jobId userId');

    if (!application) {
        return res.status(404).json(new ApiResponse(404, null, "Application not found"));
    }

    return res.status(200).json(new ApiResponse(200, application, "Application updated"));
});

// User Management
const getAllUsers = asyncHandler(async(req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
        .select('-accessToken -refreshToken')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    return res.status(200).json(new ApiResponse(200, {
        users,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total
    }, "Users fetched"));
});

const updateUserRole = asyncHandler(async(req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
        return res.status(400).json(new ApiResponse(400, null, "Invalid role"));
    }

    const user = await User.findByIdAndUpdate(
        id,
        { role },
        { new: true }
    ).select('-accessToken -refreshToken');

    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    return res.status(200).json(new ApiResponse(200, user, "User role updated"));
});

export {
    getAllJobsAdmin,
    updateJobStatus,
    getJobStats,
    getAllApplicationsAdmin,
    getApplicationsByJobAdmin,
    updateApplicationStatusAdmin,
    getAllUsers,
    updateUserRole
}
