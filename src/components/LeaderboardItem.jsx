import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <div className="leaderboard-item">
      <div className="user-info">
        <img src={user.avatar} alt={user.name} className="avatar" />
        <div>
          <p className="name">{user.name}</p>
          <p className="email">{user.email}</p>
        </div>
      </div>
      <p className="score">{score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
  score: PropTypes.number.isRequired,
};


export default LeaderboardItem;
