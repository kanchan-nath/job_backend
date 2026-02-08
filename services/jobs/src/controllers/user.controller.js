import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.sub).select('-accessToken -refreshToken');
    
    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

const updateUserProfile = asyncHandler(async(req, res) => {
    const { name, picture } = req.body;
    
    const user = await User.findByIdAndUpdate(
        req.user.sub,
        { name, picture },
        { new: true }
    ).select('-accessToken -refreshToken');

    if (!user) {
        return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    return res.status(200).json(new ApiResponse(200, user, "User profile updated successfully"));
});

const createOrUpdateUser = asyncHandler(async(req, res) => {
    const { auth0Id, email, name, picture } = req.body;

    let user = await User.findOne({ auth0Id });

    if (!user) {
        user = await User.create({
            auth0Id,
            email,
            name,
            picture,
            role: 'user'
        });
    } else {
        user = await User.findByIdAndUpdate(
            user._id,
            { name, picture },
            { new: true }
        );
    }

    return res.status(200).json(new ApiResponse(200, user, "User created/updated successfully"));
});

export {
    getUserProfile,
    updateUserProfile,
    createOrUpdateUser
}
