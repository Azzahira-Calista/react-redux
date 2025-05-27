import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function CommentForm({ threadId, onAddComment }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAddComment({ content, commentTo: threadId });
    setContent('');
  };

  return (
    <form className="thread-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="comment">Tambahkan Komentar</label>
        <textarea
          id="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis komentar kamu..."
        />
      </div>
      <button type="submit" className="submit-btn">
        Kirim
      </button>
    </form>
  );
}

CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
};
