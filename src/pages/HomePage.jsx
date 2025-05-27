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
    <section className="homepage ">
      <h2 className="">Diskusi Terbaru</h2>
      <ThreadList threads={threads} users={users} />
    </section>
  );
}
