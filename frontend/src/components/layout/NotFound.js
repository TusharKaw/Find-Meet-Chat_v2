import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="container">
      <div className="not-found">
        <h1 className="x-large text-primary">
          <i className="fas fa-exclamation-triangle"></i> Page Not Found
        </h1>
        <p className="large">Sorry, this page does not exist</p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound; 