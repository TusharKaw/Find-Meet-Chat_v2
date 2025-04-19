import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    interests: '',
    twitter: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // In a real app, this would fetch user data from the API
    // Here we're using mock data
    const fetchUserData = async () => {
      try {
        // Simulating API delay
        setTimeout(() => {
          const userData = {
            name: 'John Smith',
            email: 'john.smith@example.com',
            bio: 'Software developer passionate about creating meaningful applications that connect people',
            location: 'San Francisco, CA',
            interests: 'Coding, Photography, Hiking, Reading, Travel',
            twitter: 'johnsmith',
            facebook: 'johnsmith',
            instagram: 'johnsmith',
            linkedin: 'johnsmith'
          };
          setFormData({
            ...formData,
            ...userData
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const { 
    name, 
    email, 
    bio, 
    location, 
    interests, 
    twitter, 
    facebook, 
    instagram, 
    linkedin,
    currentPassword,
    newPassword,
    confirmPassword
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitProfile = e => {
    e.preventDefault();
    // In a real app, this would send the updated profile data to the API
    console.log('Profile updated');
    // Show success message
  };

  const onSubmitPassword = e => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      // Show error message
      console.error('Passwords do not match');
      return;
    }
    // In a real app, this would send the password update request to the API
    console.log('Password updated');
    // Show success message and clear password fields
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const onSubmitPrivacy = e => {
    e.preventDefault();
    // In a real app, this would send the privacy settings to the API
    console.log('Privacy settings updated');
    // Show success message
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Settings</h1>
      <p className="lead">
        <i className="fas fa-user-cog"></i> Manage your account settings
      </p>

      <div className="settings-container">
        <div className="settings-sidebar">
          <ul>
            <li
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user"></i> Profile
            </li>
            <li
              className={activeTab === 'password' ? 'active' : ''}
              onClick={() => setActiveTab('password')}
            >
              <i className="fas fa-lock"></i> Password
            </li>
            <li
              className={activeTab === 'privacy' ? 'active' : ''}
              onClick={() => setActiveTab('privacy')}
            >
              <i className="fas fa-shield-alt"></i> Privacy
            </li>
            <li
              className={activeTab === 'notifications' ? 'active' : ''}
              onClick={() => setActiveTab('notifications')}
            >
              <i className="fas fa-bell"></i> Notifications
            </li>
            <li
              className={activeTab === 'account' ? 'active' : ''}
              onClick={() => setActiveTab('account')}
            >
              <i className="fas fa-user-circle"></i> Account
            </li>
          </ul>
        </div>

        <div className="settings-content">
          {loading ? (
            <div className="loader">
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
          ) : (
            <>
              {activeTab === 'profile' && (
                <div className="tab-content">
                  <h2>Profile Information</h2>
                  <p className="text-muted">Update your personal information</p>
                  <form className="form" onSubmit={onSubmitProfile}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        name="bio"
                        value={bio}
                        onChange={onChange}
                        placeholder="Tell us about yourself"
                        rows="4"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={onChange}
                        placeholder="City, State"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="interests">Interests</label>
                      <input
                        type="text"
                        name="interests"
                        value={interests}
                        onChange={onChange}
                        placeholder="Comma separated list of interests"
                      />
                      <small className="form-text">
                        Please use comma separated values (eg. Coding, Photography, Travel)
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Social Media Links</label>
                      <div className="form-social">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-twitter"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            name="twitter"
                            value={twitter}
                            onChange={onChange}
                            placeholder="Twitter Username"
                          />
                        </div>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-facebook"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            name="facebook"
                            value={facebook}
                            onChange={onChange}
                            placeholder="Facebook Username"
                          />
                        </div>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-instagram"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            name="instagram"
                            value={instagram}
                            onChange={onChange}
                            placeholder="Instagram Username"
                          />
                        </div>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fab fa-linkedin"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            name="linkedin"
                            value={linkedin}
                            onChange={onChange}
                            placeholder="LinkedIn Username"
                          />
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'password' && (
                <div className="tab-content">
                  <h2>Change Password</h2>
                  <p className="text-muted">Update your password</p>
                  <form className="form" onSubmit={onSubmitPassword}>
                    <div className="form-group">
                      <label htmlFor="currentPassword">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={onChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={onChange}
                        minLength="6"
                        required
                      />
                      <small className="form-text">
                        Password must be at least 6 characters
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        minLength="6"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="tab-content">
                  <h2>Privacy Settings</h2>
                  <p className="text-muted">Control your privacy preferences</p>
                  <form className="form" onSubmit={onSubmitPrivacy}>
                    <div className="form-group">
                      <label>Profile Visibility</label>
                      <div className="radio-group">
                        <div className="radio-option">
                          <input
                            type="radio"
                            name="profileVisibility"
                            id="public"
                            defaultChecked
                          />
                          <label htmlFor="public">
                            <strong>Public</strong> - Anyone can see your profile
                          </label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            name="profileVisibility"
                            id="connections"
                          />
                          <label htmlFor="connections">
                            <strong>Connections Only</strong> - Only your connections can see your profile
                          </label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            name="profileVisibility"
                            id="private"
                          />
                          <label htmlFor="private">
                            <strong>Private</strong> - Your profile is visible only to you
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Who can send you connection requests?</label>
                      <div className="radio-group">
                        <div className="radio-option">
                          <input
                            type="radio"
                            name="connectionRequests"
                            id="everyone"
                            defaultChecked
                          />
                          <label htmlFor="everyone">Everyone</label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            name="connectionRequests"
                            id="friendsOfFriends"
                          />
                          <label htmlFor="friendsOfFriends">Friends of friends</label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            name="connectionRequests"
                            id="nobody"
                          />
                          <label htmlFor="nobody">Nobody</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Who can see your email address?</label>
                      <div className="radio-group">
                        <div className="radio-option">
                          <input
                            type="radio"
                            name="emailVisibility"
                            id="emailPublic"
                          />
                          <label htmlFor="emailPublic">Everyone</label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            name="emailVisibility"
                            id="emailConnections"
                            defaultChecked
                          />
                          <label htmlFor="emailConnections">Connections Only</label>
                        </div>
                        <div className="radio-option">
                          <input
                            type="radio"
                            name="emailVisibility"
                            id="emailPrivate"
                          />
                          <label htmlFor="emailPrivate">Nobody</label>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Save Privacy Settings
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="tab-content">
                  <h2>Notification Preferences</h2>
                  <p className="text-muted">Manage how you receive notifications</p>
                  <form className="form">
                    <div className="form-group">
                      <label>Email Notifications</label>
                      <div className="checkbox-group">
                        <div className="checkbox-option">
                          <input
                            type="checkbox"
                            id="emailConnectionRequests"
                            defaultChecked
                          />
                          <label htmlFor="emailConnectionRequests">
                            Connection requests
                          </label>
                        </div>
                        <div className="checkbox-option">
                          <input
                            type="checkbox"
                            id="emailMessages"
                            defaultChecked
                          />
                          <label htmlFor="emailMessages">
                            Messages
                          </label>
                        </div>
                        <div className="checkbox-option">
                          <input
                            type="checkbox"
                            id="emailProfileViews"
                            defaultChecked
                          />
                          <label htmlFor="emailProfileViews">
                            Profile views
                          </label>
                        </div>
                        <div className="checkbox-option">
                          <input
                            type="checkbox"
                            id="emailUpdates"
                            defaultChecked
                          />
                          <label htmlFor="emailUpdates">
                            App updates and news
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Push Notifications</label>
                      <div className="checkbox-group">
                        <div className="checkbox-option">
                          <input
                            type="checkbox"
                            id="pushConnectionRequests"
                            defaultChecked
                          />
                          <label htmlFor="pushConnectionRequests">
                            Connection requests
                          </label>
                        </div>
                        <div className="checkbox-option">
                          <input
                            type="checkbox"
                            id="pushMessages"
                            defaultChecked
                          />
                          <label htmlFor="pushMessages">
                            Messages
                          </label>
                        </div>
                        <div className="checkbox-option">
                          <input
                            type="checkbox"
                            id="pushProfileViews"
                            defaultChecked
                          />
                          <label htmlFor="pushProfileViews">
                            Profile views
                          </label>
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Save Notification Settings
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="tab-content">
                  <h2>Account Settings</h2>
                  <p className="text-muted">Manage your account</p>
                  
                  <div className="account-section">
                    <h3>Account Status</h3>
                    <p>Your account is <span className="badge badge-success">Active</span></p>
                  </div>
                  
                  <div className="account-section">
                    <h3>Data Download</h3>
                    <p>Download a copy of your data</p>
                    <button className="btn btn-light">
                      <i className="fas fa-download"></i> Request Data Download
                    </button>
                  </div>
                  
                  <div className="account-section danger-zone">
                    <h3>Danger Zone</h3>
                    <p>The following actions are irreversible</p>
                    
                    <div className="danger-action">
                      <div>
                        <h4>Deactivate Account</h4>
                        <p>Temporarily disable your account</p>
                      </div>
                      <button className="btn btn-warning">
                        Deactivate
                      </button>
                    </div>
                    
                    <div className="danger-action">
                      <div>
                        <h4>Delete Account</h4>
                        <p>Permanently delete your account and all data</p>
                      </div>
                      <button className="btn btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Settings; 