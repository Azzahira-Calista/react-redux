import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/threads/action';
import { useNavigate } from 'react-router-dom';
import ThreadForm from '../components/ThreadForm';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddThread = async (threadData) => {
    try {dispatch(asyncAddThread(threadData));
      navigate('/');
    } catch (error) {
      alert('Gagal membuat thread.');
    }
  };

  return (
    <div className="add-thread-page">
      <h2>Buat Thread Baru</h2>
      <ThreadForm onSubmit={handleAddThread} />
    </div>
  );
}

export default AddThreadPage;
