import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

export default function VoteButtons({ isUpVoted, isDownVoted, onUpVote, onDownVote, upCount, downCount }) {
  return (
    <div className="vote-controls">
      <button onClick={onUpVote} style={{ color: isUpVoted ? 'blue' : 'gray' }}>
        <FaThumbsUp /> <span>{upCount}</span>
      </button>
      <button onClick={onDownVote} style={{ color: isDownVoted ? 'red' : 'gray' }}>
        <FaThumbsDown /> <span>{downCount}</span>
      </button>
    </div>
  );
}

VoteButtons.propTypes = {
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  upCount: PropTypes.number.isRequired,
  downCount: PropTypes.number.isRequired,
};
