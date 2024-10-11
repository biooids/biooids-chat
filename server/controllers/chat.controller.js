import { errorUtil } from "../config/utils/errorUtil.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
export const accessChat = async (req, res, next) => {
  const { userId } = req.body;
  console.log("data from req body", req.body);

  if (!userId) {
    next(errorUtil(400, "userId not sent with request"));
  }
  // if (req.user.id.toString() === userId) {
  //   return next(errorUtil(400, "Cannot create a chat with yourself"));
  // }

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "userName profilePicture",
  });

  if (isChat.length > 0) {
    res.send({ success: true, message: "chats accessed", results: isChat[0] });
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res
        .status(200)
        .json({ success: true, message: "chats accessed", results: FullChat });
    } catch (error) {
      next(errorUtil(500, error.message));
    }
  }
};

export const fetchChats = async (req, res, next) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "userName profilePicture",
        });

        res
          .status(200)
          .send({ success: true, message: "chats fetched", results });
      });
  } catch (error) {
    next(errorUtil(500, error.message));
  }
};

export const createGroup = async (req, res, next) => {
  const { users, name } = req.body;
  if (!users || !name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }
  console.log(users);

  if (users.length < 3) {
    return next(
      errorUtil(
        400,
        "Group must have at least 3 users, means two  including you. Please select more users."
      )
    );
  }

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user.id,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json({
      success: true,
      message: "Group Chat created successfully",
      result: fullGroupChat,
    });
  } catch (error) {
    next(errorUtil(500, error.message));
  }
};

export const updateGroup = async (req, res, next) => {
  const { groupId, users, name } = req.body;
  if (!groupId || (!users && !name)) {
    return next(
      errorUtil(
        400,
        "Please provide group Id and at least one user or group name"
      )
    );
  }

  try {
    // Find the group by ID
    const groupChat = await Chat.findById(groupId);
    if (!groupChat) {
      return res.status(404).send({ message: "Group not found" });
    }

    // Ensure the user making the request is the group admin
    if (groupChat.groupAdmin.toString() !== req.user.id) {
      return res
        .status(403)
        .send({ message: "Only the group admin can update the group" });
    }

    // Update group details if provided
    if (name) groupChat.chatName = name;
    if (users && users.length >= 3) {
      groupChat.users = users;
    } else if (users) {
      return next(
        errorUtil(
          400,
          "Group must have at least 3 users, including you. Please select more users."
        )
      );
    }

    // Save updated group
    await groupChat.save();

    const updatedGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({
      success: true,
      message: "Group Chat updated successfully",
      result: updatedGroupChat,
    });
  } catch (error) {
    next(errorUtil(500, error.message));
  }
};

export const renameGroup = async (req, res, next) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    next(errorUtil(404, "Chat Not Found"));
  } else {
    res.json(updatedChat);
  }
};

export const addToGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    next(errorUtil(404, "Chat Not Found"));
  } else {
    res.json({
      success: true,
      message: "User added to group successfully",
      result: added,
    });
  }
};

export const removeFromGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    next(errorUtil(404, "Chat Not Found"));
  } else {
    res.json(removed);
  }
};
