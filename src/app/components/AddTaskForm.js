'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim());
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 px-3 py-2 rounded bg-gray-800 text-white"
      />
      <button className="bg-green-600 px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}