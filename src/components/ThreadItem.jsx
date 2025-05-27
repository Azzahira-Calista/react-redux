import { Link } from 'react-router-dom';
import { FaComments, FaTag, FaUserCircle } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { asyncToggleUpVoteThreadDetail, asyncToggleDownVoteThreadDetail, asyncToggleNeutralUpVoteThreadDetail } from '../states/threadDetail/action';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';


export default function ThreadItem({ thread, users }) {
  const {
    id,
    title,
    body,
    category,
    createdAt,
    totalComments,
    ownerId,
  } = thread;

  const user = users.find((u) => u.id === ownerId);

  const handleClick = () => {
    console.log('Thread:', thread);
    console.log('id:', thread.id);
    console.log('id:', id);

  };

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
      dispatch(asyncToggleNeutralUpVoteThreadDetail(thread.id)); // ✅ ini neutral
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
        onClick={handleClick}
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
        <span><div className="vote-controls">
          <button
            onClick={handleUpVote}
            aria-label="Upvote"
            style={{ color: isUpVoted ? 'blue' : 'gray' }}
          >
            <FaThumbsUp />
            <span>{thread.upVotesBy.length}</span>
          </button>

          <button
            onClick={handleDownVote}
            aria-label="Downvote"
            style={{ color: isDownVoted ? 'red' : 'gray' }}
          >
            <FaThumbsDown />
            <span>{thread.downVotesBy.length}</span>
          </button>
        </div>

        </span>
        <span>{new Date(createdAt).toLocaleString()}</span>
        <span>
          <FaComments className="icon" /> {totalComments} komentar
        </span>
      </div>
    </div>
  );
}

