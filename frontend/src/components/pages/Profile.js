import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    // In a real app, this would fetch from the API
    // Here we're using mock data
    const fetchProfile = async () => {
      try {
        // Simulating API delay
        setTimeout(() => {
          // Mock profile data
          let mockProfile;
          
          if (id === 'me') {
            mockProfile = {
              user: {
                id: 'me',
                name: 'John Smith',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                isCurrentUser: true
              },
              bio: 'Software developer passionate about creating meaningful applications that connect people',
              location: 'San Francisco, CA',
              interests: ['Coding', 'Photography', 'Hiking', 'Reading', 'Travel'],
              social: {
                twitter: 'johnsmith',
                facebook: 'johnsmith',
                instagram: 'johnsmith',
                linkedin: 'johnsmith'
              },
              connections: 47,
              posts: [
                {
                  id: '1',
                  content: 'Just launched my new portfolio website! Check it out at example.com',
                  date: '2023-08-10T14:30:00Z',
                  likes: 24,
                  comments: 8
                },
                {
                  id: '2',
                  content: 'Beautiful day for a hike! #nature #outdoors',
                  image: 'https://source.unsplash.com/random/800x600/?hiking',
                  date: '2023-08-05T10:15:00Z',
                  likes: 35,
                  comments: 12
                }
              ],
              photos: [
                'https://source.unsplash.com/random/300x300/?nature',
                'https://source.unsplash.com/random/300x300/?city',
                'https://source.unsplash.com/random/300x300/?food',
                'https://source.unsplash.com/random/300x300/?travel',
                'https://source.unsplash.com/random/300x300/?technology',
                'https://source.unsplash.com/random/300x300/?people'
              ]
            };
          } else {
            mockProfile = {
              user: {
                id: id,
                name: 'Jane Doe',
                avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                isCurrentUser: false
              },
              bio: 'Travel enthusiast and photographer. Always looking for the next adventure!',
              location: 'New York, NY',
              interests: ['Travel', 'Photography', 'Food', 'Art', 'Music'],
              social: {
                twitter: 'janedoe',
                instagram: 'janedoe',
                linkedin: 'janedoe'
              },
              connections: 128,
              posts: [
                {
                  id: '1',
                  content: 'Just got back from an amazing trip to Japan! The cherry blossoms were incredible.',
                  image: 'https://source.unsplash.com/random/800x600/?japan',
                  date: '2023-08-12T11:45:00Z',
                  likes: 42,
                  comments: 15
                },
                {
                  id: '2',
                  content: 'Favorite coffee spot in the city! ☕',
                  image: 'https://source.unsplash.com/random/800x600/?coffee',
                  date: '2023-08-08T09:20:00Z',
                  likes: 29,
                  comments: 7
                }
              ],
              photos: [
                'https://source.unsplash.com/random/300x300/?japan',
                'https://source.unsplash.com/random/300x300/?travel',
                'https://source.unsplash.com/random/300x300/?coffee',
                'https://source.unsplash.com/random/300x300/?food',
                'https://source.unsplash.com/random/300x300/?architecture',
                'https://source.unsplash.com/random/300x300/?art'
              ]
            };
          }
          
          setProfile(mockProfile);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <section className="container">
        <div className="loader">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      {profile && (
        <div className="profile-grid">
          <div className="profile-top bg-primary">
            <img src={profile.user.avatar} alt={profile.user.name} />
            <h1 className="large">{profile.user.name}</h1>
            <p className="lead">
              <i className="fas fa-map-marker-alt"></i> {profile.location}
            </p>
            <div className="profile-actions">
              {profile.user.isCurrentUser ? (
                <Link to="/settings" className="btn btn-light">
                  <i className="fas fa-edit"></i> Edit Profile
                </Link>
              ) : (
                <>
                  <button className="btn btn-light">
                    <i className="fas fa-user-plus"></i> Connect
                  </button>
                  <Link to={`/messages/${profile.user.id}`} className="btn btn-light">
                    <i className="fas fa-comment"></i> Message
                  </Link>
                </>
              )}
            </div>
            <div className="social-icons">
              {profile.social.twitter && (
                <a href={`https://twitter.com/${profile.social.twitter}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {profile.social.facebook && (
                <a href={`https://facebook.com/${profile.social.facebook}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
              )}
              {profile.social.instagram && (
                <a href={`https://instagram.com/${profile.social.instagram}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {profile.social.linkedin && (
                <a href={`https://linkedin.com/in/${profile.social.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
            </div>
          </div>

          <div className="profile-stats bg-white">
            <div className="stat">
              <span className="stat-value">{profile.connections}</span>
              <span className="stat-label">Connections</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile.posts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-value">{profile.photos.length}</span>
              <span className="stat-label">Photos</span>
            </div>
          </div>

          <div className="profile-tabs">
            <button
              className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <i className="fas fa-user"></i> About
            </button>
            <button
              className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              <i className="fas fa-newspaper"></i> Posts
            </button>
            <button
              className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              <i className="fas fa-image"></i> Photos
            </button>
          </div>

          <div className="profile-content bg-white">
            {activeTab === 'about' && (
              <div className="profile-about">
                <h2 className="text-primary">About</h2>
                <p>{profile.bio}</p>
                <div className="line"></div>
                <h2 className="text-primary">Interests</h2>
                <div className="interests">
                  {profile.interests.map((interest, index) => (
                    <span key={index} className="badge">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="profile-posts">
                <h2 className="text-primary">Recent Posts</h2>
                {profile.posts.length > 0 ? (
                  profile.posts.map(post => (
                    <div key={post.id} className="post">
                      <div className="post-header">
                        <img src={profile.user.avatar} alt={profile.user.name} className="post-avatar" />
                        <div className="post-info">
                          <h4>{profile.user.name}</h4>
                          <p className="post-date">{formatDate(post.date)}</p>
                        </div>
                      </div>
                      <div className="post-content">
                        <p>{post.content}</p>
                        {post.image && (
                          <img src={post.image} alt="Post" className="post-image" />
                        )}
                      </div>
                      <div className="post-actions">
                        <button className="btn-like">
                          <i className="fas fa-heart"></i> {post.likes}
                        </button>
                        <button className="btn-comment">
                          <i className="fas fa-comment"></i> {post.comments}
                        </button>
                        <button className="btn-share">
                          <i className="fas fa-share"></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No posts yet</p>
                )}
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="profile-photos">
                <h2 className="text-primary">Photos</h2>
                <div className="photos-grid">
                  {profile.photos.map((photo, index) => (
                    <div key={index} className="photo-item">
                      <img src={photo} alt={`Photo ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile; 