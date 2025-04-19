import React, { useState, useEffect, useRef } from 'react';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messageEndRef = useRef(null);

  useEffect(() => {
    // In a real app, this would fetch from the API
    // Here we're using mock data
    const fetchConversations = async () => {
      try {
        // Simulating API delay
        setTimeout(() => {
          const mockConversations = [
            {
              id: '1',
              user: {
                id: '5',
                name: 'Sarah Johnson',
                avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
                isOnline: true
              },
              lastMessage: {
                text: 'Hey, how are you doing?',
                date: '2023-08-15T12:00:00Z',
                isRead: true
              }
            },
            {
              id: '2',
              user: {
                id: '6',
                name: 'David Brown',
                avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
                isOnline: false
              },
              lastMessage: {
                text: 'Let me know when you\'re free to meet up',
                date: '2023-08-14T15:30:00Z',
                isRead: false
              }
            },
            {
              id: '3',
              user: {
                id: '7',
                name: 'Lisa Wilson',
                avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
                isOnline: true
              },
              lastMessage: {
                text: 'Thanks for the recommendation!',
                date: '2023-08-13T09:45:00Z',
                isRead: true
              }
            }
          ];

          setConversations(mockConversations);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the messages when they change
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (activeConversation) {
      setLoading(true);
      // In a real app, this would fetch from the API
      // Here we're using mock data
      setTimeout(() => {
        const mockMessages = [
          {
            id: '1',
            sender: activeConversation.user.id,
            text: 'Hey, how are you?',
            date: '2023-08-15T10:00:00Z'
          },
          {
            id: '2',
            sender: 'me',
            text: 'I\'m good! Just working on a new project. How about you?',
            date: '2023-08-15T10:05:00Z'
          },
          {
            id: '3',
            sender: activeConversation.user.id,
            text: 'I\'m doing well too. What project are you working on?',
            date: '2023-08-15T10:10:00Z'
          },
          {
            id: '4',
            sender: 'me',
            text: 'A social networking app called Find-Meet-Chat. It\'s going to help people connect based on common interests.',
            date: '2023-08-15T10:15:00Z'
          },
          {
            id: '5',
            sender: activeConversation.user.id,
            text: 'That sounds really interesting! I\'d love to hear more about it.',
            date: '2023-08-15T10:20:00Z'
          }
        ];
        setMessages(mockMessages);
        setLoading(false);
      }, 1000);
    }
  }, [activeConversation]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'me',
      text: newMessage,
      date: new Date().toISOString()
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Messages</h1>
      <p className="lead">
        <i className="fas fa-comment-dots"></i> Chat with your connections
      </p>

      <div className="messages-container">
        <div className="conversations-list">
          <div className="search-bar">
            <input type="text" placeholder="Search conversations..." />
          </div>
          <div className="conversations">
            {loading && !activeConversation ? (
              <div className="loader-small">
                <i className="fas fa-spinner fa-spin"></i> Loading conversations...
              </div>
            ) : (
              conversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={`conversation ${
                    activeConversation?.id === conversation.id ? 'active' : ''
                  } ${!conversation.lastMessage.isRead ? 'unread' : ''}`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <div className="avatar-container">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="conversation-avatar"
                    />
                    {conversation.user.isOnline && (
                      <span className="online-indicator"></span>
                    )}
                  </div>
                  <div className="conversation-details">
                    <div className="conversation-header">
                      <h3>{conversation.user.name}</h3>
                      <span className="conversation-time">
                        {formatDate(conversation.lastMessage.date)}
                      </span>
                    </div>
                    <p className="conversation-last-message">
                      {conversation.lastMessage.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="chat-area">
          {activeConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <img
                    src={activeConversation.user.avatar}
                    alt={activeConversation.user.name}
                    className="chat-avatar"
                  />
                  <div className="chat-user-details">
                    <h3>{activeConversation.user.name}</h3>
                    <span className={`status ${activeConversation.user.isOnline ? 'online' : 'offline'}`}>
                      {activeConversation.user.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="btn-icon">
                    <i className="fas fa-phone"></i>
                  </button>
                  <button className="btn-icon">
                    <i className="fas fa-video"></i>
                  </button>
                  <button className="btn-icon">
                    <i className="fas fa-info-circle"></i>
                  </button>
                </div>
              </div>

              <div className="chat-messages">
                {loading ? (
                  <div className="loader">
                    <i className="fas fa-spinner fa-spin fa-2x"></i>
                  </div>
                ) : (
                  <>
                    {messages.map(message => (
                      <div
                        key={message.id}
                        className={`message ${
                          message.sender === 'me' ? 'message-self' : 'message-other'
                        }`}
                      >
                        <div className="message-content">
                          <p>{message.text}</p>
                          <span className="message-time">
                            {formatTime(message.date)}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div ref={messageEndRef} />
                  </>
                )}
              </div>

              <form className="message-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                />
                <button type="submit" disabled={!newMessage.trim()}>
                  <i className="fas fa-paper-plane"></i> Send
                </button>
              </form>
            </>
          ) : (
            <div className="no-conversation-selected">
              <i className="fas fa-comment-dots fa-3x"></i>
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Messages; 