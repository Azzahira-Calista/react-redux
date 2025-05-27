import PropTypes from 'prop-types';

export default function CommentItem({ comment }) {
  const { owner, content, createdAt } = comment;

  return (
    <div className="comment">
      <div className="comment-owner">
        <img src={owner.avatar} alt={owner.name} className="avatar" />
        <span>{owner.name}</span>
      </div>
      <div className="comment-content">{content}</div>
      <div className="comment-date">{new Date(createdAt).toLocaleString()}</div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
