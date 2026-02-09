import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const checkAdminRole = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.sub);

    if (!user || user.role !== 'admin') {
        return res.status(403).json(new ApiResponse(403, null, "Admin access required"));
    }

    next();
});

export { checkAdminRole }
