import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from the API
    // Here we're using mock data
    const fetchUsers = async () => {
      try {
        // Simulating API delay
        setTimeout(() => {
          const mockUsers = [
            {
              id: '1',
              name: 'John Doe',
              location: 'New York, NY',
              interests: ['Photography', 'Music', 'Travel'],
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
            },
            {
              id: '2',
              name: 'Jane Smith',
              location: 'Los Angeles, CA',
              interests: ['Hiking', 'Art', 'Cooking'],
              avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
            },
            {
              id: '3',
              name: 'Michael Johnson',
              location: 'Chicago, IL',
              interests: ['Gaming', 'Movies', 'Technology'],
              avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
            },
            {
              id: '4',
              name: 'Emily Davis',
              location: 'Austin, TX',
              interests: ['Yoga', 'Reading', 'Nature'],
              avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
            }
          ];
          setUsers(mockUsers);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching users:', err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className="container">
      <h1 className="large text-primary">Discover People</h1>
      <p className="lead">
        <i className="fas fa-users"></i> Find and connect with people around you
      </p>

      <div className="search-bar">
        <div className="form">
          <div className="form-group">
            <input type="text" placeholder="Search by name, interest, or location..." />
            <button className="btn btn-primary">
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loader">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      ) : (
        <div className="profiles">
          {users.length > 0 ? (
            users.map(user => (
              <div key={user.id} className="profile card">
                <div className="profile-img">
                  <img src={user.avatar} alt={user.name} />
                </div>
                <div className="profile-details">
                  <h2>{user.name}</h2>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> {user.location}
                  </p>
                  <div className="interests">
                    {user.interests.map((interest, index) => (
                      <span key={index} className="badge">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="profile-actions">
                  <Link to={`/profile/${user.id}`} className="btn btn-primary">
                    View Profile
                  </Link>
                  <button className="btn btn-light">
                    <i className="fas fa-user-plus"></i> Connect
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No users found...</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Home; 