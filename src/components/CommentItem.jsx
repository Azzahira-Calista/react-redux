import PropTypes from 'prop-types';
import VoteButtons from './VoteButtons';
import { postedAt } from '../utils/index.js';

import { useSelector, useDispatch } from 'react-redux';
import {
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
} from '../states/threadDetail/action';

export default function CommentItem({ comment, threadId }) {
  const { id, owner, content, createdAt, upVotesBy, downVotesBy } = comment;
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  const isUpVoted = upVotesBy.includes(authUser?.id);
  const isDownVoted = downVotesBy.includes(authUser?.id);

  const handleUpVote = () => {
    if (isUpVoted) {
      dispatch(asyncToggleNeutralVoteComment(threadId, id));
    } else {
      dispatch(asyncToggleUpVoteComment(threadId, id));
    }
  };

  const handleDownVote = () => {
    if (isDownVoted) {
      dispatch(asyncToggleNeutralVoteComment(threadId, id));
    } else {
      dispatch(asyncToggleDownVoteComment(threadId, id));
    }
  };

  return (
    <div className="comment">
      <div className="comment-owner">
        <img src={owner.avatar} alt={owner.name} className="avatar" />
        <span>{owner.name}</span>
      </div>
      <div className="comment-content">{content}</div>
      <div className="comment-date">{postedAt(createdAt)}</div>


      <VoteButtons
        isUpVoted={isUpVoted}
        isDownVoted={isDownVoted}
        onUpVote={handleUpVote}
        onDownVote={handleDownVote}
        upCount={upVotesBy.length}
        downCount={downVotesBy.length}
      />
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
};