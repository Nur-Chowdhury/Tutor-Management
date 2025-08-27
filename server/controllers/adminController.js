import User from "../models/User.js";
import Ad from "../models/Ad.js";
import { errorHandler } from "../utils/errorHandler.js";

export const makeUserAdmin = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id); 
  
      if (!user) {
        return next(errorHandler("User not found", 404));
      }
  
      user.admin = true;
      await user.save(); 
  
      res.status(200).json({
        success: true,
        message: "User is now an admin.", 
      });
    } catch (error) {
      return next(errorHandler("Failed to make the user admin", 500));
    }
};

export const deleteAd = async (req, res, next) => {
    try {
      const { id } = req.params;
      const ad = await Ad.findById(id); 
  
      if (!ad) {
        return next(errorHandler("Ad not found!", 404));
      }
  
      await ad.deleteOne({ _id: id }); 
  
      res.status(200).json({
        success: true,
        message: "Ad deleted successfully!", 
      });
    } catch (error) {
      return next(errorHandler("Failed to delete Ad!", 500));
    }
};
  
  
export const approveAd = async (req, res, next) => {
    try {
      const { id } = req.params;
      const ad = await Ad.findById(id); 
  
      if (!ad) {
        return next(errorHandler("Ad not found!", 404));
      }
  
      ad.accepted = true;
      await ad.save(); 
  
      res.status(200).json({
        success: true,
        message: "Ad Approved successfully!", 
      });
    } catch (error) {
      return next(errorHandler("Failed to approve ad!", 500));
    }
};