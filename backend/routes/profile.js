const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/profile
// @desc    Get all profiles for discovery
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Private
router.get('/user/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    
    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, async (req, res) => {
  const { bio, location, interests, twitter, facebook, instagram, linkedin } = req.body;
  
  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (bio) profileFields.bio = bio;
  if (location) profileFields.location = location;
  if (interests) {
    profileFields.interests = interests.split(',').map(interest => interest.trim());
  }
  
  // Build social object
  profileFields.social = {};
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    
    if (profile) {
      // Update profile
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      
      return res.json(profile);
    }
    
    // Create profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/profile
// @desc    Delete profile and user
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/profile/search
// @desc    Search profiles by name, location, or interests
// @access  Private
router.get('/search', auth, async (req, res) => {
  const { query } = req.query;
  
  try {
    if (!query) {
      return res.status(400).json({ msg: 'Search query is required' });
    }
    
    // Search in user name
    const users = await User.find({
      name: { $regex: query, $options: 'i' }
    }).select('_id');
    
    const userIds = users.map(user => user._id);
    
    // Search in profiles
    const profiles = await Profile.find({
      $or: [
        { user: { $in: userIds } },
        { location: { $regex: query, $options: 'i' } },
        { interests: { $regex: query, $options: 'i' } }
      ]
    }).populate('user', ['name', 'avatar']);
    
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 