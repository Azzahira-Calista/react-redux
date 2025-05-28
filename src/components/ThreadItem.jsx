import { Link } from 'react-router-dom';
import { FaComments, FaTag, FaUserCircle } from 'react-icons/fa';
import VoteButtons from './VoteButtons';
import { postedAt } from '../utils';

import { useDispatch, useSelector } from 'react-redux';
import { asyncToggleUpVoteThreadDetail, asyncToggleDownVoteThreadDetail, asyncToggleNeutralUpVoteThreadDetail } from '../states/threadDetail/action';

export default function ThreadItem({ thread, users }) {
  const {
    title,
    body,
    category,
    createdAt,
    totalComments,
    ownerId,
  } = thread;

  const user = users.find((u) => u.id === ownerId);

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const isUpVoted = thread.upVotesBy.includes(authUser?.id);
  const isDownVoted = thread.downVotesBy.includes(authUser?.id);

  const handleUpVote = () => {
    if (isUpVoted) {
      dispatch(asyncToggleNeutralUpVoteThreadDetail(thread.id));
    } else if (isDownVoted) {
      dispatch(asyncToggleNeutralUpVoteThreadDetail(thread.id));
      dispatch(asyncToggleUpVoteThreadDetail(thread.id));
    } else {
      dispatch(asyncToggleUpVoteThreadDetail(thread.id));
    }
  };

  const handleDownVote = () => {
    if (isDownVoted) {
      dispatch(asyncToggleNeutralUpVoteThreadDetail(thread.id));
    } else if (isUpVoted) {
      dispatch(asyncToggleNeutralUpVoteThreadDetail(thread.id));
      dispatch(asyncToggleDownVoteThreadDetail(thread.id));
    } else {
      dispatch(asyncToggleDownVoteThreadDetail(thread.id));
    }
  };

  return (
    <div className="thread-item">
      <Link
        to={`/thread/${thread.id}`}
        className="thread-item-link"
      >
        <div className="thread-header">
          <div className="user-profile">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="avatar" />
            ) : (
              <FaUserCircle className="avatar fallback-avatar" />
            )}
            <span className="user-name">{user?.name || 'Unknown User'}</span>
          </div>
          <div className="thread-category">
            <FaTag className="icon" /> #{category}
          </div>
        </div>

        <h3 className="thread-title">{title}</h3>

        <div
          className="thread-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </Link>

      <div className="thread-meta">
        <VoteButtons
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={handleUpVote}
          onDownVote={handleDownVote}
          upCount={thread.upVotesBy.length}
          downCount={thread.downVotesBy.length}
        />
        <span>{postedAt(createdAt)}</span>
        <span>
          <FaComments className="icon" /> {totalComments} komentar
        </span>
      </div>
    </div>
  );
}