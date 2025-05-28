import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {

  if (!Array.isArray(leaderboards) || leaderboards.length === 0) {
    return <p>Belum ada data leaderboard.</p>;
  }

  return (
    <div className="leaderboard-list">
      <div className="leaderboard-header">
        <p>Users</p>
        <p>Scores</p>
      </div>
      {leaderboards.map((item) => (
        <LeaderboardItem key={item.user.id} user={item.user} score={item.score} />
      ))}

    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.array.isRequired,
};

export default LeaderboardList;
