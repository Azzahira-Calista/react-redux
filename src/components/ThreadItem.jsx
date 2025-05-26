import { Link } from 'react-router-dom';
import { FaComments, FaTag, FaUserCircle } from 'react-icons/fa';

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

  return (
    <Link
      to={`/thread/${thread.id}`}
      className="thread-item-link"
      onClick={handleClick}
    >
      <div className="thread-item">
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

        <div className="thread-meta">
          <span>{new Date(createdAt).toLocaleString()}</span>
          <span>
            <FaComments className="icon" /> {totalComments} komentar
          </span>
        </div>
      </div>
    </Link>
  );
}
