const Chat = require('../models/chat');
const User = require('../models/user');

exports.postChat = async (req, res, next) => {
    const { chat: message, userId } = req.body; // Destructure message and userId directly from body

    // Object to be saved in the database
    const chatData = {
        chat: message,
        userId: userId // Assuming your Chat model has a foreign key 'userId'
    };

    try {
        // Create a new chat entry in the database
        const result = await Chat.create(chatData);
        // Respond back to the client with success and the created chat data
        res.status(201).json({ success: true, message: 'Chat saved successfully', data: result });
    } catch (err) {
        // Log the error and respond back with failure message
        console.error('Error saving chat:', err);
        res.status(500).json({ success: false, message: 'Failed to save chat', error: err.message });
    }
};

