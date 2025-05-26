import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetThreads } from '../states/threads/action';
import { asyncGetUsers } from '../states/users/action';
import ThreadList from '../components/ThreadList';

export default function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncGetThreads());
    dispatch(asyncGetUsers());
  }, [dispatch]);

  return (
    <section className="homepage max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Diskusi Terbaru</h2>
      <ThreadList threads={threads} users={users} />
    </section>
  );
}
