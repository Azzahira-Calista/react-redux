import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboards/action';
import LeaderboardList from '../components/LeaderboardList';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);


  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboard-page">
      <h2>Papan Skor</h2>
      {Array.isArray(leaderboards) && leaderboards.length > 0 && (
        <LeaderboardList leaderboards={leaderboards} />
      )}
    </div>
  );
}

export default LeaderboardPage;
