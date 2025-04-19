const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Request = require('../models/Request');
const User = require('../models/User');

// @route   POST /api/requests
// @desc    Send a connection request
// @access  Private
router.post('/', auth, async (req, res) => {
  const { receiver } = req.body;

  try {
    // Check if receiver exists
    const receiverUser = await User.findById(receiver);
    if (!receiverUser) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if sender is trying to send request to themselves
    if (receiver === req.user.id) {
      return res.status(400).json({ msg: 'Cannot send connection request to yourself' });
    }

    // Check if request already exists
    const existingRequest = await Request.findOne({
      $or: [
        { sender: req.user.id, receiver },
        { sender: receiver, receiver: req.user.id }
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ msg: 'Connection request already exists' });
    }

    // Create new request
    const newRequest = new Request({
      sender: req.user.id,
      receiver
    });

    const request = await newRequest.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/requests/received
// @desc    Get all received connection requests
// @access  Private
router.get('/received', auth, async (req, res) => {
  try {
    const requests = await Request.find({ 
      receiver: req.user.id,
      status: 'pending'
    }).populate('sender', ['name', 'avatar']);
    
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/requests/sent
// @desc    Get all sent connection requests
// @access  Private
router.get('/sent', auth, async (req, res) => {
  try {
    const requests = await Request.find({ 
      sender: req.user.id,
      status: 'pending'
    }).populate('receiver', ['name', 'avatar']);
    
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/requests/:id/accept
// @desc    Accept a connection request
// @access  Private
router.put('/:id/accept', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    
    // Check if the request is for the current user
    if (request.receiver.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to accept this request' });
    }
    
    // Update request status
    request.status = 'accepted';
    await request.save();
    
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/requests/:id/reject
// @desc    Reject a connection request
// @access  Private
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    
    // Check if the request is for the current user
    if (request.receiver.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to reject this request' });
    }
    
    // Update request status
    request.status = 'rejected';
    await request.save();
    
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/requests/:id
// @desc    Cancel a sent connection request
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    
    // Check if the request was sent by the current user
    if (request.sender.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to cancel this request' });
    }
    
    await request.remove();
    
    res.json({ msg: 'Request canceled' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/requests/connections
// @desc    Get all accepted connections
// @access  Private
router.get('/connections', auth, async (req, res) => {
  try {
    // Find all accepted requests where the user is either sender or receiver
    const requests = await Request.find({ 
      $or: [
        { sender: req.user.id, status: 'accepted' },
        { receiver: req.user.id, status: 'accepted' }
      ]
    });
    
    // Extract the IDs of connected users
    const connectionIds = requests.map(request => {
      return request.sender.toString() === req.user.id ? 
        request.receiver.toString() : 
        request.sender.toString();
    });
    
    // Find all users corresponding to the connection IDs
    const connections = await User.find({
      _id: { $in: connectionIds }
    }).select('-password');
    
    res.json(connections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 