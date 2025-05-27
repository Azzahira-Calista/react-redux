import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

export default function CommentList({ comments }) {
  if (!comments.length) return <p>No comments yet.</p>;

  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
