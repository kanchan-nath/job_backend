import { Router } from "express";
import {
    getUserProfile,
    updateUserProfile,
    createOrUpdateUser
} from "../controllers/user.controller.js";
// import { checkJwt } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/user/profile")
    .get(getUserProfile)
    .put(updateUserProfile);

router.route("/user/sync")
    .post(createOrUpdateUser);

export default router;
