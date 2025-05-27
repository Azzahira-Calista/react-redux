// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import api from '../utils/api';
// import { useDispatch } from 'react-redux';
// import { asyncAddComment } from '../states/threadDetail/action';

// export default function ThreadDetailPage() {
//   const { id } = useParams();
//   const [thread, setThread] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [commentContent, setCommentContent] = useState('');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchThread = async () => {
//       try {
//         const data = await api.getThreadById(id);
//         setThread(data.detailThread);
//       } catch (err) {
//         console.error('Error fetching thread detail:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchThread();
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!commentContent.trim()) return;

//     dispatch(asyncAddComment({ content: commentContent, commentTo: id }));
//     setCommentContent('');
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!thread) return <p>Thread not found.</p>;

//   const { title, body, category, createdAt, owner, comments } = thread;

//   return (
//     <div className="thread-detail-container">
//       <h2 className="thread-title">{title}</h2>
//       <div className="thread-meta">
//         <span className="category">Category: {category}</span>
//         <span className="created-at">Created At: {new Date(createdAt).toLocaleString()}</span>
//         <div className="owner-info">
//           <img src={owner.avatar} alt={owner.name} className="avatar" />
//           <span>{owner.name}</span>
//         </div>
//       </div>
//       <div className="thread-body" dangerouslySetInnerHTML={{ __html: body }} />

//       <div className="comments-section">
//         <h3>Comments</h3>
//         <form onSubmit={handleSubmit} className="thread-form">
//           <div className="form-group">
//             <label htmlFor="comment">Add a Comment:</label>
//             <textarea
//               id="comment"
//               value={commentContent}
//               onChange={(e) => setCommentContent(e.target.value)}
//               placeholder="Write your comment here..."
//             />
//           </div>
//           <button type="submit" className="submit-btn">Post Comment</button>
//         </form>

//         {comments.length === 0 && <p>No comments yet.</p>}
//         {comments.map((comment) => (
//           <div key={comment.id} className="comment">
//             <div className="comment-owner">
//               <img src={comment.owner.avatar} alt={comment.owner.name} className="avatar" />
//               <span>{comment.owner.name}</span>
//             </div>
//             <div className="comment-content">{comment.content}</div>
//             <div className="comment-date">
//               {new Date(comment.createdAt).toLocaleString()}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import api from '../utils/api';
import { asyncAddComment } from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import VoteButtons from '../components/VoteButtons';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
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
  const authUser = useSelector((state) => state.authUser); // ✅ pindahkan ke sini

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

  // Jangan letakkan useSelector/setHook setelah return
  if (!thread) return <p>Thread not found.</p>;

  // Ini AMAN sekarang karena semua hooks sudah dipanggil di atas
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
        <CommentList comments={thread.comments} />
      </div>
    </div>
  );
}
