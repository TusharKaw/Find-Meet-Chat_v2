import React, { useState, useEffect } from 'react';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('received');

  useEffect(() => {
    // In a real app, this would fetch from the API
    // Here we're using mock data
    const fetchRequests = async () => {
      try {
        // Simulating API delay
        setTimeout(() => {
          const mockRequests = [
            {
              id: '1',
              user: {
                id: '5',
                name: 'Sarah Johnson',
                avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
              },
              date: '2023-08-15T12:00:00Z'
            },
            {
              id: '2',
              user: {
                id: '6',
                name: 'David Brown',
                avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
              },
              date: '2023-08-14T15:30:00Z'
            }
          ];

          const mockSentRequests = [
            {
              id: '3',
              user: {
                id: '7',
                name: 'Lisa Wilson',
                avatar: 'https://randomuser.me/api/portraits/women/7.jpg'
              },
              date: '2023-08-13T09:45:00Z'
            }
          ];

          setRequests(mockRequests);
          setSentRequests(mockSentRequests);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching requests:', err);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = id => {
    // In a real app, this would send a request to the API
    setRequests(requests.filter(request => request.id !== id));
    // Then show a success message
  };

  const handleReject = id => {
    // In a real app, this would send a request to the API
    setRequests(requests.filter(request => request.id !== id));
    // Then show a success message
  };

  const handleCancel = id => {
    // In a real app, this would send a request to the API
    setSentRequests(sentRequests.filter(request => request.id !== id));
    // Then show a success message
  };

  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Connection Requests</h1>
      <p className="lead">
        <i className="fas fa-user-plus"></i> Manage your connection requests
      </p>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'received' ? 'active' : ''}`}
          onClick={() => setActiveTab('received')}
        >
          Received Requests <span className="badge">{requests.length}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'sent' ? 'active' : ''}`}
          onClick={() => setActiveTab('sent')}
        >
          Sent Requests <span className="badge">{sentRequests.length}</span>
        </button>
      </div>

      {loading ? (
        <div className="loader">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      ) : (
        <div className="requests-container">
          {activeTab === 'received' ? (
            <>
              {requests.length > 0 ? (
                requests.map(request => (
                  <div key={request.id} className="request-card card">
                    <div className="request-info">
                      <img
                        src={request.user.avatar}
                        alt={request.user.name}
                        className="request-avatar"
                      />
                      <div className="request-details">
                        <h3>{request.user.name}</h3>
                        <p className="text-muted">
                          Sent on {formatDate(request.date)}
                        </p>
                      </div>
                    </div>
                    <div className="request-actions">
                      <button
                        className="btn btn-success"
                        onClick={() => handleAccept(request.id)}
                      >
                        <i className="fas fa-check"></i> Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleReject(request.id)}
                      >
                        <i className="fas fa-times"></i> Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No connection requests received</p>
              )}
            </>
          ) : (
            <>
              {sentRequests.length > 0 ? (
                sentRequests.map(request => (
                  <div key={request.id} className="request-card card">
                    <div className="request-info">
                      <img
                        src={request.user.avatar}
                        alt={request.user.name}
                        className="request-avatar"
                      />
                      <div className="request-details">
                        <h3>{request.user.name}</h3>
                        <p className="text-muted">
                          Sent on {formatDate(request.date)}
                        </p>
                      </div>
                    </div>
                    <div className="request-actions">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(request.id)}
                      >
                        <i className="fas fa-ban"></i> Cancel
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No connection requests sent</p>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Requests; 