import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import Chat from "../models/chat.model.js";
import { errorUtil } from "../config/utils/errorUtil.js";

export const sendMessage = async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    next(errorUtil(400, "Please provide content and chatId to send a message"));
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json({
      success: true,
      message: "Message sent successfully",
      result: message,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json({
      success: true,
      message: "Messages fetched successfully",
      result: messages,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
