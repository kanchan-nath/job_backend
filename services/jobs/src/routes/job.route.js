import { Router } from "express";
import {
    createNewJob,
    getAllJobs,
    deleteJob,
    getJobById,
    updateJob
} from "../controllers/job.controller.js";

const router = Router();

router.route("/jobs")
    .post(createNewJob)
    .get(getAllJobs);

router.route("/jobs/:id")
    .get(getJobById)
    .put(updateJob)
    .delete(deleteJob);

export default router;
