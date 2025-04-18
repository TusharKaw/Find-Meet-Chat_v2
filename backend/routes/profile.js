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

module.exports = router; 