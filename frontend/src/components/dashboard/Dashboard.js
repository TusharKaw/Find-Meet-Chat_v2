import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to your dashboard
      </p>
      <div className="dash-buttons">
        <Link to="/edit-profile" className="btn btn-primary">
          <i className="fas fa-user-circle"></i> Edit Profile
        </Link>
      </div>

      <h2 className="my-2">Recent Connections</h2>
      <div className="profiles">
        <p>No connections found...</p>
      </div>

      <h2 className="my-2">Recent Messages</h2>
      <div className="messages">
        <p>No messages found...</p>
      </div>
    </section>
  );
};

export default Dashboard; 