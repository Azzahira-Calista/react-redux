import React from 'react';
import ThreadItem from './ThreadItem';

export default function ThreadList({ threads, users }) {
  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} users={users} />
      ))}
    </div>
  );
}
