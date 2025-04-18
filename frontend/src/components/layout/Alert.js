import React from 'react';

const Alert = ({ alerts }) => {
  return (
    <div className="alert-wrapper">
      {alerts.length > 0 &&
        alerts.map(alert => (
          <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.msg}
          </div>
        ))}
    </div>
  );
};

export default Alert; 