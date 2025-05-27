import React, { useState } from 'react';

function ThreadForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) {
      alert('Title dan body wajib diisi.');
      return;
    }

    onSubmit({ title, body, category });
  };

  return (
    <form className="thread-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Judul</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Isi Thread</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Kategori (opsional)</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <button type="submit" className="submit-btn">Buat Thread</button>
    </form>
  );
}

export default ThreadForm;
