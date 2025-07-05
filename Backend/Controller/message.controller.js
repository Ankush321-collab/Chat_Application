import Conversation from '../model/conversation.model.js';
import Message from '../model/message.model.js';

// POST /api/message/:id
export const sendmessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverid } = req.params;
    const senderid = req.user._id;

    // Check for existing conversation
    let conversation = await Conversation.findOne({
      members: { $all: [senderid, receiverid] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderid, receiverid],
      });
    }

    // Create message
    const newmessage = new Message({
      senderid,
      receiverid,
      message,
    });

    conversation.messages.push(newmessage._id);

    await Promise.all([conversation.save(), newmessage.save()]);

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newmessage,
    });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET /api/message/:id
export const getmessage = async (req, res) => {
  try {
    const { id: receiverid } = req.params;
    const senderid = req.user._id;

    const conversation = await Conversation.findOne({
      members: { $all: [senderid, receiverid] },
    }).populate({
      path: "messages",
      populate: {
        path: "senderid",
        select: "_id firstname lastname email"
      }
    });

    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Get message error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching messages",
    });
  }
};
