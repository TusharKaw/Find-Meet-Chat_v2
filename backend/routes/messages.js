const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const User = require('../models/User');

// @route   POST /api/messages
// @desc    Send a new message
// @access  Private
router.post('/', auth, async (req, res) => {
  const { receiver, content } = req.body;

  try {
    // Check if receiver exists
    const receiverUser = await User.findById(receiver);
    if (!receiverUser) {
      return res.status(404).json({ msg: 'Receiver not found' });
    }

    // Create new message
    const newMessage = new Message({
      sender: req.user.id,
      receiver,
      content
    });

    const message = await newMessage.save();
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/messages/:userId
// @desc    Get conversation with a specific user
// @access  Private
router.get('/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/messages/read/:userId
// @desc    Mark all messages from a user as read
// @access  Private
router.put('/read/:userId', auth, async (req, res) => {
  try {
    await Message.updateMany(
      { sender: req.params.userId, receiver: req.user.id, read: false },
      { $set: { read: true } }
    );

    res.json({ msg: 'Messages marked as read' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 