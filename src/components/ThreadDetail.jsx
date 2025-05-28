import PropTypes from 'prop-types';
import { postedAt } from '../utils/index.js';

export default function ThreadDetail({ title, category, createdAt, owner, body }) {
  return (
    <>
      <h2 className="thread-title">{title}</h2>
      <div className="thread-meta">
        <span className="category">Category: {category}</span>
        <span>{postedAt(createdAt)}</span>

        <div className="owner-info">
          <img src={owner.avatar} alt={owner.name} className="avatar" />
          <span>{owner.name}</span>
        </div>
      </div>
      <div className="thread-body" dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};
