import { Router } from "express";
import {
    getAllJobsAdmin,
    updateJobStatus,
    getJobStats,
    getAllApplicationsAdmin,
    getApplicationsByJobAdmin,
    updateApplicationStatusAdmin,
    getAllUsers,
    updateUserRole
} from "../controllers/admin.controller.js";
// import { checkJwt } from "../middleware/auth.middleware.js";
import { checkAdminRole } from "../middleware/adminAuth.middleware.js";

const router = Router();

// Admin middleware - checks JWT and admin role
// router.use(checkJwt);
router.use(checkAdminRole);

// Stats
router.route("/stats").get(getJobStats);

// Jobs management
router.route("/jobs").get(getAllJobsAdmin);
router.route("/jobs/:id/status").put(updateJobStatus);

// Applications management
router.route("/applications").get(getAllApplicationsAdmin);
router.route("/applications/job/:jobId").get(getApplicationsByJobAdmin);
router.route("/applications/:id/status").put(updateApplicationStatusAdmin);

// Users management
router.route("/users").get(getAllUsers);
router.route("/users/:id/role").put(updateUserRole);

export default router;
