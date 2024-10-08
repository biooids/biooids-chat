import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const filters = {
      ...(req.query.userId && { _id: req.query.userId }),
      ...(req.query.searchTerm && {
        userName: { $regex: req.query.searchTerm, $options: "i" }, // search userName, not searchTerm
      }),
    };

    const users = await User.find(filters).select("userName profilePicture");

    const totalUsers = await User.countDocuments(filters);

    res.status(200).json({
      success: true,
      message: "users found",
      users,
      totalUsers,
    });
  } catch (error) {
    next(error);
  }
};
