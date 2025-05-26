import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../utils/api';

export default function ThreadDetailPage() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const data = await api.getThreadById(id);
        setThread(data.detailThread);
      } catch (err) {
        console.error('Error fetching thread detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!thread) return <p>Thread not found.</p>;

  const { title, body, category, createdAt, owner, comments } = thread;

  return (
    <div className="thread-detail-container">
      <h2 className="thread-title">{title}</h2>
      <div className="thread-meta">
        <span className="category">Category: {category}</span>
        <span className="created-at">Created At: {new Date(createdAt).toLocaleString()}</span>
        <div className="owner-info">
          <img src={owner.avatar} alt={owner.name} className="avatar" />
          <span>{owner.name}</span>
        </div>
      </div>
      <div
        className="thread-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-owner">
              <img src={comment.owner.avatar} alt={comment.owner.name} className="avatar" />
              <span>{comment.owner.name}</span>
            </div>
            <div className="comment-content">{comment.content}</div>
            <div className="comment-date">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
