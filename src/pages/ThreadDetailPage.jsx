import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../utils/api';
import { asyncAddComment } from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import VoteButtons from '../components/VoteButtons';
import {
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralUpVoteThreadDetail
} from '../states/threadDetail/action';

import { useSelector } from 'react-redux';

export default function ThreadDetailPage() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const data = await api.getThreadById(id);
        setThread(data.detailThread);
      } catch (err) {
        console.error('Error fetching thread detail:', err);
      }
    };

    fetchThread();
  }, [id]);

  const handleAddComment = ({ content, commentTo }) => {
    dispatch(asyncAddComment({ content, commentTo }));
  };

  if (!thread) return <p>Thread not found.</p>;

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
    <div className="thread-detail-container">
      <ThreadDetail
        title={thread.title}
        category={thread.category}
        createdAt={thread.createdAt}
        owner={thread.owner}
        body={thread.body}
      />

      <div className="vote-controls">
        <VoteButtons
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={handleUpVote}
          onDownVote={handleDownVote}
          upCount={thread.upVotesBy.length}
          downCount={thread.downVotesBy.length}
        />
      </div>

      <div className="comments-section">
        <h3>Komentar</h3>
        <CommentForm threadId={id} onAddComment={handleAddComment} />
        <CommentList comments={thread.comments} threadId={thread.id} />
      </div>
    </div>
  );
}
